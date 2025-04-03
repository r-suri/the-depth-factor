'use client';

import { useState, useEffect, useRef } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function AIChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Add an empty assistant message immediately to show typing indicator
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
      
      // Call our API
      const response = await fetch('/api/together', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch response: ${response.status}`);
      }

      // For streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let responseText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          responseText += chunk;
          
          // Update the last message with accumulated response
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: 'assistant',
              content: responseText.trim(),
            };
            return updated;
          });
        }
      }
      
      // If no response was received, show error
      if (!responseText.trim()) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: 'Sorry, I did not receive a response. Please try again.',
          };
          return updated;
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => {
        // If we already added an empty assistant message, update it
        if (prev[prev.length - 1].role === 'assistant') {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: 'Sorry, there was an error processing your request.',
          };
          return updated;
        }
        // Otherwise add a new error message
        return [
          ...prev,
          { role: 'assistant', content: 'Sorry, there was an error processing your request.' },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle keydown to submit on Enter (without Shift)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-[70vh] max-w-3xl mx-auto p-4 space-y-4">
      <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-lg border">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">Start a conversation with the AI assistant</p>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                message.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
              } max-w-[80%]`}
            >
              <p>{message.content || (isLoading && message.role === 'assistant' ? 'Thinking...' : '')}</p>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
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
  );
} 