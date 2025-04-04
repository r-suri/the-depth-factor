import Anthropic from '@anthropic-ai/sdk';

// Initialize the Anthropic client
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Export everything from the Anthropic package
export * from '@anthropic-ai/sdk';

// Helper function to format messages for Anthropic API
export function formatMessages(messages: any[]) {
  return messages.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'assistant' as 'user' | 'assistant',
    content: msg.content,
  }));
}

// Helper for streaming responses with retry logic
export async function createStreamableResponse(stream: AsyncIterable<any>) {
  // Create a transform stream to extract text from Anthropic's stream events
  const transformStream = new TransformStream({
    transform: async (chunk, controller) => {
      const text = new TextDecoder().decode(chunk);
      
      try {
        const data = JSON.parse(text);
        
        // Check if there's content to stream
        if (data.type === 'content_block_delta' && data.delta?.text) {
          controller.enqueue(new TextEncoder().encode(data.delta.text));
        }
      } catch (e) {
        console.error('Error parsing stream data:', e);
      }
    }
  });

  // Create a readable stream from the Anthropic stream
  const reader = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        // For each event in the stream, send it to the transform stream
        const eventData = JSON.stringify(event);
        controller.enqueue(new TextEncoder().encode(eventData));
      }
      controller.close();
    }
  });

  return new Response(reader.pipeThrough(transformStream), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive'
    },
  });
}

// Add retry functionality with exponential backoff
export async function retryWithExponentialBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 5,
  initialDelay: number = 1000, // Start with 1s delay
  maxDelay: number = 30000 // Max 30s delay
): Promise<T> {
  let retries = 0;
  let delay = initialDelay;

  while (true) {
    try {
      return await fn();
    } catch (error: any) {
      // Check if error is due to Anthropic overload (529)
      const isOverloaded = error?.status === 529 || 
                          error?.code === 529 || 
                          error?.detail === "Overloaded" ||
                          error?.message?.includes("529") ||
                          error?.message?.includes("Overloaded");
      
      // If we've reached max retries or error is not overload-related, throw it
      if (retries >= maxRetries || !isOverloaded) {
        throw error;
      }
      
      // Increment retry count
      retries++;
      
      // Log the retry attempt
      console.log(`Anthropic API overloaded, retrying (${retries}/${maxRetries}) in ${delay}ms...`);
      
      // Wait for the current delay
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Increase delay for next attempt, with jitter for distributed retries
      delay = Math.min(delay * 2 * (1 + Math.random() * 0.2), maxDelay);
    }
  }
} 