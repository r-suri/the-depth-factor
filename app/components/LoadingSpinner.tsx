const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-2">
      <div className="relative flex">
        <div className="h-8 w-8 rounded-full border-2 border-[var(--color-cinnabar)] opacity-100 animate-ping absolute"></div>
        <div className="h-8 w-8 rounded-full border-2 border-[var(--color-verdigris)] border-t-transparent animate-spin"></div>
      </div>
      <div className="ml-4 text-sm text-[var(--muted-foreground)]">Thinking...</div>
    </div>
  );
};

export default LoadingSpinner; 