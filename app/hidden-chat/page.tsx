"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Button from '@/app/components/Button';
import LoadingSpinner from '@/app/components/LoadingSpinner';

// Define the message types for the chat
type MessageRole = 'user' | 'assistant';

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export default function HiddenChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Scroll to bottom of messages whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      // Use a small timeout to ensure the DOM has updated
      const timeout = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [messages]);

  // Auto-resize the textarea based on content
  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  // Handle Enter key to submit (without Shift key)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Reset textarea height immediately
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
    
    try {
      // Add an empty assistant message immediately to show typing indicator
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Call our Together.ai API with proper messages format
      const response = await fetch('/api/together', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages.map(msg => ({ role: msg.role, content: msg.content })), 
                    { role: userMessage.role, content: userMessage.content }],
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch response');
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
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              content: responseText
            };
            return updated;
          });
        }
      }
      
      if (!responseText) {
        // Update with an error if no response received
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: 'Sorry, I did not receive a response. Please try again.'
          };
          return updated;
        });
      }
    } catch (error) {
      console.error('Error:', error);
      
      // Add error message or update the last assistant message if it exists
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        
        // If the last message is an empty assistant message, update it
        if (lastMessage && lastMessage.role === 'assistant' && !lastMessage.content) {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: 'I apologize, but I encountered an error processing your request. Please try again.'
          };
          return updated;
        }
        
        // Otherwise add a new error message
        return [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: 'I apologize, but I encountered an error processing your request. Please try again.',
            timestamp: new Date()
          }
        ];
      });
    } finally {
      setIsLoading(false);
      
      // Reset textarea height
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    }
  };

  return (
    <div className="flex flex-col bg-[var(--background)] min-h-screen">
      <Header />
      
      <main className="flex flex-col flex-grow pt-2 md:pt-12 pb-24 md:pb-32 relative">
        {/* Welcome Section - Only show when no messages */}
        {messages.length === 0 && (
          <div className={mounted ? "flex-grow flex flex-col justify-center items-center px-2 md:px-4 max-w-4xl mx-auto w-full text-center animate-fade-in" : "flex-grow flex flex-col justify-center items-center px-2 md:px-4 max-w-4xl mx-auto w-full text-center opacity-0"}>
            <div className="-mt-12 md:-mt-16">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 font-heading animate-gradient">
                Your Personal Growth Assistant
              </h1>
              
              <div className="grid grid-cols-3 gap-2 md:gap-4 mt-20 mb-3 md:mb-12">
                <div className="card-sm md:card group hover:border-[var(--color-cinnabar)] transition-all">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-[var(--color-cinnabar)]/10 rounded-full flex items-center justify-center mb-1 md:mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6 text-[var(--color-cinnabar)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-xs md:text-lg font-semibold mb-0.5 md:mb-2 text-center">Personal Guidance</h3>
                  <p className="text-center text-[10px] md:text-sm hidden md:block">
                    Get personalized insights for your specific life challenges
                  </p>
                </div>
                
                <div className="card-sm md:card group hover:border-[var(--color-verdigris)] transition-all">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-[var(--color-verdigris)]/10 rounded-full flex items-center justify-center mb-1 md:mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6 text-[var(--color-verdigris)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xs md:text-lg font-semibold mb-0.5 md:mb-2 text-center">Depth Perspective</h3>
                  <p className="text-center text-[10px] md:text-sm hidden md:block">
                    Discover insights rooted in depth psychology and ancient wisdom
                  </p>
                </div>
                
                <div className="card-sm md:card group hover:border-[var(--color-cinnabar)] transition-all">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-[var(--color-cinnabar)]/10 rounded-full flex items-center justify-center mb-1 md:mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6 text-[var(--color-cinnabar)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xs md:text-lg font-semibold mb-0.5 md:mb-2 text-center">Practical Steps</h3>
                  <p className="text-center text-[10px] md:text-sm hidden md:block">
                    Get actionable guidance to move forward in your journey
                  </p>
                </div>
              </div>
              
              <div className="text-center mb-2 md:mb-4 mt-2 md:mt-8 glass py-1.5 md:py-3 px-3 md:px-6 mx-auto inline-block rounded-full">
                <p className="text-[var(--muted-foreground)] italic text-[10px] md:text-sm">
                  Try: "handling anxiety", "finding motivation", "relationships"
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Chat Messages */}
        {messages.length > 0 && (
          <div className="flex-grow px-2 md:px-4 pb-28 md:pb-32 pt-6 max-w-4xl mx-auto w-full overflow-y-auto">
            <div className="flex flex-col space-y-4 md:space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  } animate-fade-in`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-[var(--color-cinnabar)] to-[var(--color-verdigris)] flex-shrink-0 mr-1 md:mr-2 self-end mb-1 flex items-center justify-center text-white font-bold text-xs">
                      DF
                    </div>
                  )}
                  <div
                    className={`${message.role === 'user' ? 'message-bubble-user' : 'message-bubble-ai'} text-sm md:text-base`}
                  >
                    {message.content || (isLoading && message.role === 'assistant' ? 'Thinking...' : '')}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[var(--color-verdigris)] flex-shrink-0 ml-1 md:ml-2 self-end mb-1 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && !messages.some(m => m.role === 'assistant' && !m.content) && (
                <div className="flex justify-start animate-fade-in">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-[var(--color-cinnabar)] to-[var(--color-verdigris)] flex-shrink-0 mr-1 md:mr-2 self-end mb-1 flex items-center justify-center text-white font-bold text-xs">
                    DF
                  </div>
                  <div className="message-bubble-ai">
                    <LoadingSpinner />
                  </div>
                </div>
              )}
              
              {/* Invisible div for scroll reference */}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
        
        {/* Input Form */}
        <div className="fixed bottom-0 left-0 right-0 w-full bg-[var(--background)] pt-6 pb-6 md:pb-8 shadow-up-sm">
          <div className="max-w-4xl mx-auto px-2 md:px-4">
            <form onSubmit={handleSubmit} className="relative glass overflow-hidden">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onInput={handleTextareaInput}
                onKeyDown={handleKeyDown}
                placeholder="Enter your concern or question..."
                className="w-full px-3 md:px-4 py-2 md:py-3 pr-16 md:pr-24 rounded-lg bg-transparent border-0 text-[var(--foreground)] resize-none text-sm md:text-base"
                rows={1}
                disabled={isLoading}
              />
              <div className="absolute right-1 md:right-2 bottom-1 md:bottom-2">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading || !input.trim()}
                  className="h-8 w-8 md:h-auto md:w-auto flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              </div>
            </form>
            
            <div className="mt-1 md:mt-2 text-[10px] md:text-xs text-[var(--muted-foreground)] text-center">
              <Link href="/" className="underline hover:text-[var(--color-cinnabar)] transition-colors">
                Visit our website
              </Link> to explore our content or learn more about The Depth Factor
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 