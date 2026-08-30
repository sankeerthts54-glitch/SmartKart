import { Product, AgentEvent } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchTrending(): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/trending`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function fetchProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/product/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchPriceHistory(id: string, platform?: string): Promise<any> {
  try {
    const url = new URL(`${BASE_URL}/api/product/${id}/price-history`);
    if (platform) url.searchParams.append('platform', platform);
    const res = await fetch(url.toString());
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchCompare(ids: string[]): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/compare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ids),
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/categories`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export function streamSearch(
  query: string, 
  onEvent: (event: AgentEvent) => void, 
  onComplete: (products: Product[]) => void, 
  onError: (err: any) => void
) {
  const url = new URL(`${BASE_URL}/api/search`);
  url.searchParams.append('q', query);
  
  const eventSource = new EventSource(url.toString());
  
  eventSource.onmessage = (e) => {
    try {
      const data = JSON.parse(e.data);
      if (data.type === 'complete') {
        onComplete(data.products || []);
        eventSource.close();
      } else {
        onEvent(data as AgentEvent);
      }
    } catch (err) {
      console.error('Failed to parse SSE', err);
    }
  };

  eventSource.onerror = (err) => {
    eventSource.close();
    onError(err);
  };

  return () => {
    eventSource.close();
  };
}
