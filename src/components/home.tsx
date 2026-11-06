import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { EDITORIAL_VIDEO, F, HERO_SLIDES, IMG, LOCAL, PRODUCTS, WATCH, discount, inr } from '../data';
import Img from './Img';
import ProductCard from './ProductCard';

export function Hero() {
  const [i, setI] = useState(0);
  const sx = useRef<number | null>(null);
  const n = HERO_SLIDES.length;
  useEffect(() => { const t = setInterval(() => setI(x => (x + 1) % n), 4000); return () => clearInterval(t); }, [i, n]);
  return (
    <section className="ccs" onTouchStart={e => { sx.current = e.touches[0].clientX; }} onTouchEnd={e => { if (sx.current == null) return; const d = e.changedTouches[0].clientX - sx.current; if (Math.abs(d) > 40) setI(x => (x + (d < 0 ? 1 : n - 1)) % n); sx.current = null; }}>
      {HERO_SLIDES.map((s, k) => (
        <div key={k} className={`ccs__slide${k === i ? ' is-active' : ''}`} aria-hidden={k !== i}>
          <picture><source media="(max-width:768px)" srcSet={s.m} /><Img className="ccs__img" src={s.d} fallback={IMG('cc-hero')} alt="COOLCOLORS" loading={k ? 'lazy' : 'eager'} /></picture>
          <div className="ccs__shade" /><Link className="ccs__link" to={s.to} aria-label="Shop" tabIndex={-1} />
        </div>
      ))}
    </section>
  );
}

const CATS: [string, string, string, string][] = [
  ['Shirts', 'shirts', 'shirt_category.png', LOCAL[1]], ['T-Shirts', 't-shirt', 't_shirt_category.png', LOCAL[2]],
  ['Bottoms', 'bottomwear', 'trousers_category_c1f294f0-9ecf-4cc6-960d-4af6a78e1ff4.png', LOCAL[5]], ['Blazers', 'blazers', 'blazers_category.png', LOCAL[3]],
  ['Most Trending', 'most-trending', 'WhatsApp_Image_2026-10-06_at_13.15.25.jpg', LOCAL[4]], ['New Arrivals', 'new-arrivals', 'WhatsApp_Image_2026-10-06_at_13.13.46.jpg', LOCAL[0]],
];
const Tile = ([label, handle, file, fb]: (typeof CATS)[number]) => (
  <Link key={handle} className="sbc__tile" to={`/collections/${handle}`}><Img src={`${F}${file}?width=900`} fallback={fb} alt={label} /><span className="sbc__label">{label.toUpperCase()}</span></Link>
);
export function ShopByCategory() {
  return (
    <section className="shop-category"><h2 className="sc-h">Shop by category</h2>
      <div className="sbc"><div className="sbc__top">{CATS.slice(0, 4).map(Tile)}</div><div className="sbc__bottom">{CATS.slice(4).map(Tile)}</div></div>
    </section>
  );
}

export function FeaturedEditorial() {
  return (
    <section className="fe"><div className="fe__grid">
      <div className="fe__media"><div className="fe__wrap">
        <div className="fe__back"><video src={EDITORIAL_VIDEO} poster={LOCAL[1]} autoPlay loop muted playsInline preload="metadata" /></div>
        <div className="fe__front"><Img src={`${F}solid_shirt.png?width=800`} fallback={LOCAL[2]} alt="The Solid" /></div>
      </div></div>
      <div className="fe__content">
        <p className="fe__eb"><span className="n">02</span><span className="l" /><span>Featured</span></p>
        <h2>The Solid<br />Shirt</h2><p className="fe__sub">Lightweight. Relaxed. Made for the everyday.</p>
        <Link className="fe__cta" to="/collections/shirts"><span>Explore the shirt</span><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
      </div>
    </div></section>
  );
}

export function LegacyEditorial() {
  return (
    <section className="cle"><div className="cle__grid">
      <div className="cle__big"><div className="cle__frame cle__frame--big"><Img className="cle__pic" src={`${F}kurta.png?width=1400`} fallback={LOCAL[3]} alt="" /></div><p className="cle__cap">The Linen Henley, in white</p></div>
      <div className="cle__mid"><span className="cle__bar" /><p className="cle__eyebrow">Editorial</p><h2 className="cle__title">A Legacy<br />Unveiled</h2>
        <p className="cle__text">A study in restraint, texture, and silhouette. The new collection pairs heritage detail with a modern, editorial mood that feels calm, sharp, and unmistakably premium.</p>
        <div className="cle__btns"><Link className="cle__btn cle__btn--primary" to="/pages/our-story">Read the story</Link><Link className="cle__btn cle__btn--ghost" to="/pages/lookbook">View the lookbook</Link></div></div>
      <div className="cle__sm"><div className="cle__frame cle__frame--sm"><Img className="cle__pic" src={`${F}kurta_fabric.png?width=1000`} fallback={LOCAL[0]} alt="" /></div><p className="cle__cap">Hand-finished slub linen</p></div>
    </div></section>
  );
}

export function FeaturedCollection() {
  return (
    <section className="fc-section"><div className="fc-head"><p className="fc-eyebrow">Handpicked for you</p><h2 className="fc-title">Featured collection</h2></div>
      <div className="fc-grid">{PRODUCTS.slice(0, 4).map(p => <ProductCard key={p.handle} p={p} />)}</div>
      <p className="c"><Link className="fc-btn" to="/collections/featured-products">View collection</Link></p></section>
  );
}

export { default as WatchAndBuy } from './WatchAndBuy';
