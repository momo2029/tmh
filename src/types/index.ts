export interface AIProvider {
  id: string;
  name: string;
  website: string;
  description: string;
  models: Model[];
  pricing: Pricing;
  availability: number;
  lastUpdated: Date;
  tags: string[];
}

export interface Model {
  id: string;
  name: string;
  type: 'openai' | 'claude' | 'gemini' | 'deepseek';
  multiplier: number;
  description?: string;
}

export interface Pricing {
  openai: number;
  reverse: number;
  claude: number;
  gemini: number;
  deepseek: number;
}

export interface PriceHistory {
  providerId: string;
  model: string;
  price: number;
  date: Date;
}

export interface Review {
  id: string;
  providerId: string;
  rating: number;
  comment: string;
  author: string;
  date: Date;
}

export interface UptimeData {
  providerId: string;
  timestamp: Date;
  uptime: number;
  responseTime: number;
}