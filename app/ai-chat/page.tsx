'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';

export default function AIChatPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <h1 className="text-2xl font-bold mb-6">AI Chat with Vercel AI SDK</h1>
      <div className="w-full max-w-4xl flex flex-col h-[70vh]">
        <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-lg border mb-4">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center">Start a conversation with the AI assistant</p>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`p-3 rounded-lg ${
                  message.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
                } max-w-[80%]`}
              >
                <p>{message.content}</p>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-300"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
} 