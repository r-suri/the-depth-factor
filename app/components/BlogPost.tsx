import Link from 'next/link';
import Image from 'next/image';

// Define the type for blog post data
interface BlogPostProps {
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  url: string;
  tags?: string[];
}

const BlogPost = ({ title, excerpt, date, imageUrl, url, tags = [] }: BlogPostProps) => {
  return (
    <Link href={url} className="block group">
      <div className="card overflow-hidden h-full flex flex-col hover:border-[var(--color-cinnabar)] transition-all duration-300">
        <div className="relative h-48 w-full mb-4 overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          {tags && tags.length > 0 && (
            <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="text-xs font-medium px-2 py-1 rounded-full bg-[var(--color-cinnabar)] text-white backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--color-cinnabar)] transition-colors line-clamp-2">{title}</h3>
          <p className="text-sm text-[var(--foreground)]/80 mb-4 flex-1 line-clamp-3">{excerpt}</p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xs font-medium text-[var(--foreground)]/70">{date}</span>
            <span className="text-xs font-bold text-[var(--color-cinnabar)] flex items-center group-hover:translate-x-1 transition-transform">
              Read more
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogPost; 