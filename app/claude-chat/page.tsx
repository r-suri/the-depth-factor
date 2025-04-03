import AIChat from '../components/AIChat';

export default function TogetherChatPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <h1 className="text-2xl font-bold mb-6">Claude AI Chat</h1>
      <div className="w-full max-w-4xl">
        <AIChat />
      </div>
    </main>
  );
} 