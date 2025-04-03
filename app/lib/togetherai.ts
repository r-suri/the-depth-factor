import { togetherai } from '@ai-sdk/togetherai';

// For consistency with Vercel AI SDK docs
export const together = togetherai;

// Re-export the Together.ai provider
export { togetherai };

// Export everything from the Together.ai package
export * from '@ai-sdk/togetherai'; 