import { AIProvider, Model, Pricing } from '../types';

export const mockProviders: AIProvider[] = [
  {
    id: 'gptgod',
    name: 'GPTGod',
    website: 'https://gptgod.cloud',
    description: 'Premium AI API provider with competitive pricing and reliable service',
    models: [
      { id: 'gpt-4', name: 'GPT-4', type: 'openai', multiplier: 1.2 },
      { id: 'gpt-35-turbo', name: 'GPT-3.5 Turbo', type: 'openai', multiplier: 1.0 },
      { id: 'claude-3-opus', name: 'Claude 3 Opus', type: 'claude', multiplier: 0.6 },
      { id: 'deepseek-chat', name: 'DeepSeek Chat', type: 'deepseek', multiplier: 1.8 }
    ],
    pricing: { openai: 1.2, reverse: 1.2, claude: 0.6, gemini: 0.6, deepseek: 1.8 },
    availability: 98.5,
    lastUpdated: new Date(),
    tags: ['fast', 'reliable', 'multi-model']
  },
  {
    id: 'zhtec',
    name: 'ZHTEC',
    website: 'https://api1.zhtec.xyz',
    description: 'Cost-effective AI solutions for developers and businesses',
    models: [
      { id: 'gpt-4', name: 'GPT-4', type: 'openai', multiplier: 1.0 },
      { id: 'gpt-35-turbo', name: 'GPT-3.5 Turbo', type: 'openai', multiplier: 1.0 },
      { id: 'claude-3-opus', name: 'Claude 3 Opus', type: 'claude', multiplier: 8.0 },
      { id: 'deepseek-chat', name: 'DeepSeek Chat', type: 'deepseek', multiplier: 2.72 }
    ],
    pricing: { openai: 1.0, reverse: 1.0, claude: 8.0, gemini: 1.0, deepseek: 2.72 },
    availability: 96.2,
    lastUpdated: new Date(),
    tags: ['budget-friendly', 'developer-focused']
  },
  {
    id: 'nekoapi',
    name: 'NekoAPI',
    website: 'https://api.nekoapi.com',
    description: 'Comprehensive AI platform with multiple model support',
    models: [
      { id: 'gpt-4', name: 'GPT-4', type: 'openai', multiplier: 2.0 },
      { id: 'claude-3-opus', name: 'Claude 3 Opus', type: 'claude', multiplier: 2.0 },
      { id: 'gemini-pro', name: 'Gemini Pro', type: 'gemini', multiplier: 2.0 },
      { id: 'deepseek-chat', name: 'DeepSeek Chat', type: 'deepseek', multiplier: 8.0 }
    ],
    pricing: { openai: 2.0, reverse: 4.0, claude: 2.0, gemini: 2.0, deepseek: 8.0 },
    availability: 94.8,
    lastUpdated: new Date(),
    tags: ['comprehensive', 'multi-provider']
  },
  {
    id: 'sbgpt',
    name: 'SBGPT',
    website: 'https://go.sbgpt.site',
    description: 'Ultra-low cost OpenAI alternative with DeepSeek support',
    models: [
      { id: 'gpt-4', name: 'GPT-4', type: 'openai', multiplier: 0.4 },
      { id: 'deepseek-chat', name: 'DeepSeek Chat', type: 'deepseek', multiplier: 2.18 }
    ],
    pricing: { openai: 0.4, reverse: 0.4, claude: 0.4, gemini: 0.4, deepseek: 2.18 },
    availability: 92.1,
    lastUpdated: new Date(),
    tags: ['ultra-cheap', 'budget', 'lightweight']
  },
  {
    id: 'ggwk1',
    name: 'GGWK1',
    website: 'https://www.ggwk1.online',
    description: 'High-performance AI APIs optimized for speed and reliability',
    models: [
      { id: 'gpt-4', name: 'GPT-4', type: 'openai', multiplier: 0.6 },
      { id: 'gpt-35-turbo', name: 'GPT-3.5 Turbo', type: 'openai', multiplier: 0.6 }
    ],
    pricing: { openai: 0.6, reverse: 0.6, claude: 0.6, gemini: 0.6, deepseek: 0.6 },
    availability: 99.2,
    lastUpdated: new Date(),
    tags: ['high-performance', 'fast-response']
  },
  {
    id: 'aabao',
    name: 'AABAO',
    website: 'https://api.aabao.top',
    description: 'Affordable AI services with excellent customer support',
    models: [
      { id: 'gpt-4', name: 'GPT-4', type: 'openai', multiplier: 0.6 },
      { id: 'claude-3-opus', name: 'Claude 3 Opus', type: 'claude', multiplier: 0.3 },
      { id: 'gemini-pro', name: 'Gemini Pro', type: 'gemini', multiplier: 0.3 }
    ],
    pricing: { openai: 0.6, reverse: 0.6, claude: 0.3, gemini: 0.3, deepseek: 0.3 },
    availability: 97.8,
    lastUpdated: new Date(),
    tags: ['affordable', 'good-support', 'claude-optimized']
  }
];