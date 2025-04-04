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

// Helper function to format message content
const formatMessageContent = (text: string) => {
  if (!text) return '';
  
  // Step 1: Normalize line breaks and clean up
  let content = text.replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n');
  
  // Step 2: Process headings - look for explicit headings and markdown style headings (###, ##, #)
  content = content.replace(/^(#{1,3})\s+(.+)$/gm, (match, hashes, title) => {
    const level = hashes.length;
    return `<h${level}>${title.trim()}</h${level}>`;
  });
  
  // Special handling for section headings like "Management & Treatment"
  content = content.replace(/^([A-Z][A-Za-z\s&]+)$/gm, (match, title) => {
    if (title.length > 12 && title.includes(' ')) { // Likely a title, not a short phrase
      return `<h2>${title.trim()}</h2>`;
    }
    return match;
  });

  // Step 3a: Format numbered sections like "1. Therapy:" with strong emphasis
  content = content.replace(/^(\d+\.)\s+([A-Z][a-z]+:)(.*)$/gm, (match, number, title, rest) => {
    return `<p><strong>${number} ${title}</strong>${rest}</p>`;
  });
  
  // Step 3b: Handle numbered lists (1., 2., etc.)
  const numberedListPattern = /^(\d+\.)\s+(.+)$/gm;
  let listItems = [];
  let inNumberedList = false;
  
  // First mark all numbered lists
  content = content.replace(numberedListPattern, (match, number, text) => {
    if (!inNumberedList) {
      inNumberedList = true;
      return `<ol-start>\n<li>${text}</li>`;
    }
    return `<li>${text}</li>`;
  });
  
  // Close any open numbered list
  if (inNumberedList) {
    content += '\n</ol-end>';
  }
  
  // Then wrap consecutive list items in ol tags
  content = content.replace(/<ol-start>([\s\S]*?)<\/ol-end>/g, (match, listContent) => {
    return `<ol>${listContent}</ol>`;
  });
  
  // Step 4: Identify bullet points and format them
  // Handle bullet points (• or - or * format)
  const bulletPattern = /^[•\-\*]\s+(.+)$/gm;
  let inBulletList = false;
  
  // First mark all bullet lists
  content = content.replace(bulletPattern, (match, text) => {
    if (!inBulletList) {
      inBulletList = true;
      return `<ul-start>\n<li>${text}</li>`;
    }
    return `<li>${text}</li>`;
  });
  
  // Close any open bullet list
  if (inBulletList) {
    content += '\n</ul-end>';
  }
  
  // Then wrap consecutive list items in ul tags
  content = content.replace(/<ul-start>([\s\S]*?)<\/ul-end>/g, (match, listContent) => {
    return `<ul>${listContent}</ul>`;
  });
  
  // Step 5: Convert double line breaks to paragraph tags, but only for content that isn't already wrapped
  content = content.replace(/(.+?)(\n\n|$)/g, (match, text) => {
    // Skip if the text is already HTML-like
    if (
      text.trim().startsWith('<') && 
      text.trim().endsWith('>') && 
      !text.includes('<li>') // Special case for list items
    ) {
      return match;
    }
    return `<p>${text}</p>\n\n`;
  });
  
  // Step 6: Process inline formatting
  // Formatting bold text with ** or __
  content = content.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  content = content.replace(/\_\_([^_]+)\_\_/g, '<strong>$1</strong>');
  
  // Handle important terms (often in quotes or in brackets)
  content = content.replace(/"([^"]+)"/g, '"<span class="term">$1</span>"');
  content = content.replace(/\[([^\]]+)\]/g, '<span class="term">$1</span>');
  
  // Highlight medical/technical terms
  const termPatterns = [
    /\b(CBT|DBT|ACT|SSRI|TCA|MAOI|SNRI)\b/g, // Acronyms
    /\b(Cognitive Behavioral Therapy|Dialectical Behavior Therapy|Acceptance and Commitment Therapy)\b/g,
    /\b(Major Depressive Disorder|Generalized Anxiety Disorder|Panic Disorder|PTSD|OCD)\b/g
  ];
  
  for (const pattern of termPatterns) {
    content = content.replace(pattern, '<span class="term">$1</span>');
  }
  
  // Format parenthetical info
  content = content.replace(/\(([^)]+)\)/g, '<span class="parenthetical">($1)</span>');
  
  // Step 7: Clean up: removing empty paragraphs and fixing edge cases
  content = content
    .replace(/<p>\s*<\/p>/g, '') // Remove empty paragraphs
    .replace(/<p><\/p>/g, '') // Remove empty paragraphs
    .replace(/<p>\s*<(h[1-3]|ul|ol)/g, '<$1') // Remove paragraph tags around headings and lists
    .replace(/<\/(h[1-3]|ul|ol)>\s*<\/p>/g, '</$1>') // Remove closing paragraph tags after headings and lists
    .replace(/<p>(\s*<li>)/g, '$1') // Remove paragraph tags before list items
    .replace(/(<\/li>\s*)<\/p>/g, '$1') // Remove closing paragraph tags after list items
    .replace(/<br\s*\/?>(\s*<br\s*\/?>)+/g, '<br/>'); // Replace multiple consecutive breaks with a single one
  
  // Add the prose-chat class to the wrapper for styling
  return `<div class="prose-chat">${content}</div>`;
};

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
      
      // Call our Anthropic API with proper messages format
      const response = await fetch('/api/anthropic', {
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
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || errorData?.details || `Failed to fetch: ${response.status} ${response.statusText}`
        );
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
        
        // Determine if it's an overload error
        const errorMessage = error instanceof Error ? error.message : String(error);
        const isOverloaded = errorMessage.includes('529') || errorMessage.includes('Overloaded');
        
        const userFriendlyMessage = isOverloaded 
          ? "I'm experiencing high demand right now. Please try again in a moment."
          : "I apologize, but I encountered an error processing your request. Please try again.";
        
        // If the last message is an empty assistant message, update it
        if (lastMessage && lastMessage.role === 'assistant' && !lastMessage.content) {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: userFriendlyMessage
          };
          return updated;
        }
        
        // Otherwise add a new error message
        return [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: userFriendlyMessage,
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

  // Add this CSS to the component
  const chatFormattingStyles = `
    .prose-chat h1, .prose-chat h2, .prose-chat h3, 
    .prose-chat .section-marker {
      color: var(--color-cinnabar);
      font-weight: 700;
      line-height: 1.3;
      margin-top: 1.75em;
      margin-bottom: 0.5em;
    }
    
    .prose-chat h1 {
      font-size: 1.5em;
    }
    
    .prose-chat h2 {
      font-size: 1.3em;
      letter-spacing: -0.01em;
      border-bottom: 1px solid rgba(var(--color-cinnabar-rgb), 0.2);
      padding-bottom: 0.3em;
    }
    
    .prose-chat h3 {
      font-size: 1.15em;
    }
    
    .prose-chat ul {
      list-style-type: disc;
      padding-left: 1.5em;
      margin: 0.25em 0 0.75em 0;
    }
    
    .prose-chat li {
      margin-bottom: 0.2em;
      padding-left: 0.25em;
      line-height: 1.5;
    }
    
    .prose-chat p {
      margin-bottom: 0.6em;
      line-height: 1.5;
    }
    
    .prose-chat .term {
      color: var(--color-cinnabar);
      font-weight: 600;
    }
    
    .prose-chat .section-marker {
      display: block;
      margin-top: 1.75em;
      margin-bottom: 0.5em;
    }
    
    .prose-chat .list-item {
      margin-left: 1em;
      margin-bottom: 0.3em;
      line-height: 1.5;
    }
    
    .prose-chat ol {
      list-style-type: decimal;
      padding-left: 1.5em;
      margin: 0.25em 0 0.75em 0;
      counter-reset: item;
    }
    
    .prose-chat ol > li {
      counter-increment: item;
      margin-bottom: 0.2em;
    }
    
    /* Special handling for numbered items like "1. Therapy:" */
    .prose-chat p strong:first-child {
      color: var(--color-cinnabar);
      font-weight: 600;
      margin-right: 0.25em;
      font-size: 1.1em;
      display: block;
      margin-top: 1.25em;
      margin-bottom: 0.3em;
    }
    
    /* Style for sections with numbers like "1. Therapy:" */
    .prose-chat p strong:first-child:first-letter {
      font-weight: 700;
    }
    
    .prose-chat .bullet-item {
      position: relative;
    }
    
    .prose-chat .acronym {
      font-weight: 500;
    }
    
    .prose-chat .parenthetical {
      color: var(--muted-foreground);
      font-weight: normal;
    }
    
    /* Fix spacing when elements are adjacent */
    .prose-chat p + ul,
    .prose-chat p + ol {
      margin-top: 0.25em;
    }
    
    /* First element in the message should have no top margin */
    .prose-chat > *:first-child {
      margin-top: 0 !important;
    }
    
    /* Message overall line height for better readability */
    .message-bubble-ai {
      line-height: 1.5;
    }
    
    /* Add subtle styling to the message bubble for better readability */
    .message-bubble-ai {
      padding: 1rem;
      font-size: 0.9rem;
      overflow-wrap: break-word;
    }
    
    @media screen and (min-width: 768px) {
      .message-bubble-ai {
        padding: 1.25rem;
        font-size: 1rem;
      }
    }
    
    /* Additional mobile responsiveness styles */
    @media screen and (max-width: 480px) {
      .prose-chat h1 {
        font-size: 1.3em;
      }
      
      .prose-chat h2 {
        font-size: 1.1em;
      }
      
      .prose-chat h3 {
        font-size: 1em;
      }
      
      .prose-chat ul, .prose-chat ol {
        padding-left: 1.25em;
      }
    }
  `;

  return (
    <div className="flex flex-col bg-[var(--background)] min-h-screen">
      <style jsx>{chatFormattingStyles}</style>
      <Header />
      
      <main className="flex flex-col flex-grow pt-2 md:pt-8 lg:pt-12 pb-24 md:pb-32 relative">
        {/* Welcome Section - Only show when no messages */}
        {messages.length === 0 && (
          <div className={mounted ? "flex-grow flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 max-w-4xl mx-auto w-full text-center animate-fade-in" : "flex-grow flex flex-col justify-center items-center px-2 md:px-4 max-w-4xl mx-auto w-full text-center opacity-0"}>
            <div className="-mt-8 sm:-mt-10 md:-mt-16">
              <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-10 md:mb-16 font-heading animate-gradient">
                Your Personal Growth Assistant
              </h1>
              
              <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mt-10 sm:mt-16 md:mt-20 mb-3 md:mb-12">
                <div className="card-sm md:card group hover:border-[var(--color-cinnabar)] transition-all p-2 sm:p-3 md:p-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-[var(--color-cinnabar)]/10 rounded-full flex items-center justify-center mb-1 md:mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-[var(--color-cinnabar)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-[10px] xs:text-xs sm:text-sm md:text-lg font-semibold mb-0.5 md:mb-2 text-center">Personal Guidance</h3>
                  <p className="text-center text-[9px] sm:text-[10px] md:text-sm hidden sm:block">
                    Get personalized insights for your specific life challenges
                  </p>
                </div>
                
                <div className="card-sm md:card group hover:border-[var(--color-verdigris)] transition-all p-2 sm:p-3 md:p-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-[var(--color-verdigris)]/10 rounded-full flex items-center justify-center mb-1 md:mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-[var(--color-verdigris)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-[10px] xs:text-xs sm:text-sm md:text-lg font-semibold mb-0.5 md:mb-2 text-center">Depth Perspective</h3>
                  <p className="text-center text-[9px] sm:text-[10px] md:text-sm hidden sm:block">
                    Discover insights rooted in depth psychology and ancient wisdom
                  </p>
                </div>
                
                <div className="card-sm md:card group hover:border-[var(--color-cinnabar)] transition-all p-2 sm:p-3 md:p-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-[var(--color-cinnabar)]/10 rounded-full flex items-center justify-center mb-1 md:mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-[var(--color-cinnabar)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-[10px] xs:text-xs sm:text-sm md:text-lg font-semibold mb-0.5 md:mb-2 text-center">Practical Steps</h3>
                  <p className="text-center text-[9px] sm:text-[10px] md:text-sm hidden sm:block">
                    Get actionable guidance to move forward in your journey
                  </p>
                </div>
              </div>
              
              <div className="text-center mb-2 md:mb-4 mt-2 md:mt-8 glass py-1.5 md:py-3 px-3 md:px-6 mx-auto inline-block rounded-full">
                <p className="text-[var(--muted-foreground)] italic text-[9px] xs:text-[10px] sm:text-xs md:text-sm">
                  Try: "handling anxiety", "finding motivation", "relationships"
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Chat Messages */}
        {messages.length > 0 && (
          <div className="flex-grow px-3 sm:px-4 md:px-6 pb-28 md:pb-32 pt-4 sm:pt-6 max-w-4xl mx-auto w-full overflow-y-auto">
            <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  } animate-fade-in`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-[var(--color-cinnabar)] to-[var(--color-verdigris)] flex-shrink-0 mr-1 md:mr-2 self-start mt-1 flex items-center justify-center text-white font-bold text-[10px] sm:text-xs">
                      DF
                    </div>
                  )}
                  <div
                    className={`${message.role === 'user' ? 'message-bubble-user' : 'message-bubble-ai'} text-xs sm:text-sm md:text-base max-w-[75%] sm:max-w-[80%] lg:max-w-[85%]`}
                  >
                    {message.role === 'user' ? (
                      message.content || ''
                    ) : (
                      <div 
                        className="prose-chat"
                        dangerouslySetInnerHTML={{ 
                          __html: message.content 
                            ? formatMessageContent(message.content) 
                            : (isLoading ? 'Thinking...' : '') 
                        }} 
                      />
                    )}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-[var(--color-verdigris)] flex-shrink-0 ml-1 md:ml-2 self-end mb-1 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && !messages.some(m => m.role === 'assistant' && !m.content) && (
                <div className="flex justify-start animate-fade-in">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-[var(--color-cinnabar)] to-[var(--color-verdigris)] flex-shrink-0 mr-1 md:mr-2 self-start mt-1 flex items-center justify-center text-white font-bold text-[10px] sm:text-xs">
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
        <div className="fixed bottom-0 left-0 right-0 w-full bg-[var(--background)] pt-4 sm:pt-6 pb-4 sm:pb-6 md:pb-8 shadow-up-sm">
          <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
            <form onSubmit={handleSubmit} className="relative glass overflow-hidden rounded-lg">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onInput={handleTextareaInput}
                onKeyDown={handleKeyDown}
                placeholder="Enter your concern or question..."
                className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-12 sm:pr-16 md:pr-24 rounded-lg bg-transparent border-0 text-[var(--foreground)] resize-none text-xs sm:text-sm md:text-base"
                rows={1}
                disabled={isLoading}
              />
              <div className="absolute right-1 sm:right-1.5 md:right-2 bottom-1 sm:bottom-1.5 md:bottom-2">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading || !input.trim()}
                  className="h-8 w-12 sm:h-8 sm:w-10 md:h-auto md:w-auto flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Button>
              </div>
            </form>
            
            <div className="mt-1 sm:mt-1.5 md:mt-2 text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs text-[var(--muted-foreground)] text-center">
              <Link href="/" className="underline hover:text-[var(--color-cinnabar)] transition-colors">
                Visit our website
              </Link> to explore our content or learn more about The Depth Factor
            </div>
          </div>
        </div>
      </main>
      
      {/* Hide Footer on mobile devices */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
} 