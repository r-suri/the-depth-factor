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

// Helper for streaming responses
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