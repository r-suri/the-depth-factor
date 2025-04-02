"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if a nav link is active
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header 
        className={`fixed w-full top-0 z-50 px-4 transition-all duration-300 ${
          scrolled ? 'py-2 bg-[var(--background)]/90 backdrop-blur-md shadow-md' : 'py-4 bg-transparent'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Logo className="h-10 w-auto" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/website" 
              className={`text-sm font-medium transition-colors hover:text-[var(--color-cinnabar)] ${
                isActive('/website') ? 'text-[var(--color-cinnabar)] font-bold' : 'text-[var(--foreground)]'
              }`}
            >
              Website
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium transition-colors hover:text-[var(--color-cinnabar)] ${
                isActive('/about') ? 'text-[var(--color-cinnabar)] font-bold' : 'text-[var(--foreground)]'
              }`}
            >
              About
            </Link>
            <Link 
              href="/legal" 
              className={`text-sm font-medium transition-colors hover:text-[var(--color-cinnabar)] ${
                isActive('/legal') ? 'text-[var(--color-cinnabar)] font-bold' : 'text-[var(--foreground)]'
              }`}
            >
              Legal
            </Link>
            
            {/* CTA Link */}
            <Link href="/" className="glass px-4 py-2 rounded-full text-sm font-medium bg-white/5 hover:bg-white/10 transition-colors border border-[var(--border)] hover:border-[var(--color-cinnabar)] text-white">
              Get Started
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-[var(--foreground)] focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-[var(--background)] pt-20 px-4 z-40">
            <nav className="flex flex-col space-y-6 items-center">
              <Link 
                href="/website" 
                className={`text-lg font-medium transition-colors hover:text-[var(--color-cinnabar)] ${
                  isActive('/website') ? 'text-[var(--color-cinnabar)] font-bold' : 'text-[var(--foreground)]'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Website
              </Link>
              <Link 
                href="/about" 
                className={`text-lg font-medium transition-colors hover:text-[var(--color-cinnabar)] ${
                  isActive('/about') ? 'text-[var(--color-cinnabar)] font-bold' : 'text-[var(--foreground)]'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/legal" 
                className={`text-lg font-medium transition-colors hover:text-[var(--color-cinnabar)] ${
                  isActive('/legal') ? 'text-[var(--color-cinnabar)] font-bold' : 'text-[var(--foreground)]'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Legal
              </Link>
              
              {/* Mobile CTA Link */}
              <Link 
                href="/" 
                className="glass w-full text-center px-4 py-3 rounded-full text-base font-medium bg-white/5 hover:bg-white/10 transition-colors border border-[var(--border)] hover:border-[var(--color-cinnabar)] text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </nav>
          </div>
        )}
      </header>
      {/* Spacer div to add padding below header */}
      <div className="h-24"></div>
    </>
  );
};

export default Header; 