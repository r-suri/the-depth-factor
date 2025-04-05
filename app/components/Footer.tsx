import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black py-10">
      <div className="container mx-auto px-4 flex flex-col">
        {/* Large Title - Centered */}
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold leading-none tracking-tight text-white text-center mb-8">
          THE DEPTH FACTOR
        </div>
        
        {/* Subtle separator */}
        <div className="w-full border-t border-white/10 mb-6"></div>
        
        {/* Navigation Links - Right aligned, single line, smaller font */}
        <nav className="w-full flex justify-end space-x-8 text-xs tracking-wider uppercase py-2">
          <Link href="/about" className="text-white/70 hover:text-[var(--color-cinnabar)] transition-colors duration-300">
            About Dr. Suri
          </Link>
          <Link href="/legal" className="text-white/70 hover:text-[var(--color-cinnabar)] transition-colors duration-300">
            Legal
          </Link>
        </nav>
      </div>
    </footer>
  );
}