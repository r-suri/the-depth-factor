import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll events to change header appearance when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle resize events to close mobile menu on desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Close menu when clicking outside or using escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.hamburger')) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (isMenuOpen && e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <header className={`${scrolled ? 'py-3 shadow-md' : 'py-5'} bg-white dark:bg-[#363636] shadow-sm sticky top-0 z-50 transition-all duration-300`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li className="group relative overflow-hidden">
              <Link 
                href="https://www.youtube.com/@thedepthfactor" 
                target="_blank" 
                className="text-[var(--color-jet)] dark:text-[var(--color-floral-white)] hover:text-[var(--color-cinnabar)] dark:hover:text-[var(--color-cinnabar)] font-medium transition-colors duration-300"
              >
                Youtube
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[var(--color-cinnabar)] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li className="group relative overflow-hidden">
              <Link 
                href="#insights" 
                className="text-[var(--color-jet)] dark:text-[var(--color-floral-white)] hover:text-[var(--color-cinnabar)] dark:hover:text-[var(--color-cinnabar)] font-medium transition-colors duration-300"
              >
                Inbox Insights
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[var(--color-cinnabar)] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Hamburger Menu Button */}
        <button 
          className="hamburger md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`block w-6 h-0.5 bg-[var(--color-jet)] dark:bg-[var(--color-floral-white)] rounded transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-[var(--color-jet)] dark:bg-[var(--color-floral-white)] rounded transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-[var(--color-jet)] dark:bg-[var(--color-floral-white)] rounded transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
        
        {/* Mobile Menu */}
        <div 
          className={`mobile-menu fixed top-0 right-0 h-full w-full md:w-80 bg-white dark:bg-[#363636] shadow-xl transform transition-transform duration-300 ease-in-out z-40 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex flex-col h-full p-8 pt-24">
            <nav className="flex-1">
              <ul className="space-y-6">
                <li>
                  <Link 
                    href="https://www.youtube.com/@thedepthfactor" 
                    target="_blank" 
                    className="text-lg text-[var(--color-jet)] dark:text-[var(--color-floral-white)] hover:text-[var(--color-cinnabar)] dark:hover:text-[var(--color-cinnabar)] font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Youtube
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#insights" 
                    className="text-lg text-[var(--color-jet)] dark:text-[var(--color-floral-white)] hover:text-[var(--color-cinnabar)] dark:hover:text-[var(--color-cinnabar)] font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Inbox Insights
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-[var(--color-jet)]/60 dark:text-[var(--color-floral-white)]/60">
                © {new Date().getFullYear()} The Depth Factor
              </p>
            </div>
          </div>
        </div>
        
        {/* Overlay when mobile menu is open */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/30 z-30 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
      </div>
    </header>
  );
} 