import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { discount, inr } from '../data';
import { useData } from '../hooks';
import '../styles/search.css';

const SUGGESTIONS = ['Shirts', 'T-Shirts', 'Bottoms', 'Linen', 'Slim Fit', 'Solid', 'Stripes', 'Cotton'];

export default function Search() {
  const [q, setQ] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const allResults = useData(() => api.search(q), [q]);

  const toggleWishlist = (handle: string) => {
    setWishlist(prev => ({ ...prev, [handle]: !prev[handle] }));
  };

  const filteredResults = useMemo(() => {
    if (!allResults) return [];
    if (!activeCategory) return allResults;
    const cat = activeCategory.toLowerCase();
    return allResults.filter(p =>
      (p.category && p.category.toLowerCase().includes(cat)) ||
      (p.type && p.type.toLowerCase().includes(cat)) ||
      p.title.toLowerCase().includes(cat)
    );
  }, [allResults, activeCategory]);

  return (
    <div className="cc-search">
      <div className="cc-search__header">
        <h1 className="cc-search__title">Search</h1>
        <div className="cc-search__box">
          <span className="cc-search__ico">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </span>
          <input
            type="search"
            className="cc-search__input"
            placeholder="Search products, styles, fabrics..."
            value={q}
            onChange={e => setQ(e.target.value)}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
          {q && (
            <button
              type="button"
              className="cc-search__clear"
              onClick={() => { setQ(''); setActiveCategory(null); }}
              aria-label="Clear search"
            >
              &times;
            </button>
          )}
        </div>

        {/* Popular searches / Quick filter chips */}
        <div className="cc-search__chips" role="tablist" aria-label="Quick search suggestions">
          {SUGGESTIONS.map(s => {
            const isActive = q.toLowerCase() === s.toLowerCase() || activeCategory?.toLowerCase() === s.toLowerCase();
            return (
              <button
                key={s}
                type="button"
                className={`cc-search__chip ${isActive ? 'is-active' : ''}`}
                onClick={() => {
                  if (isActive) {
                    setQ('');
                    setActiveCategory(null);
                  } else {
                    setQ(s);
                    setActiveCategory(s);
                  }
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results status */}
      <div className="cc-search__status">
        <span>
          {q ? (
            <>Results for "<b>{q}</b>"</>
          ) : (
            'All Products'
          )}
        </span>
        <span>
          <b>{filteredResults.length}</b> {filteredResults.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Product grid */}
      {filteredResults.length > 0 ? (
        <div className="cc-search__grid">
          {filteredResults.map(p => {
            const isWish = Boolean(wishlist[p.handle]);
            const to = `/products/${p.handle}`;
            return (
              <article key={p.handle} className="cc-scard">
                <Link to={to} className="cc-scard__media" aria-label={p.title}>
                  <img src={p.images[0]} alt={p.title} loading="lazy" />
                  {p.images[1] && (
                    <img className="cc-scard__hover" src={p.images[1]} alt="" loading="lazy" />
                  )}
                </Link>

                <button
                  type="button"
                  className={`cc-scard__wish ${isWish ? 'is-active' : ''}`}
                  onClick={() => toggleWishlist(p.handle)}
                  aria-label="Save"
                  aria-pressed={isWish}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill={isWish ? '#D92231' : 'none'} stroke={isWish ? '#D92231' : '#0D1117'} strokeWidth="2">
                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                  </svg>
                  <span>Save</span>
                </button>

                <div className="cc-scard__body">
                  <Link to={to} className="cc-scard__t">
                    {p.title}
                  </Link>
                  <span className="cc-scard__type">
                    {p.type || p.category || 'Casual Shirt'}
                  </span>
                  <div className="cc-scard__price">
                    <span className="cc-scard__cur">{inr(p.price)}</span>
                    {p.mrp > p.price && (
                      <span className="cc-scard__mrp">{inr(p.mrp)}</span>
                    )}
                    {discount(p) > 0 && (
                      <span className="cc-scard__off">{discount(p)}% OFF</span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="cc-search__empty">
          <div className="cc-search__empty-ico">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </div>
          <h3>No products found</h3>
          <p>We couldn't find anything matching "{q}". Try checking for spelling errors or searching for a broader term.</p>
        </div>
      )}
    </div>
  );
}
