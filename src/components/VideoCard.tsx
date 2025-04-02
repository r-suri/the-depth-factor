import Link from 'next/link';

// Define the type for video data
interface VideoCardProps {
  title: string;
  description: string;
  url: string;
  thumbnailUrl?: string;
  tags?: string[];
}

export default function VideoCard({ title, description, url, thumbnailUrl, tags }: VideoCardProps) {
  // Extract YouTube video ID from URL
  const getYouTubeThumbnail = (youtubeUrl: string) => {
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = youtubeUrl.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : thumbnailUrl;
  };

  const thumbnail = thumbnailUrl || getYouTubeThumbnail(url);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-[1.02]">
      {thumbnail && (
        <div className="relative">
          <Link href={url} target="_blank" rel="noopener noreferrer">
            <div className="relative w-full h-48 overflow-hidden">
              <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white ml-1"></div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-2">
          {tags?.map((tag, index) => (
            <span key={index} className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{description}</p>
        <Link 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-red-600 dark:text-red-400 hover:underline text-sm font-medium"
        >
          Watch Video →
        </Link>
      </div>
    </div>
  );
} 