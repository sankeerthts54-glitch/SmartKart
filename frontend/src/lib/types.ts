export interface Review {
  user: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
  helpful_votes: number;
  platform: string;
}

export interface Offer {
  title: string;
  discount_type: string;
  value?: string;
  code?: string;
  expires?: string;
}

export interface PlatformListing {
  platform: string;
  platform_display: string;
  price: number;
  original_price: number;
  discount_percent: number;
  url: string;
  in_stock: boolean;
  delivery: string;
  rating: number;
  total_reviews: number;
  offers: Offer[];
  reviews: Review[];
  seller?: string;
  warranty?: string;
}

export interface Spec {
  key: string;
  value: string;
  category?: string;
}

export interface PricePoint {
  date: string;
  platform: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory?: string;
  image_url: string;
  description: string;
  search_keywords: string[];
  specs: Spec[];
  platforms: PlatformListing[];
  price_history: PricePoint[];
  best_price?: number;
  best_platform?: string;
  lowest_ever_price?: number;
  lowest_ever_date?: string;
  ai_verdict?: string;
  buy_recommendation?: string;
  is_live?: boolean;
}

export interface AgentEvent {
  agent: string;
  status: string;
  message: string;
  progress: number;
}
