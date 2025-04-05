"use client";

import { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { searchContent } from '@/app/services/api';
import BlogPost from '@/app/components/BlogPost';
import VideoCard from '@/app/components/VideoCard';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import Button from '@/app/components/Button';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function Home() {
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [results, setResults] = useState<{
    blogPosts: any[];
    videos: any[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await searchContent(query);
      setResults(data);
    } catch (err) {
      setError('Failed to fetch content. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      const response = await fetch('https://submit-form.com/dlcpEy9sh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ 
          email,
          message: "Newsletter signup"
        }),
      });
      
      if (response.ok) {
        setFormSuccess(true);
        setEmail('');
      } else {
        const errorText = await response.text();
        console.error('Formspark submission error:', response.status, errorText);
        setFormError('An error occurred. Please try again.');
      }
    } catch (err) {
      setFormError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden min-h-[450px] md:min-h-[500px]">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-jet-darker)]/90 to-[var(--color-jet-dark)]/80 z-10"></div>
          <Image
            src="/images/hero-homepage.jpg" 
            alt="The Depth Factor Hero Image"
            fill
            priority
            className="object-cover"
          />
        </div>
        
        {/* Accent elements */}
        <div className="absolute top-1/4 right-[10%] accent-dot-secondary"></div>
        <div className="absolute bottom-1/4 left-[10%] accent-dot"></div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl mx-auto text-center min-h-[220px] flex flex-col justify-center">
            <h1 className={mounted ? "text-5xl md:text-6xl font-bold mb-12 animate-slide-up delay-400 tracking-tight leading-tight font-heading animate-gradient bg-gradient-to-r from-[var(--color-cinnabar)] to-[var(--color-verdigris)]" : "text-5xl md:text-6xl font-bold mb-12 opacity-0 tracking-tight leading-tight font-heading"}>
              Inner world<span className="mx-4">➔</span>Outer world
            </h1>
            <p className={mounted ? "text-xl md:text-2xl max-w-2xl mx-auto mb-16 animate-slide-up delay-600 text-[var(--muted-foreground)]" : "text-xl md:text-2xl max-w-2xl mx-auto mb-16 opacity-0"}>
              Dive Deeper into Your Life 
            </p>
            
            <div className={mounted ? "flex flex-col sm:flex-row gap-5 justify-center mt-8 mb-16 animate-slide-up delay-800" : "flex flex-col sm:flex-row gap-5 justify-center mt-8 mb-16 opacity-0"}>
              <Link href="https://www.youtube.com/@thedepthfactor" target="_blank">
                <Button variant="primary" size="large" animation="shine">
                  Explore on Youtube
                </Button>
              </Link>
              <Link href="#search-section">
                <Button variant="secondary" size="large" animation="pulse">
                  Find Content For You
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section id="search-section" className="bg-gradient-to-r from-[var(--color-cinnabar)] to-[var(--color-verdigris)] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.5" fill="#ffffff" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 font-heading">
            What are you struggling with?
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Find Content Custom Tailored to You.
          </p>
          
          {/* Search Input */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative glass bg-white/10 rounded-full p-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="anxiety, motivation, relationships..."
                className="w-full px-6 py-4 rounded-full text-white text-lg bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/70"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Button type="submit" variant="secondary" animation="shine">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 container mx-auto px-4">
        {isLoading ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center text-[var(--color-cinnabar)] max-w-lg mx-auto p-4 glass bg-opacity-50 rounded-lg">
            {error}
          </div>
        ) : results ? (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-12 text-center font-heading">Personalized Results</h2>
            
            {/* Blog Posts */}
            {results.blogPosts && results.blogPosts.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-semibold mb-8 border-l-4 border-[var(--color-cinnabar)] pl-3 font-heading">Blog Posts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {results.blogPosts.map((post, index) => (
                    <div 
                      key={index} 
                      className="animate-fade-in" 
                      style={{ animationDelay: `${0.1 * index}s` }}
                    >
                      <BlogPost
                        title={post.title}
                        excerpt={post.excerpt}
                        date={new Date(post.publishedAt).toLocaleDateString()}
                        imageUrl={post.imageUrl}
                        url={`/blog/${post.slug}`}
                        tags={post.tags}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* YouTube Videos */}
            {results.videos && results.videos.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold mb-8 border-l-4 border-[var(--color-verdigris)] pl-3 font-heading">YouTube Videos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {results.videos.map((video, index) => (
                    <div 
                      key={index} 
                      className="animate-fade-in" 
                      style={{ animationDelay: `${0.1 * index}s` }}
                    >
                      <VideoCard
                        title={video.title}
                        description={video.description}
                        url={video.url}
                        thumbnailUrl={video.thumbnailUrl}
                        tags={video.tags}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {(!results.blogPosts?.length && !results.videos?.length) && (
              <div className="text-center py-10 animate-fade-in">
                <p className="text-xl">
                  No results found for "{query}". Try a different search term.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-10 animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 font-heading">Start Your Journey</h2>
            <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Type what you're looking for above, and we'll find the most relevant content to help you.
            </p>
            <div className="mt-12 max-w-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card group hover:border-[var(--color-cinnabar)] transition-all">
                <div className="w-12 h-12 bg-[var(--color-cinnabar)]/10 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--color-cinnabar)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center">Read Blog Articles</h3>
                <p className="text-center">
                  Discover in-depth articles on personal growth and development.
                </p>
              </div>
              <div className="card group hover:border-[var(--color-verdigris)] transition-all">
                <div className="w-12 h-12 bg-[var(--color-verdigris)]/10 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--color-verdigris)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center">Watch Videos</h3>
                <p className="text-center">
                  Learn from video content that addresses your specific challenges.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Inbox Insights Section */}
      <section id="insights" className="glass bg-white/5 py-24 relative overflow-hidden">
        <div className="absolute top-1/4 right-[10%] accent-dot"></div>
        <div className="absolute bottom-1/4 left-[10%] accent-dot-secondary"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-heading animate-gradient bg-gradient-to-r from-[var(--color-cinnabar)] to-[var(--color-verdigris)]">Inbox Insights</h2>
            <p className="text-lg text-[var(--muted-foreground)] mb-10">
              Bi-weekly reflections—straight to your inbox
            </p>
            
            {formSuccess ? (
              <div className="glass bg-green-900/20 p-6 rounded-lg border border-green-500/20">
                <p className="text-green-400 font-medium">
                  Thank you for subscribing! You'll receive our insights soon.
                </p>
              </div>
            ) : (
              <form 
                action="https://submit-form.com/dlcpEy9sh"
                method="POST"
                className="max-w-md mx-auto"
                onSubmit={handleSubscribe}
              >
                <input 
                  type="hidden" 
                  name="_redirect" 
                  value="false" 
                />
                <div className="mb-6">
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Your email address" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md bg-white/5 border border-[var(--border)] focus:border-[var(--color-cinnabar)] focus:ring-2 focus:ring-[var(--color-cinnabar)] placeholder-[var(--muted-foreground)] p-4 text-[var(--foreground)]"
                  />
                </div>
                
                <Button variant="primary" size="large" fullWidth type="submit" animation="shine" disabled={isSubmitting}>
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
