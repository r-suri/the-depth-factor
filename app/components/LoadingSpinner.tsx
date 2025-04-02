interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = 'Searching...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-2 border-gray-200 dark:border-gray-700"></div>
        <div className="absolute inset-0 rounded-full border-t-2 border-[var(--color-cinnabar)] animate-spin"></div>
      </div>
      <p className="mt-4 text-[var(--color-jet)]/70 dark:text-[var(--color-floral-white)]/70 font-medium">{message}</p>
    </div>
  );
} 