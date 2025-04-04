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

// Current model in use - placeholder for Anthropic Claude
export const CURRENT_MODEL: ModelConfig = {
  id: 'claude-3-7-sonnet-latest',
  provider: 'anthropic',
  displayName: 'Claude 3.7 Sonnet',
  contextWindow: 200000,
  maxOutputTokens: 4096,
  temperature: 0.7
};

// Available models
export const AVAILABLE_MODELS: ModelConfig[] = [
  CURRENT_MODEL,
  {
    id: 'claude-3-opus-20240229',
    provider: 'anthropic',
    displayName: 'Claude 3 Opus',
    contextWindow: 200000,
    maxOutputTokens: 4096,
    temperature: 0.7
  },
  {
    id: 'claude-3-sonnet-20240229',
    provider: 'anthropic',
    displayName: 'Claude 3 Sonnet',
    contextWindow: 200000,
    maxOutputTokens: 4096,
    temperature: 0.7
  },
  {
    id: 'claude-3-haiku-20240307',
    provider: 'anthropic',
    displayName: 'Claude 3 Haiku',
    contextWindow: 200000,
    maxOutputTokens: 4096,
    temperature: 0.7
  },
  {
    id: 'claude-3-7-sonnet-latest',
    provider: 'anthropic',
    displayName: 'Claude 3.7 Sonnet',
    contextWindow: 200000,
    maxOutputTokens: 4096,
    temperature: 0.7
  }
];

// Default settings for chat completions
export const DEFAULT_CHAT_SETTINGS = {
  temperature: 0.7,
  max_tokens: 4096,
  stream: true,
}; 