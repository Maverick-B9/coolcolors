import type { ImgHTMLAttributes } from 'react';
/** Remote (CDN) image with a local fallback if it fails to load. */
export default function Img({ fallback, ...p }: ImgHTMLAttributes<HTMLImageElement> & { fallback?: string }) {
  return <img loading="lazy" {...p} onError={e => { if (fallback && !e.currentTarget.src.endsWith(fallback)) e.currentTarget.src = fallback; }} />;
}
