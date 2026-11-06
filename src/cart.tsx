import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Product } from './data';

export interface Line { product: Product; size: string; qty: number }
interface Ctx { lines: Line[]; count: number; total: number; add: (p: Product, size: string, qty: number) => void; setQty: (i: number, d: number) => void }
const C = createContext<Ctx>(null!);
export const useCart = () => useContext(C);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>(() => {
    try {
      const raw = JSON.parse(localStorage.getItem('cc-cart') || '[]');
      if (Array.isArray(raw)) {
        return raw.filter((l): l is Line => Boolean(l && l.product && typeof l.product.price === 'number' && typeof l.qty === 'number'));
      }
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cc-cart', JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const v = useMemo<Ctx>(() => ({
    lines,
    count: lines.reduce((a, l) => a + (l.qty || 0), 0),
    total: lines.reduce((a, l) => a + (l.qty || 0) * (l.product?.price || 0), 0),
    add: (product, size, qty) => setLines(ls => {
      if (!product || !product.handle) return ls;
      const i = ls.findIndex(l => l.product?.handle === product.handle && l.size === size);
      return i < 0 ? [...ls, { product, size, qty }] : ls.map((l, x) => (x === i ? { ...l, qty: l.qty + qty } : l));
    }),
    setQty: (i, d) => setLines(ls => ls.flatMap((l, x) => (x !== i ? [l] : l.qty + d < 1 ? [] : [{ ...l, qty: l.qty + d }]))),
  }), [lines]);

  return <C.Provider value={v}>{children}</C.Provider>;
}
