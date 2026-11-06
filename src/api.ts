import { PRODUCTS, type Product } from './data';
const BASE = import.meta.env.VITE_API_BASE as string | undefined;

async function get<T>(path: string, mock: () => T): Promise<T> {
  if (!BASE) return mock();
  const res = await fetch(BASE + path);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}
const seed = (s: string) => [...s].reduce((a, c) => a + c.charCodeAt(0), 0);

/** Set VITE_API_BASE to your Swagger base URL; each call below maps to one endpoint. */
export const api = {
  collection: (handle: string) => get<Product[]>(`/collections/${handle}/products`, () => { const o = seed(handle) % 8; return PRODUCTS.slice(o, o + 16); }),
  product: (handle: string) => get<Product>(`/products/${handle}`, () => PRODUCTS.find(p => p.handle === handle) ?? PRODUCTS[0]),
  search: (q: string) => get<Product[]>(`/search?q=${encodeURIComponent(q)}`, () => PRODUCTS.filter(p => p.title.toLowerCase().includes(q.toLowerCase()))),
  subscribe: async (email: string) => { if (BASE) await fetch(`${BASE}/newsletter`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) }); },
};
