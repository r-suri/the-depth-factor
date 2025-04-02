"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Button from '@/app/components/Button';

export default function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-floral-white)] dark:bg-[var(--color-jet)]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10"></div>
          <Image 
            src="/images/about-hero.jpg" 
            alt="Dr. Raghav Suri"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className={mounted ? "text-5xl md:text-6xl font-bold mb-8 animate-slide-up delay-400 tracking-tight leading-tight text-white font-heading" : "text-5xl md:text-6xl font-bold mb-8 opacity-0 tracking-tight leading-tight text-white font-heading"}>
              About Dr. Raghav Suri
            </h1>
            <p className={mounted ? "text-xl md:text-2xl max-w-2xl mx-auto mb-12 animate-slide-up delay-600 text-white/90" : "text-xl md:text-2xl max-w-2xl mx-auto mb-12 opacity-0 text-white/90"}>
              Clinical Psychologist and Founder of The Depth Factor
            </p>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-16">
            <div className="w-full md:w-1/3 relative">
              <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-[var(--color-cinnabar)]">
                <Image 
                  src="/images/dr-raghav-suri.jpg" 
                  alt="Dr. Raghav Suri" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-6 text-center">
                <Link href="https://www.youtube.com/@thedepthfactor" target="_blank">
                  <Button variant="primary" size="medium">
                    YouTube Channel
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl font-bold mb-6 font-heading text-[var(--color-jet)] dark:text-[var(--color-floral-white)]">
                My Story
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>
                  I'm Dr. Raghav Suri, a clinical psychologist passionate about helping people find meaning and depth in their relationships and personal growth.
                </p>
                <p>
                  After completing my doctorate in clinical psychology and working with hundreds of clients, I noticed a common thread: many people struggle with connecting authentically, both with themselves and others. This inspired me to create The Depth Factor—a platform dedicated to sharing psychological insights that anyone can apply to their daily lives.
                </p>
                <p>
                  My approach combines clinical expertise with practical wisdom. I believe that psychological principles should be accessible to everyone, not just those in therapy. Through my YouTube channel and articles, I break down complex concepts into actionable steps that help people navigate their inner worlds and build meaningful connections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-white dark:bg-[#363636]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center font-heading text-[var(--color-jet)] dark:text-[var(--color-floral-white)]">
              My Philosophy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-[var(--color-floral-white)] dark:bg-[var(--color-jet)] p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[var(--color-cinnabar)]/10 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--color-cinnabar)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 font-heading text-[var(--color-jet)] dark:text-[var(--color-floral-white)]">
                  Psychological Depth
                </h3>
                <p className="text-[var(--color-jet)]/80 dark:text-[var(--color-floral-white)]/80">
                  I believe that true growth happens when we're willing to explore our inner worlds with curiosity and courage. By understanding our patterns, motivations, and emotions, we can make more intentional choices in our lives.
                </p>
              </div>
              <div className="bg-[var(--color-floral-white)] dark:bg-[var(--color-jet)] p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[var(--color-verdigris)]/10 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--color-verdigris)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 font-heading text-[var(--color-jet)] dark:text-[var(--color-floral-white)]">
                  Authentic Connection
                </h3>
                <p className="text-[var(--color-jet)]/80 dark:text-[var(--color-floral-white)]/80">
                  Meaningful relationships are built on authenticity, vulnerability, and effective communication. By developing these skills, we can create deeper bonds with others while staying true to ourselves.
                </p>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-[var(--color-floral-white)] dark:bg-[var(--color-jet)] p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[var(--color-cinnabar)]/10 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--color-cinnabar)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 font-heading text-[var(--color-jet)] dark:text-[var(--color-floral-white)]">
                  Practical Application
                </h3>
                <p className="text-[var(--color-jet)]/80 dark:text-[var(--color-floral-white)]/80">
                  Theory without practice has limited value. I focus on translating psychological concepts into actionable strategies that can be applied in everyday life for real, meaningful change.
                </p>
              </div>
              <div className="bg-[var(--color-floral-white)] dark:bg-[var(--color-jet)] p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[var(--color-verdigris)]/10 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--color-verdigris)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 font-heading text-[var(--color-jet)] dark:text-[var(--color-floral-white)]">
                  Accessibility
                </h3>
                <p className="text-[var(--color-jet)]/80 dark:text-[var(--color-floral-white)]/80">
                  Psychological wisdom should be available to everyone. I'm committed to sharing knowledge in a way that's understandable, relatable, and free from unnecessary jargon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center font-heading text-[var(--color-jet)] dark:text-[var(--color-floral-white)]">
            Credentials & Experience
          </h2>
          <div className="bg-white dark:bg-[#363636] p-8 rounded-lg shadow-md">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-[var(--color-cinnabar)]/10 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-cinnabar)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-heading text-[var(--color-jet)] dark:text-[var(--color-floral-white)]">
                    Education
                  </h3>
                  <p className="text-[var(--color-jet)]/80 dark:text-[var(--color-floral-white)]/80">
                    Doctorate in Clinical Psychology (Psy.D) with specialization in depth psychology and integrative approaches
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-[var(--color-verdigris)]/10 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-verdigris)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-heading text-[var(--color-jet)] dark:text-[var(--color-floral-white)]">
                    Clinical Practice
                  </h3>
                  <p className="text-[var(--color-jet)]/80 dark:text-[var(--color-floral-white)]/80">
                    Over 10 years of experience working with individuals and couples, specializing in relationship issues, personal growth, and emotional intelligence
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-[var(--color-cinnabar)]/10 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-cinnabar)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-heading text-[var(--color-jet)] dark:text-[var(--color-floral-white)]">
                    Publishing
                  </h3>
                  <p className="text-[var(--color-jet)]/80 dark:text-[var(--color-floral-white)]/80">
                    Author of research papers on emotional intelligence and relationship dynamics in peer-reviewed journals
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-[var(--color-verdigris)]/10 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-verdigris)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-heading text-[var(--color-jet)] dark:text-[var(--color-floral-white)]">
                    Speaking
                  </h3>
                  <p className="text-[var(--color-jet)]/80 dark:text-[var(--color-floral-white)]/80">
                    Regular speaker at conferences and workshops on topics including emotional intelligence, depth psychology, and authentic relationships
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[var(--color-cinnabar)] to-[var(--color-verdigris)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 font-heading">Join Me on This Journey</h2>
          <p className="text-xl max-w-2xl mx-auto mb-10">
            Let's explore the depths of human experience together and build more meaningful connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="secondary" size="large">
                Explore Content
              </Button>
            </Link>
            <Link href="https://www.youtube.com/@thedepthfactor" target="_blank">
              <Button variant="secondary" size="large">
                Subscribe on YouTube
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 