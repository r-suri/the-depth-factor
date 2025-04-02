import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Large Title */}
        <div className="text-7xl font-bold leading-none tracking-tight">
          THE DEPTH FACTOR
        </div>
        {/* Navigation Links */}
        <nav className="flex space-x-8 text-lg">
          <Link href="/about" className="hover:underline">
            About Dr. Suri
          </Link>
          <Link href="/legal" className="hover:underline">
            Legal
          </Link>
        </nav>
      </div>
    </footer>
  );
}