import React, { useState, useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api';
import { COLLECTION_TITLES, COLOR_HEX_MAP, discount, inr, type Product } from '../data';
import { useData } from '../hooks';

export default function Collection() {
  const { handle = 'best-sellers' } = useParams();
  const rawItems = useData(() => api.collection(handle), [handle]);
  const title = COLLECTION_TITLES[handle] ?? handle.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  // Filter & sort state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sort, setSort] = useState<'newest' | 'price-asc' | 'price-desc' | 'title-asc' | 'title-desc'>('newest');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
  const [selectedNecks, setSelectedNecks] = useState<string[]>([]);
  const [selectedSleeves, setSelectedSleeves] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  // Reset filters when collection changes
  useEffect(() => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedCategories([]);
    setSelectedFabrics([]);
    setSelectedPatterns([]);
    setSelectedNecks([]);
    setSelectedSleeves([]);
    setSelectedGenders([]);
    setPriceMin('');
    setPriceMax('');
  }, [handle]);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.documentElement.classList.add('pf-scroll-lock');
      document.body.classList.add('pf-scroll-lock');
    } else {
      document.documentElement.classList.remove('pf-scroll-lock');
      document.body.classList.remove('pf-scroll-lock');
    }
    return () => {
      document.documentElement.classList.remove('pf-scroll-lock');
      document.body.classList.remove('pf-scroll-lock');
    };
  }, [drawerOpen]);

  // Toggle helper
  const toggleItem = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]);
  };

  const clearAllFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedCategories([]);
    setSelectedFabrics([]);
    setSelectedPatterns([]);
    setSelectedNecks([]);
    setSelectedSleeves([]);
    setSelectedGenders([]);
    setPriceMin('');
    setPriceMax('');
  };

  const toggleWishlist = (productHandle: string) => {
    setWishlist(prev => ({ ...prev, [productHandle]: !prev[productHandle] }));
  };

  // Filtered & sorted product list
  const filteredProducts = useMemo(() => {
    if (!rawItems) return [];
    let list = [...rawItems];

    if (selectedSizes.length > 0) {
      list = list.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
    }
    if (selectedColors.length > 0) {
      list = list.filter(p => p.color && selectedColors.includes(p.color));
    }
    if (selectedCategories.length > 0) {
      list = list.filter(p => p.category && selectedCategories.includes(p.category));
    }
    if (selectedFabrics.length > 0) {
      list = list.filter(p => p.fabric && selectedFabrics.includes(p.fabric));
    }
    if (selectedPatterns.length > 0) {
      list = list.filter(p => p.pattern && selectedPatterns.includes(p.pattern));
    }
    if (selectedNecks.length > 0) {
      list = list.filter(p => p.neck && selectedNecks.includes(p.neck));
    }
    if (selectedSleeves.length > 0) {
      list = list.filter(p => p.sleeve && selectedSleeves.includes(p.sleeve));
    }
    if (selectedGenders.length > 0) {
      list = list.filter(p => p.gender && selectedGenders.includes(p.gender));
    }
    if (priceMin !== '') {
      const min = parseFloat(priceMin);
      if (!isNaN(min)) list = list.filter(p => p.price >= min);
    }
    if (priceMax !== '') {
      const max = parseFloat(priceMax);
      if (!isNaN(max)) list = list.filter(p => p.price <= max);
    }

    // Sort
    list.sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'title-asc') return a.title.localeCompare(b.title);
      if (sort === 'title-desc') return b.title.localeCompare(a.title);
      return 0; // newest
    });

    return list;
  }, [
    rawItems,
    selectedSizes,
    selectedColors,
    selectedCategories,
    selectedFabrics,
    selectedPatterns,
    selectedNecks,
    selectedSleeves,
    selectedGenders,
    priceMin,
    priceMax,
    sort,
  ]);

  const hasActiveFilters =
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    selectedCategories.length > 0 ||
    selectedFabrics.length > 0 ||
    selectedPatterns.length > 0 ||
    selectedNecks.length > 0 ||
    selectedSleeves.length > 0 ||
    selectedGenders.length > 0 ||
    priceMin !== '' ||
    priceMax !== '';

  const AVAILABLE_SIZES = ['30', '32', '34', '36', '38', '40', 'S', 'M', 'L', 'XL', '2XL'];
  const AVAILABLE_COLORS = ['Black', 'Blue', 'Brown', 'White', 'Green', 'Grey', 'Beige', 'Pink', 'Navy', 'Red'];
  const AVAILABLE_CATEGORIES = ['Shirt', 'T-Shirt', 'Trouser', 'Kurta', 'Pyjama', 'Sherwani', 'Jacket'];
  const AVAILABLE_FABRICS = ['Cotton', 'Linen', 'Silk', 'Lycra', 'Jacquard', 'Denim'];
  const AVAILABLE_PATTERNS = ['Solid', 'Stripes', 'Checks'];
  const AVAILABLE_NECKS = ['Mandarin', 'Round', 'V-Neck', 'Polo', 'Crew Neck'];
  const AVAILABLE_SLEEVES = ['Full', 'Half', 'Sleeveless'];

  return (
    <div className="pf-root" data-pf-root>
      {/* Header & Breadcrumb */}
      <div className="pf-header">
        <div className="crumb">
          <Link to="/">Home</Link> / <span>{title}</span>
        </div>
        <h1>{title}</h1>
      </div>

      {/* Toolbar */}
      <div className="pf-toolbar">
        <button
          type="button"
          className="pf-toolbar__trigger"
          onClick={() => setDrawerOpen(true)}
          aria-expanded={drawerOpen}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
            <circle cx="9" cy="6" r="2" fill="currentColor"></circle>
            <circle cx="16" cy="12" r="2" fill="currentColor"></circle>
            <circle cx="11" cy="18" r="2" fill="currentColor"></circle>
          </svg>
          <span>Filters</span>
        </button>

        <span className="pf-toolbar__count">
          {rawItems ? `${filteredProducts.length} products` : 'Loading products…'}
        </span>

        <div className="pf-toolbar__sort">
          <select
            className="pf-select"
            value={sort}
            onChange={e => setSort(e.target.value as any)}
            aria-label="Sort products"
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title-asc">Alphabetically: A-Z</option>
            <option value="title-desc">Alphabetically: Z-A</option>
          </select>
        </div>
      </div>

      {/* Active filters pill chips */}
      {hasActiveFilters && (
        <div className="pf-active-tags">
          {selectedSizes.map(s => (
            <span key={s} className="pf-active-tag">
              Size: {s}
              <button onClick={() => toggleItem(selectedSizes, setSelectedSizes, s)}>×</button>
            </span>
          ))}
          {selectedColors.map(c => (
            <span key={c} className="pf-active-tag">
              Color: {c}
              <button onClick={() => toggleItem(selectedColors, setSelectedColors, c)}>×</button>
            </span>
          ))}
          {selectedCategories.map(c => (
            <span key={c} className="pf-active-tag">
              Category: {c}
              <button onClick={() => toggleItem(selectedCategories, setSelectedCategories, c)}>×</button>
            </span>
          ))}
          {selectedFabrics.map(f => (
            <span key={f} className="pf-active-tag">
              Fabric: {f}
              <button onClick={() => toggleItem(selectedFabrics, setSelectedFabrics, f)}>×</button>
            </span>
          ))}
          {selectedPatterns.map(p => (
            <span key={p} className="pf-active-tag">
              Pattern: {p}
              <button onClick={() => toggleItem(selectedPatterns, setSelectedPatterns, p)}>×</button>
            </span>
          ))}
          {selectedNecks.map(n => (
            <span key={n} className="pf-active-tag">
              Neck: {n}
              <button onClick={() => toggleItem(selectedNecks, setSelectedNecks, n)}>×</button>
            </span>
          ))}
          {selectedSleeves.map(sl => (
            <span key={sl} className="pf-active-tag">
              Sleeve: {sl}
              <button onClick={() => toggleItem(selectedSleeves, setSelectedSleeves, sl)}>×</button>
            </span>
          ))}
          {(priceMin !== '' || priceMax !== '') && (
            <span className="pf-active-tag">
              Price: ₹{priceMin || '0'} - ₹{priceMax || '∞'}
              <button onClick={() => { setPriceMin(''); setPriceMax(''); }}>×</button>
            </span>
          )}
          <button className="pf-active-clear" onClick={clearAllFilters}>
            Clear all
          </button>
        </div>
      )}

      {/* Mobile Bottom Fixed Bar */}
      <div className="pf-mobile-bar" role="navigation" aria-label="Filter and Sort">
        <button
          type="button"
          className="pf-mobile-bar__btn"
          onClick={() => setDrawerOpen(true)}
          aria-expanded={drawerOpen}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
            <circle cx="9" cy="6" r="2" fill="currentColor"></circle>
            <circle cx="16" cy="12" r="2" fill="currentColor"></circle>
            <circle cx="11" cy="18" r="2" fill="currentColor"></circle>
          </svg>
          <span>Filters</span>
          {hasActiveFilters && <span className="pf-mobile-bar__badge" aria-hidden="true" />}
        </button>

        <span className="pf-mobile-bar__divider" aria-hidden="true"></span>

        <label className="pf-mobile-bar__btn pf-mobile-bar__sort">
          <span>Sort</span>
          <svg width="11" height="7" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M1 1l4 4 4-4"></path>
          </svg>
          <select
            className="pf-mobile-bar__select"
            value={sort}
            onChange={e => setSort(e.target.value as any)}
            aria-label="Sort products"
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title-asc">Alphabetically: A-Z</option>
            <option value="title-desc">Alphabetically: Z-A</option>
          </select>
        </label>
      </div>

      {/* Backdrop overlay */}
      <div
        className={`pf-backdrop ${drawerOpen ? 'pf-backdrop--visible' : ''}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Slide-in Filter Panel (Drawer) */}
      <div className={`pf-panel ${drawerOpen ? 'pf-panel--open' : ''}`}>
        <div className="pf-panel__header">
          <h2 className="pf-panel__heading">Filters</h2>
          <button
            type="button"
            className="pf-panel__close"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close filters"
          >
            &times;
          </button>
        </div>

        <div className="pf-panel__body">
          {/* Size Filter */}
          <details className="pf-group" open>
            <summary className="pf-group__title">Size</summary>
            <div className="pf-group__options pf-size-grid">
              {AVAILABLE_SIZES.map(s => {
                const sel = selectedSizes.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    className={`pf-size-pill ${sel ? 'is-selected' : ''}`}
                    onClick={() => toggleItem(selectedSizes, setSelectedSizes, s)}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </details>

          {/* Color Filter */}
          <details className="pf-group" open>
            <summary className="pf-group__title">Color</summary>
            <div className="pf-group__options pf-color-grid">
              {AVAILABLE_COLORS.map(c => {
                const sel = selectedColors.includes(c);
                const hex = COLOR_HEX_MAP[c.toLowerCase()] || '#cccccc';
                return (
                  <button
                    key={c}
                    type="button"
                    className={`pf-color-pill ${sel ? 'is-selected' : ''}`}
                    onClick={() => toggleItem(selectedColors, setSelectedColors, c)}
                  >
                    <span className="pf-color-dot" style={{ backgroundColor: hex }} />
                    <span>{c}</span>
                  </button>
                );
              })}
            </div>
          </details>

          {/* Price Range */}
          <details className="pf-group" open>
            <summary className="pf-group__title">Price (₹)</summary>
            <div className="pf-price-inputs">
              <input
                type="number"
                min="0"
                className="pf-input"
                placeholder="Min"
                value={priceMin}
                onChange={e => setPriceMin(e.target.value)}
              />
              <span>—</span>
              <input
                type="number"
                min="0"
                className="pf-input"
                placeholder="Max"
                value={priceMax}
                onChange={e => setPriceMax(e.target.value)}
              />
            </div>
          </details>

          {/* Categories */}
          <details className="pf-group" open>
            <summary className="pf-group__title">Categories</summary>
            <div className="pf-group__options">
              {AVAILABLE_CATEGORIES.map(cat => (
                <label key={cat} className="pf-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleItem(selectedCategories, setSelectedCategories, cat)}
                  />
                  <span className="pf-checkbox__label">{cat}</span>
                </label>
              ))}
            </div>
          </details>

          {/* Fabric */}
          <details className="pf-group" open>
            <summary className="pf-group__title">Fabric</summary>
            <div className="pf-group__options">
              {AVAILABLE_FABRICS.map(fab => (
                <label key={fab} className="pf-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedFabrics.includes(fab)}
                    onChange={() => toggleItem(selectedFabrics, setSelectedFabrics, fab)}
                  />
                  <span className="pf-checkbox__label">{fab}</span>
                </label>
              ))}
            </div>
          </details>

          {/* Pattern */}
          <details className="pf-group" open>
            <summary className="pf-group__title">Pattern</summary>
            <div className="pf-group__options">
              {AVAILABLE_PATTERNS.map(pat => (
                <label key={pat} className="pf-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedPatterns.includes(pat)}
                    onChange={() => toggleItem(selectedPatterns, setSelectedPatterns, pat)}
                  />
                  <span className="pf-checkbox__label">{pat}</span>
                </label>
              ))}
            </div>
          </details>

          {/* Neck */}
          <details className="pf-group">
            <summary className="pf-group__title">Neck</summary>
            <div className="pf-group__options">
              {AVAILABLE_NECKS.map(n => (
                <label key={n} className="pf-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedNecks.includes(n)}
                    onChange={() => toggleItem(selectedNecks, setSelectedNecks, n)}
                  />
                  <span className="pf-checkbox__label">{n}</span>
                </label>
              ))}
            </div>
          </details>

          {/* Sleeve */}
          <details className="pf-group">
            <summary className="pf-group__title">Sleeve</summary>
            <div className="pf-group__options">
              {AVAILABLE_SLEEVES.map(sl => (
                <label key={sl} className="pf-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedSleeves.includes(sl)}
                    onChange={() => toggleItem(selectedSleeves, setSelectedSleeves, sl)}
                  />
                  <span className="pf-checkbox__label">{sl}</span>
                </label>
              ))}
            </div>
          </details>
        </div>

        <div className="pf-panel__actions">
          <button type="button" className="pf-btn pf-btn--ghost" onClick={clearAllFilters}>
            Clear all
          </button>
          <button type="button" className="pf-btn pf-btn--primary" onClick={() => setDrawerOpen(false)}>
            View results
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="pf-grid" data-pf-grid>
        {filteredProducts.map(product => {
          const isWish = !!wishlist[product.handle];
          const hex = product.color ? COLOR_HEX_MAP[product.color.toLowerCase()] : null;
          return (
            <div className="pf-card" key={product.handle} data-pf-card>
              <Link to={`/products/${product.handle}`} className="pf-card__image-link">
                {product.isNew && <span className="pf-badge">New</span>}
                <img
                  className="pf-card__image pf-card__image--primary"
                  src={product.images[0]}
                  alt={product.title}
                  loading="lazy"
                />
                {product.images[1] && (
                  <img
                    className="pf-card__image pf-card__image--hover"
                    src={product.images[1]}
                    alt={product.title}
                    loading="lazy"
                  />
                )}
              </Link>

              <button
                type="button"
                className={`pf-card__wishlist pf-badge-save ${isWish ? 'is-active' : ''}`}
                onClick={() => toggleWishlist(product.handle)}
                aria-label="Save"
                aria-pressed={isWish}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill={isWish ? '#D92231' : 'none'}
                  stroke={isWish ? '#D92231' : '#0D1117'}
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                </svg>
                <span>Save</span>
              </button>

              <div className="pf-card__body">
                <Link to={`/products/${product.handle}`} className="pf-card__title">
                  {product.title}
                </Link>
                <div className="pf-card__type">
                  {product.type || 'Premium apparel'}
                </div>
                <div className="pf-card__price-row">
                  <span className="pf-price">{inr(product.price)}</span>
                  {product.mrp > product.price && (
                    <span className="pf-price--compare">{inr(product.mrp)}</span>
                  )}
                  {discount(product) > 0 && (
                    <span className="pf-discount">{discount(product)}% OFF</span>
                  )}
                </div>
                {hex && (
                  <div className="pf-card__swatches">
                    <span
                      className="pf-swatch"
                      style={{ backgroundColor: hex }}
                      title={product.color}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filteredProducts.length === 0 && (
          <div className="pf-empty">
            <h3>No products found</h3>
            <p>Try adjusting or clearing your filters to see more items.</p>
            <button
              type="button"
              className="pf-btn pf-btn--primary"
              style={{ marginTop: 16 }}
              onClick={clearAllFilters}
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
