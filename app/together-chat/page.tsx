export default function TogetherChatPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black">
      <iframe 
        src="/api/chat-interface" 
        className="w-full h-screen border-none"
      />
    </main>
  );
} 