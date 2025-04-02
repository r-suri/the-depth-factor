import { NextRequest, NextResponse } from 'next/server';
import { togetherai } from '../../lib/togetherai';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const model = 'togethercomputer/llama-3-70b-instruct';

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required and must be an array' },
        { status: 400 }
      );
    }

    // Get the completion from Together.ai
    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TOGETHER_AI_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }

    // Return the streaming response directly
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in Together.ai API:', error);
    return NextResponse.json(
      { error: 'Failed to generate completion' },
      { status: 500 }
    );
  }
} 