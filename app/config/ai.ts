/**
 * AI Model Configuration
 * Contains settings for various AI models used in the application
 */

interface ModelConfig {
  id: string;
  provider: string;
  displayName: string;
  contextWindow: number;
  maxOutputTokens: number;
  temperature: number;
}

// Current model in use
export const CURRENT_MODEL: ModelConfig = {
  id: 'deepseek-ai/DeepSeek-V3',
  provider: 'together',
  displayName: 'DeepSeek V3',
  contextWindow: 8192,
  maxOutputTokens: 1000,
  temperature: 0.7
};

// Available models
export const AVAILABLE_MODELS: ModelConfig[] = [
  CURRENT_MODEL,
  {
    id: 'togethercomputer/llama-3-70b-instruct',
    provider: 'together',
    displayName: 'Llama-3 70B',
    contextWindow: 8192,
    maxOutputTokens: 1000,
    temperature: 0.7
  },
];

// Default settings for chat completions
export const DEFAULT_CHAT_SETTINGS = {
  temperature: 0.7,
  max_tokens: 1000,
  stream: true,
}; 