import { useEffect, useState } from 'react';
export function useData<T>(fn: () => Promise<T>, deps: unknown[]): T | null {
  const [d, setD] = useState<T | null>(null);
  useEffect(() => { let on = true; setD(null); fn().then(r => on && setD(r)).catch(() => on && setD(null)); return () => { on = false; }; }, deps); // eslint-disable-line react-hooks/exhaustive-deps
  return d;
}
export function useInView<T extends Element>(cls = 'in') {
  const [el, ref] = useState<T | null>(null);
  useEffect(() => {
    if (!el) return;
    if (!('IntersectionObserver' in window)) { el.classList.add(cls); return; }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add(cls); io.disconnect(); } }), { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, [el, cls]);
  return ref;
}
