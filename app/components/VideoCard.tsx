import Link from 'next/link';
import Image from 'next/image';

// Define the type for video data
interface VideoCardProps {
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  tags?: string[];
}

const VideoCard = ({ title, description, url, thumbnailUrl, tags = [] }: VideoCardProps) => {
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer" className="block group">
      <div className="card overflow-hidden h-full flex flex-col hover:border-[var(--color-verdigris)] transition-all duration-300">
        <div className="relative h-48 w-full mb-4 overflow-hidden rounded-lg">
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[var(--color-verdigris)] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          {tags && tags.length > 0 && (
            <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="text-xs font-medium px-2 py-1 rounded-full bg-[var(--color-verdigris)] text-white backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--color-verdigris)] transition-colors line-clamp-2">{title}</h3>
          <p className="text-sm text-[var(--foreground)]/80 mb-4 flex-1 line-clamp-3">{description}</p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--color-verdigris)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
              <span className="text-xs ml-1 font-medium text-[var(--foreground)]/70">YouTube</span>
            </div>
            <span className="text-xs font-bold text-[var(--color-verdigris)] flex items-center group-hover:translate-x-1 transition-transform">
              Watch now
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

export default VideoCard; 