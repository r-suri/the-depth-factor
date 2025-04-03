import { NextRequest } from 'next/server';
import { together } from '../../lib/togetherai';
import { streamText } from 'ai';
import { CURRENT_MODEL, DEFAULT_CHAT_SETTINGS } from '../../config/ai';

// This is a simpler implementation using the Vercel AI SDK's streaming helpers
export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const model = CURRENT_MODEL.id;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Messages are required and must be an array' }),
        { status: 400 }
      );
    }

    // Using the native fetch API directly to Together.ai for reliability
    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TOGETHER_AI_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        temperature: DEFAULT_CHAT_SETTINGS.temperature,
        max_tokens: DEFAULT_CHAT_SETTINGS.max_tokens,
        stream: DEFAULT_CHAT_SETTINGS.stream,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }

    // Create a transform stream to parse SSE data
    const transformStream = new TransformStream({
      transform: async (chunk, controller) => {
        const text = new TextDecoder().decode(chunk);
        const lines = text.split('\n').filter(line => line.trim() !== '');
        
        for (const line of lines) {
          // Skip any lines that don't start with "data:"
          if (!line.startsWith('data:')) continue;
          
          // Extract the data part
          const data = line.slice(5).trim();
          
          // Skip "[DONE]" message
          if (data === '[DONE]') continue;

          try {
            // Parse and extract only the content we need
            const parsed = JSON.parse(data);
            // Check if delta contains content
            if (parsed.choices && 
                parsed.choices[0] && 
                parsed.choices[0].delta && 
                parsed.choices[0].delta.content) {
              // Send only the actual content part
              controller.enqueue(new TextEncoder().encode(parsed.choices[0].delta.content));
            }
          } catch (e) {
            console.error('Error parsing SSE data:', e);
          }
        }
      }
    });
    
    return new Response(response.body?.pipeThrough(transformStream), {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive'
      },
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate completion' }),
      { status: 500 }
    );
  }
} 