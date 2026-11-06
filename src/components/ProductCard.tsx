import { useState } from 'react';
import { Link } from 'react-router-dom';
import { discount, inr, type Product } from '../data';
export default function ProductCard({ p }: { p: Product }) {
  const [wish, setWish] = useState(false);
  const to = `/products/${p.handle}`;
  return (
    <div className="fc-item"><div className="fc-card">
      <div className="fc-img">
        <Link className="fc-imglink" to={to}><div className="fc-media"><img src={p.images[0]} alt={p.title} loading="lazy" /><img className="fc-pic2" src={p.images[1]} alt="" loading="lazy" /></div></Link>
        <span className="fc-badge">Sale</span>
        <button className={`fc-wish${wish ? ' on' : ''}`} aria-label="Add to wishlist" onClick={() => setWish(w => !w)}><svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.2 2.8 4.5 6.4 4.5c2 0 3.5 1 5.600 3.200 2.100-2.200 3.600-3.200 5.600-3.200 3.600 0 5.500 3.700 4 7.200C19.500 16.400 12 21 12 21z" /></svg></button>
        <Link className="fc-quick" to={to}><span className="fc-q-text">Choose options</span><span className="fc-q-plus">+</span></Link>
      </div>
      <div className="fc-info"><h3 className="fc-name"><Link to={to}>{p.title}</Link></h3><div className="fc-price"><b>{inr(p.price)}</b><s>{inr(p.mrp)}</s><em>{discount(p)}% off</em></div></div>
    </div></div>
  );
}
