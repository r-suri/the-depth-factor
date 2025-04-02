import Image from 'next/image';
import Link from 'next/link';

// Define the type for blog post data
interface BlogPostProps {
  title: string;
  excerpt: string;
  date: string;
  imageUrl?: string;
  url: string;
  tags?: string[];
}

export default function BlogPost({ title, excerpt, date, imageUrl, url, tags }: BlogPostProps) {
  return (
    <div className="bg-white dark:bg-[#363636] rounded-md shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
      {imageUrl && (
        <div className="relative h-48 w-full">
          <Image 
            src={imageUrl} 
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags?.map((tag, index) => (
            <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 text-[var(--color-jet)]/70 dark:text-[var(--color-floral-white)]/70 px-2 py-1 rounded-sm">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-[var(--color-jet)] dark:text-[var(--color-floral-white)] tracking-tight">{title}</h3>
        <p className="text-[var(--color-jet)]/70 dark:text-[var(--color-floral-white)]/70 text-sm mb-4">{excerpt}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-[var(--color-jet)]/50 dark:text-[var(--color-floral-white)]/50">{date}</span>
          <Link href={url} className="text-[var(--color-cinnabar)] hover:text-[#c04d2f] transition-colors text-sm font-medium">
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
} 