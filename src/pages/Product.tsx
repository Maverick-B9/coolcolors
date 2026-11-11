import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';
import { useCart } from '../cart';
import { PRODUCTS, discount, inr, type Product } from '../data';
import { useData } from '../hooks';
import WatchAndBuy from '../components/WatchAndBuy';

export default function ProductPage() {
  const { handle = '' } = useParams();
  const product = useData(() => api.product(handle), [handle]);
  const { add } = useCart();
  const nav = useNavigate();

  const [selectedSize, setSelectedSize] = useState('');
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);
  const atcRef = useRef<HTMLButtonElement>(null);

  // Update selected size and reset image when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'M');
      setActiveImgIndex(0);
    }
  }, [product]);

  // Mobile sticky add to cart scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (!atcRef.current) return;
      const rect = atcRef.current.getBoundingClientRect();
      setStickyVisible(rect.bottom < 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="ccp-wrapper">
        <section className="ccp" style={{ padding: '60px 24px', textAlign: 'center' }}>
          <p style={{ color: '#5C6874' }}>Loading product details…</p>
        </section>
      </div>
    );
  }

  const handleAddToCart = () => {
    add(product, selectedSize, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const handleBuyNow = () => {
    add(product, selectedSize, 1);
    nav('/cart');
  };

  const copyProductLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2200);
    }
  };

  const shareInstagram = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2200);
    }
    setTimeout(() => {
      window.open('https://www.instagram.com/', '_blank', 'noopener');
    }, 600);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`${product.title} - ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener');
  };

  // Recommendations: 4 products from same category or distinct from current
  const recommendations: Product[] = PRODUCTS.filter(p => p.handle !== product.handle).slice(0, 4);

  return (
    <div className="ccp-wrapper">
      {/* ============ MAIN PRODUCT SECTION ============ */}
      <section className="ccp" data-ccp>
        <div className="ccp__grid">
          {/* Gallery Column */}
          <div className="ccp__gallery">
            <div className="ccp__stage">
              <div className="ccp__track">
                <div className="ccp__slide">
                  <img
                    src={product.images[activeImgIndex] || product.images[0]}
                    alt={product.title}
                    loading="eager"
                  />
                </div>
              </div>

              <button
                type="button"
                className="ccp__expand"
                onClick={() => setLightboxOpen(true)}
                aria-label="View full screen"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
                </svg>
              </button>

              {product.images.length > 1 && (
                <span className="ccp__count">
                  {activeImgIndex + 1} / {product.images.length}
                </span>
              )}
            </div>

            {product.images.length > 1 && (
              <>
                <div className="ccp__dots" aria-hidden="true">
                  {product.images.map((_, i) => (
                    <i key={i} className={`ccp__dot ${i === activeImgIndex ? 'is-on' : ''}`} />
                  ))}
                </div>

                <div className="ccp__thumbs">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`ccp__thumb ${i === activeImgIndex ? 'is-active' : ''}`}
                      onClick={() => setActiveImgIndex(i)}
                      aria-label={`Show image ${i + 1}`}
                    >
                      <img src={img} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Details / Info Column */}
          <div className="ccp__info">
            <div className="ccp__crumb">
              <Link to="/">Home</Link> / <Link to="/collections/shirts">Menswear</Link> / <span>{product.category || 'Shirts'}</span>
            </div>

            <p className="ccp__eyebrow">
              Menswear / {product.type || product.category || 'Casual Shirts'}
            </p>

            <h1 className="ccp__title">{product.title}</h1>

            <div className="ccp__pricerow">
              <div className="ccp__price">
                <span>{inr(product.price)}</span>
                {product.mrp > product.price && <s>{inr(product.mrp)}</s>}
              </div>

              <div className="ccp__rating" aria-label={`Rated ${product.rating || 4.8} out of 5`}>
                <span className="ccp__stars">★★★★★</span>
                <b>{product.rating || 4.8}</b>
                <span>({product.ratingCount || 124} reviews)</span>
              </div>
            </div>

            <p className="ccp__lead">
              {product.description || 'A refined, breathable fabric designed for crisp mornings and relaxed weekends.'}
            </p>

            {/* Feature Chips */}
            <div className="ccp__chips">
              <div className="ccp__chip">
                <small>Fabric</small>
                <b>{product.fabric || '100% Cotton'}</b>
              </div>
              <div className="ccp__chip">
                <small>Fit</small>
                <b>{product.fit || 'Slim Fit'}</b>
              </div>
              <div className="ccp__chip">
                <small>Origin</small>
                <b>India</b>
              </div>
            </div>

            {/* Variant / Size Picker */}
            <div className="ccp__opt">
              <p className="ccp__optlabel">Size</p>
              <div className="ccp__optvals" role="radiogroup" aria-label="Select Size">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    className={`ccp__val ${selectedSize === s ? 'is-selected' : ''}`}
                    onClick={() => setSelectedSize(s)}
                    aria-checked={selectedSize === s}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions: Add to Cart & Buy Now */}
            <div className="ccp__buy">
              <button
                ref={atcRef}
                type="button"
                className="ccp__atc"
                onClick={handleAddToCart}
              >
                <span>{added ? 'Added ✓' : 'Add to Cart'}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
                </svg>
              </button>

              <button
                type="button"
                className="ccp__buynow"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>

              <p className="ccp__note">
                Free shipping on orders above ₹2,499. Returns accepted within 15 days.
              </p>
            </div>

            {/* Social Sharing */}
            <div className="ccp__share">
              <span className="ccp__sharelabel">Share:</span>
              <button
                type="button"
                className="ccp__ico whatsapp"
                onClick={shareWhatsApp}
                aria-label="Share on WhatsApp"
                title="Share on WhatsApp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.6-.8-2.6-1.4-3.7-3.2-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 1.8.8 2.5.8 3.4.7.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z" />
                </svg>
              </button>
              <button
                type="button"
                className="ccp__ico instagram"
                onClick={shareInstagram}
                aria-label="Share on Instagram"
                title="Share on Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </button>
              <button
                type="button"
                className="ccp__ico"
                onClick={copyProductLink}
                aria-label="Copy link"
                title="Copy link"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
                  <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
                </svg>
              </button>
              {linkCopied && <span className="ccp__copied">Link copied</span>}
            </div>

            {/* Accordions */}
            <details className="ccp__acc" open>
              <summary>
                <span>Delivery</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <div className="ccp__acc-body">
                <p>Dispatched within 24 hours. Metro delivery in 2-3 business days. Express shipping available at checkout.</p>
              </div>
            </details>

            <details className="ccp__acc" open>
              <summary>
                <span>Details</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <div className="ccp__acc-body">
                <p>{product.description}</p>
                <p>Premium craftsmanship tailored for comfortable all-day wear. 100% genuine guaranteed quality.</p>
              </div>
            </details>

            <details className="ccp__acc">
              <summary>
                <span>Returns</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <div className="ccp__acc-body">
                <p>We have a 15-day return policy, which means you have up to 15 days after receiving your item to request a return.</p>
                <p>For more details on our Return and Refund Policy, please <Link to="/pages/return-and-refund-policy-1">click here</Link>.</p>
              </div>
            </details>

            <details className="ccp__acc">
              <summary>
                <span>Manufacturing Details</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <div className="ccp__acc-body">
                <p><strong>Country Of Origin: India</strong></p>
                <p><strong>Bafna Retail Private Ltd</strong></p>
                <p>No.7/1, 2nd Cross, Lalbagh Road, Bangalore - 560027</p>
                <p>onlinesales@bafnaclothing.com</p>
                <p>Ph : 080-22634700 , 9742377001</p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Lightbox full-screen popup */}
      {lightboxOpen && (
        <div className="ccp__lightbox" onClick={() => setLightboxOpen(false)}>
          <button
            type="button"
            className="ccp__lbclose"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={product.images[activeImgIndex] || product.images[0]}
            alt={product.title}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}

      {/* Mobile Sticky Add to Cart */}
      <div className={`ccp__sticky ${stickyVisible ? 'is-on' : ''}`}>
        <div className="ccp__sp">
          <b>{inr(product.price)}</b>
          {product.mrp > product.price && <s>{inr(product.mrp)}</s>}
        </div>
        <button type="button" onClick={handleAddToCart}>
          {added ? 'Added ✓' : 'Add to Cart'}
        </button>
      </div>

      {/* ============ PRODUCT DESCRIPTION GALLERY SECTION ============ */}
      <section className="ccd" data-section-type="product-description-gallery">
        <p className="ccd__eb">Product Description</p>
        <h2 className="ccd__h2">Product Description</h2>

        <div className="ccd__ph">
          <img
            src={product.images[1] || product.images[0]}
            alt={product.title}
            loading="lazy"
          />
          <img
            src={product.images[2] || product.images[0]}
            alt={product.title}
            loading="lazy"
          />
        </div>

        <h4 className="ccd__fl">Key details</h4>
        <div className="ccd__kd">
          <div className="ccd__k">
            <i>🌿</i>
            <span>{product.fabric || '100% Cotton'}</span>
          </div>
          <div className="ccd__k">
            <i>✂</i>
            <span>{product.fit || 'Slim Fit'}</span>
          </div>
          <div className="ccd__k">
            <i>🧺</i>
            <span>Machine Washable</span>
          </div>
          <div className="ccd__k">
            <i>📍</i>
            <span>Made in India</span>
          </div>
        </div>

        <div className="ccd__two">
          <div>
            <h3>Crisp Comfort, Made for Everyday</h3>
            <p>A refined, breathable fabric designed for crisp mornings and relaxed weekends. Each piece is crafted with high-density weave to maintain its shape wear after wear.</p>
          </div>
          <div>
            <h4>Styling</h4>
            <p>Wear it with tailored trousers and leather loafers for a polished office look, or switch to relaxed chinos and clean sneakers for weekends. Roll the cuffs once for an effortless finish.</p>
          </div>
        </div>
      </section>

      {/* ============ WATCH AND BUY SECTION (configured in product.json) ============ */}
      <WatchAndBuy />

      {/* ============ RECOMMENDATIONS ("YOU MAY ALSO LIKE") ============ */}
      <section className="ccr">
        <p className="ccr__eb">Relevant products</p>
        <h2 className="ccr__h2">You May Also Like</h2>
        <div className="ccr__grid">
          {recommendations.map(item => (
            <article key={item.handle} className="ccr__card">
              <Link to={`/products/${item.handle}`} className="ccr__img" aria-label={item.title}>
                <img src={item.images[0]} alt={item.title} loading="lazy" />
              </Link>
              <h3>
                <Link to={`/products/${item.handle}`}>{item.title}</Link>
              </h3>
              <p>{inr(item.price)}</p>
              <div className="ccr__foot">
                <span>{item.color || item.type || 'Casual Shirt'}</span>
                <button
                  type="button"
                  className="ccr__add"
                  onClick={() => add(item, item.sizes[0] || 'M', 1)}
                  aria-label={`Add ${item.title}`}
                >
                  +
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============ PRODUCT NEWSLETTER SECTION ============ */}
      <section className="ccn">
        <div className="ccn__box">
          <div className="ccn__text">
            <h2>Stay in touch</h2>
            <p>Join for new arrivals, styling notes, and early access.</p>
          </div>
          <form
            className="ccn__form"
            onSubmit={e => {
              e.preventDefault();
              setNewsletterDone(true);
            }}
          >
            {newsletterDone ? (
              <p className="ccn__ok">Thank you for subscribing!</p>
            ) : (
              <div className="ccn__row">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  aria-label="Enter your email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                />
                <button type="submit">Subscribe</button>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
