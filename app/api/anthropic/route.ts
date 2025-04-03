import { NextRequest } from 'next/server';
import { CURRENT_MODEL, DEFAULT_CHAT_SETTINGS } from '../../config/ai';
import { anthropic, formatMessages, createStreamableResponse } from '../../lib/anthropic';

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

    // Format messages for Anthropic API using our helper
    const formattedMessages = formatMessages(messages);

    // Create a streaming response
    const stream = await anthropic.messages.create({
      model: model,
      messages: formattedMessages,
      max_tokens: DEFAULT_CHAT_SETTINGS.max_tokens,
      temperature: DEFAULT_CHAT_SETTINGS.temperature,
      stream: true,
    });

    // Return streamable response using our helper
    return await createStreamableResponse(stream);
  } catch (error) {
    console.error('Error in Anthropic API:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate completion' }),
      { status: 500 }
    );
  }
} 