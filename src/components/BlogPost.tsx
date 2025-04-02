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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-[1.02]">
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
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-2">
          {tags?.map((tag, index) => (
            <span key={index} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{excerpt}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">{date}</span>
          <Link href={url} className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
} 