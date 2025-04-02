import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Large Title */}
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold leading-none tracking-tight text-white">
          THE DEPTH FACTOR
        </div>
        {/* Navigation Links */}
        <nav className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 text-lg">
          <Link href="/about" className="text-white hover:text-[var(--color-cinnabar)] transition-colors duration-300 font-medium">
            About Dr. Suri
          </Link>
          <Link href="/legal" className="text-white hover:text-[var(--color-cinnabar)] transition-colors duration-300 font-medium">
            Legal
          </Link>
        </nav>
      </div>
    </footer>
  );
}