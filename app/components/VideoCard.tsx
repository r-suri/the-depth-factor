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
    <div className="bg-white dark:bg-[#363636] rounded-md shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
      {thumbnail && (
        <div className="relative">
          <Link href={url} target="_blank" rel="noopener noreferrer">
            <div className="relative w-full h-48 overflow-hidden">
              <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-all duration-300 hover:bg-opacity-20">
                <div className="w-12 h-12 bg-[var(--color-cinnabar)] rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                  <div className="w-0 h-0 border-t-6 border-b-6 border-l-10 border-transparent border-l-white ml-1"></div>
                </div>
              </div>
            </div>
          </Link>
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
        <p className="text-[var(--color-jet)]/70 dark:text-[var(--color-floral-white)]/70 text-sm mb-4">{description}</p>
        <Link 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[var(--color-cinnabar)] hover:text-[#c04d2f] transition-colors text-sm font-medium"
        >
          Watch video
        </Link>
      </div>
    </div>
  );
} 