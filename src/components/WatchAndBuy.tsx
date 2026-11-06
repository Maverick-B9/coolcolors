import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../cart';
import { type Product } from '../data';
import '../styles/watch-and-buy.css';

export interface WatchVariant {
  id: string;
  label: string;
  price: string;
  priceRaw: number;
  compare: string;
  compareRaw: number;
  available: boolean;
}

export interface WatchItem {
  id: string;
  title: string;
  url: string;
  handle: string;
  price: string;
  comparePrice: string;
  image: string;
  video: string;
  poster: string;
  likes: number;
  variantId: string;
  available: boolean;
  options: WatchVariant[];
}

export const WATCH_ITEMS: WatchItem[] = [
  {
    id: 'trouser-ol3039',
    title: 'Men Blue Narrow Fit Lycra Plain Casual Trouser',
    url: '/products/men-blue-narrow-fit-lycra-plain-casual-trouser-ol3039-2',
    handle: 'product-4',
    price: '₹ 1,199',
    comparePrice: '₹ 1,795',
    image: 'https://coolcolors.in/cdn/shop/files/OL3039-2_1_8f375282-3675-40fc-9ef8-54369087cc69.jpg?v=1749151086&width=200',
    video: 'https://coolcolors.in/cdn/shop/videos/c/vp/307b3d6200104250bfd13bc785d1f313/307b3d6200104250bfd13bc785d1f313.HD-1080p-2.5Mbps-96349437.mp4?v=0',
    poster: 'https://coolcolors.in/cdn/shop/files/preview_images/307b3d6200104250bfd13bc785d1f313.thumbnail.0000000000_small.jpg?v=1791090618',
    likes: 7899,
    variantId: '46074136920299',
    available: true,
    options: [
      { id: '46074136920299', label: '30 / Blue', price: '₹ 1,199', priceRaw: 119900, compare: '₹ 1,795', compareRaw: 179500, available: true },
      { id: '46074136953067', label: '32 / Blue (Sold out)', price: '₹ 1,199', priceRaw: 119900, compare: '₹ 1,795', compareRaw: 179500, available: false },
      { id: '46074136985835', label: '34 / Blue (Sold out)', price: '₹ 1,199', priceRaw: 119900, compare: '₹ 1,795', compareRaw: 179500, available: false },
      { id: '46074137018603', label: '36 / Blue (Sold out)', price: '₹ 1,199', priceRaw: 119900, compare: '₹ 1,795', compareRaw: 179500, available: false },
      { id: '46074137051371', label: '38 / Blue (Sold out)', price: '₹ 1,199', priceRaw: 119900, compare: '₹ 1,795', compareRaw: 179500, available: false },
      { id: '46074137084139', label: '40 / Blue (Sold out)', price: '₹ 1,199', priceRaw: 119900, compare: '₹ 1,795', compareRaw: 179500, available: false },
    ],
  },
  {
    id: 'tshirt-white-graphic',
    title: 'Men White Slim Fit Graphic Print Crew Neck Casual T-Shirt',
    url: '/products/men-white-slim-fit-graphic-print-crew-neck-casual-t-shirt',
    handle: 'product-5',
    price: '₹ 625',
    comparePrice: '₹ 695',
    image: 'https://coolcolors.in/cdn/shop/files/2_2a70ff9d-90e9-482b-9c1a-da46c0c47962.jpg?v=1788113854&width=200',
    video: 'https://coolcolors.in/cdn/shop/videos/c/vp/ecc9b09142884586b6d9f50b94c05155/ecc9b09142884586b6d9f50b94c05155.HD-1080p-2.5Mbps-96349438.mp4?v=0',
    poster: 'https://coolcolors.in/cdn/shop/files/preview_images/ecc9b09142884586b6d9f50b94c05155.thumbnail.0000000000_small.jpg?v=1791090616',
    likes: 5699,
    variantId: '49317455921387',
    available: true,
    options: [
      { id: '49317455888619', label: 'S (Sold out)', price: '₹ 625', priceRaw: 62500, compare: '₹ 695', compareRaw: 69500, available: false },
      { id: '49317455921387', label: 'M', price: '₹ 625', priceRaw: 62500, compare: '₹ 695', compareRaw: 69500, available: true },
      { id: '49317455954155', label: 'L', price: '₹ 625', priceRaw: 62500, compare: '₹ 695', compareRaw: 69500, available: true },
      { id: '49317455986923', label: 'XL', price: '₹ 625', priceRaw: 62500, compare: '₹ 695', compareRaw: 69500, available: true },
      { id: '49317456019691', label: '2XL', price: '₹ 625', priceRaw: 62500, compare: '₹ 695', compareRaw: 69500, available: true },
    ],
  },
  {
    id: 'shirt-brown-printed',
    title: 'Men Brown Slim Fit Printed Full Sleeve Casual Shirt',
    url: '/products/men-blue-slim-fit-printed-full-sleeve-casual-shirt-copy',
    handle: 'product-6',
    price: '₹ 1,076',
    comparePrice: '₹ 1,195',
    image: 'https://coolcolors.in/cdn/shop/files/1_e37ed9b6-7958-4a3b-96bd-50eefe26fdf8.jpg?v=1786536391&width=200',
    video: 'https://coolcolors.in/cdn/shop/videos/c/vp/865b19f6d3424bdea637a75d24efa1d7/865b19f6d3424bdea637a75d24efa1d7.HD-1080p-2.5Mbps-96349439.mp4?v=0',
    poster: 'https://coolcolors.in/cdn/shop/files/preview_images/865b19f6d3424bdea637a75d24efa1d7.thumbnail.0000000000_small.jpg?v=1791090616',
    likes: 7899,
    variantId: '49204402159851',
    available: true,
    options: [
      { id: '49204402159851', label: 'S', price: '₹ 1,076', priceRaw: 107600, compare: '₹ 1,195', compareRaw: 119500, available: true },
      { id: '49204402192619', label: 'M', price: '₹ 1,076', priceRaw: 107600, compare: '₹ 1,195', compareRaw: 119500, available: true },
      { id: '49204402225387', label: 'L', price: '₹ 1,076', priceRaw: 107600, compare: '₹ 1,195', compareRaw: 119500, available: true },
      { id: '49204402258155', label: 'XL', price: '₹ 1,076', priceRaw: 107600, compare: '₹ 1,195', compareRaw: 119500, available: true },
      { id: '49204402290923', label: '2XL', price: '₹ 1,076', priceRaw: 107600, compare: '₹ 1,195', compareRaw: 119500, available: true },
    ],
  },
  {
    id: 'shirt-black-stripes',
    title: 'Black Stripes Slim Fit Cotton Casual Shirts',
    url: '/products/white-stripes-slim-fit-cotton-casual-shirts-copy-1',
    handle: 'product-7',
    price: '₹ 598',
    comparePrice: '₹ 1,195',
    image: 'https://coolcolors.in/cdn/shop/files/0A0A4514.jpg?v=1775728713&width=200',
    video: 'https://coolcolors.in/cdn/shop/videos/c/vp/1f7d842f68eb451aa40013e87ea56a4c/1f7d842f68eb451aa40013e87ea56a4c.HD-1080p-2.5Mbps-96349436.mp4?v=0',
    poster: 'https://coolcolors.in/cdn/shop/files/preview_images/1f7d842f68eb451aa40013e87ea56a4c.thumbnail.0000000000_small.jpg?v=1791090614',
    likes: 9878,
    variantId: '48059862843627',
    available: true,
    options: [
      { id: '48059862810859', label: 'S (Sold out)', price: '₹ 598', priceRaw: 59800, compare: '₹ 1,195', compareRaw: 119500, available: false },
      { id: '48059862843627', label: 'M', price: '₹ 598', priceRaw: 59800, compare: '₹ 1,195', compareRaw: 119500, available: true },
      { id: '48059862876395', label: 'L', price: '₹ 598', priceRaw: 59800, compare: '₹ 1,195', compareRaw: 119500, available: true },
      { id: '48059862909163', label: '2XL', price: '₹ 598', priceRaw: 59800, compare: '₹ 1,195', compareRaw: 119500, available: true },
      { id: '48059862941931', label: 'XL', price: '₹ 598', priceRaw: 59800, compare: '₹ 1,195', compareRaw: 119500, available: true },
    ],
  },
];

function fmtCount(n: number): string {
  if (n >= 999950) return (Math.round(n / 100000) / 10).toString().replace(/\.0$/, '') + 'M';
  if (n >= 1000) return (Math.round(n / 100) / 10).toString().replace(/\.0$/, '') + 'K';
  return String(n);
}

function parseNum(priceStr: string): number {
  const n = parseInt(priceStr.replace(/[^\d]/g, ''), 10);
  return isNaN(n) ? 0 : n;
}

export default function WatchAndBuy() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const movedRef = useRef(false);
  const modalOpenRef = useRef(false);
  const pauseAutoScrollRef = useRef<((delay?: number) => void) | null>(null);

  modalOpenRef.current = modalIndex !== null;

  // Infinite loop: 2 sets of items so the second set acts as clones
  const displayItems = [...WATCH_ITEMS, ...WATCH_ITEMS];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const SPEED = 40; // px/sec, exactly matches coolcolors.in
    let pos = slider.scrollLeft;
    let paused = false;
    let last: number | null = null;
    let resumeTimer: ReturnType<typeof setTimeout> | null = null;
    let rafId: number;

    const pause = () => {
      paused = true;
      if (resumeTimer) clearTimeout(resumeTimer);
    };

    const resume = (delay = 0) => {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        paused = false;
        pos = slider.scrollLeft;
        last = null;
      }, delay);
    };

    pauseAutoScrollRef.current = (delay = 2500) => {
      pause();
      resume(delay);
    };

    const halfWidth = () => {
      const clone = slider.querySelector('.social-item[data-clone="1"]') as HTMLElement | null;
      const first = slider.querySelector('.social-item') as HTMLElement | null;
      return clone && first ? clone.offsetLeft - first.offsetLeft : 0;
    };

    const tick = (ts: number) => {
      if (last === null) last = ts;
      const el = Math.min(ts - last, 100);
      last = ts;
      const half = halfWidth();

      if (half > 0 && !paused && !isDownRef.current && !modalOpenRef.current) {
        pos += SPEED * (el / 1000);
        while (pos >= half) pos -= half;
        slider.scrollLeft = pos;
      } else {
        pos = slider.scrollLeft;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    // Hover, touch, and wheel pause/resume
    const onMouseEnter = () => pause();
    const onMouseLeave = () => {
      isDownRef.current = false;
      resume();
    };
    const onTouchStart = () => pause();
    const onTouchEnd = () => resume(1200);
    const onTouchCancel = () => resume(1200);
    const onWheel = () => {
      pause();
      resume(1500);
    };

    // Mouse grab / drag
    const onMouseDown = (e: MouseEvent) => {
      isDownRef.current = true;
      movedRef.current = false;
      startXRef.current = e.pageX - slider.offsetLeft;
      scrollLeftStartRef.current = slider.scrollLeft;
    };

    const onWindowMouseUp = () => {
      isDownRef.current = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDownRef.current) return;
      const x = e.pageX - slider.offsetLeft;
      if (Math.abs(x - startXRef.current) > 4) {
        movedRef.current = true;
        e.preventDefault();
        slider.scrollLeft = scrollLeftStartRef.current - (x - startXRef.current) * 1.5;
      }
    };

    slider.addEventListener('mouseenter', onMouseEnter);
    slider.addEventListener('mouseleave', onMouseLeave);
    slider.addEventListener('touchstart', onTouchStart, { passive: true });
    slider.addEventListener('touchend', onTouchEnd);
    slider.addEventListener('touchcancel', onTouchCancel);
    slider.addEventListener('wheel', onWheel, { passive: true });
    slider.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onWindowMouseUp);
    slider.addEventListener('mousemove', onMouseMove);

    // Video preview autoplay in viewport
    let io: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            const v = en.target.querySelector('.preview-video') as HTMLVideoElement | null;
            if (!v) return;
            if (en.isIntersecting) {
              v.play().catch(() => {});
            } else {
              v.pause();
            }
          });
        },
        { root: slider, threshold: 0.4 }
      );
      slider.querySelectorAll('.social-media').forEach((c) => io!.observe(c));
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (resumeTimer) clearTimeout(resumeTimer);
      slider.removeEventListener('mouseenter', onMouseEnter);
      slider.removeEventListener('mouseleave', onMouseLeave);
      slider.removeEventListener('touchstart', onTouchStart);
      slider.removeEventListener('touchend', onTouchEnd);
      slider.removeEventListener('touchcancel', onTouchCancel);
      slider.removeEventListener('wheel', onWheel);
      slider.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onWindowMouseUp);
      slider.removeEventListener('mousemove', onMouseMove);
      if (io) io.disconnect();
    };
  }, []);

  const handleArrowScroll = (dir: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    if (pauseAutoScrollRef.current) {
      pauseAutoScrollRef.current(2500);
    }

    const all = slider.querySelectorAll('.social-item') as NodeListOf<HTMLElement>;
    const first = all[0];
    const second = all[1];
    const step = first && second ? second.offsetLeft - first.offsetLeft : (first ? first.offsetWidth + 16 : 300);

    const clone = slider.querySelector('.social-item[data-clone="1"]') as HTMLElement | null;
    const half = clone && first ? clone.offsetLeft - first.offsetLeft : 0;

    if (half > 0) {
      if (dir < 0 && slider.scrollLeft < step) slider.scrollLeft += half;
      if (dir > 0 && slider.scrollLeft + step > half * 2 - slider.clientWidth) slider.scrollLeft -= half;
    }
    slider.scrollBy({ left: step * dir, behavior: 'smooth' });
  };

  const handleCardMediaClick = (idx: number) => {
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    setModalIndex(idx % WATCH_ITEMS.length);
  };

  return (
    <section className="social-section">
      <div className="social-inner">
        <div className="social-header">
          <h2 className="social-title">Watch and Buy</h2>
        </div>
        <div className="social-track">
          <button
            type="button"
            className="social-nav prev"
            aria-label="Scroll left"
            data-social-scroll="-1"
            onClick={() => handleArrowScroll(-1)}
          >
            &#8249;
          </button>
          <button
            type="button"
            className="social-nav next"
            aria-label="Scroll right"
            data-social-scroll="1"
            onClick={() => handleArrowScroll(1)}
          >
            &#8250;
          </button>

          <div className="social-grid" ref={sliderRef}>
            {displayItems.map((item, index) => {
              const isClone = index >= WATCH_ITEMS.length;
              return (
                <WatchCard
                  key={`${item.id}-${index}`}
                  item={item}
                  isClone={isClone}
                  onOpenModal={() => handleCardMediaClick(index)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {modalIndex !== null && (
        <ReelModal
          initialIndex={modalIndex}
          onClose={() => setModalIndex(null)}
        />
      )}
    </section>
  );
}

function WatchCard({
  item,
  isClone,
  onOpenModal,
}: {
  item: WatchItem;
  isClone: boolean;
  onOpenModal: () => void;
}) {
  const { add } = useCart();
  const [variantsOpen, setVariantsOpen] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState(
    () => item.options.find((o) => o.available)?.id || item.options[0]?.id || item.variantId
  );
  const [added, setAdded] = useState(false);

  const currentOption = item.options.find((o) => o.id === selectedVariantId) || item.options[0];
  const isAvailable = currentOption?.available ?? item.available;

  const currentPrice = currentOption?.price || item.price;
  const currentCompare = currentOption?.compare || item.comparePrice;

  // Calculate discount percentage
  const pRaw = currentOption ? currentOption.priceRaw : parseNum(item.price);
  const cRaw = currentOption ? currentOption.compareRaw : parseNum(item.comparePrice);
  const hasDiscount = cRaw > pRaw;
  const discountText = hasDiscount ? `${Math.round(((cRaw - pRaw) * 100) / cRaw)}% OFF` : '';

  const handleAddToCart = () => {
    if (!isAvailable) return;
    const product: Product = {
      handle: item.handle,
      title: item.title,
      price: parseNum(currentPrice),
      mrp: parseNum(currentCompare) || parseNum(currentPrice),
      sizes: item.options.map((o) => o.label.split('/')[0].trim().replace(/\(.*\)/, '').trim()),
      images: [item.image],
    };
    const size = currentOption ? currentOption.label.split('/')[0].trim().replace(/\(.*\)/, '').trim() : 'Free Size';
    add(product, size, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="social-item"
      data-likes={item.likes}
      data-clone={isClone ? '1' : undefined}
      aria-hidden={isClone ? 'true' : undefined}
    >
      <article className="social-card">
        <div className="social-media" onClick={onOpenModal}>
          <video
            playsInline
            loop
            muted
            preload="metadata"
            className="social-video preview-video"
            poster={item.poster}
          >
            <source src={item.video} type="video/mp4" />
          </video>
          <div className="play-btn" />
          <div className="social-pill">
            <img src={item.image} alt="" loading="lazy" width="38" height="38" />
            <div className="social-pill-text">
              <p className="social-pill-title">{item.title}</p>
              <span className="social-pill-price">{item.price}</span>
            </div>
          </div>
        </div>

        <div
          className="social-info social-product-link"
          data-title={item.title}
          data-url={item.url}
          data-image={item.image}
          data-price={currentPrice}
          data-compare-price={hasDiscount ? currentCompare : ''}
          data-variant-id={selectedVariantId}
          data-available={isAvailable ? 'true' : 'false'}
        >
          <Link to={`/products/${item.handle}`} className="social-product-title">
            {item.title}
          </Link>

          <div className="social-product-price" data-card-price>
            <span className="social-price" data-p>
              {currentPrice}
            </span>
            {hasDiscount && (
              <span className="social-compare-price" data-c>
                {currentCompare}
              </span>
            )}
            {hasDiscount && (
              <span className="social-discount-badge" data-d>
                {discountText}
              </span>
            )}
          </div>

          <div className="social-acts">
            <button
              type="button"
              className="social-add-btn"
              data-card-add
              data-variant-id={selectedVariantId}
              disabled={!isAvailable}
              onClick={handleAddToCart}
            >
              {added ? 'Added ✓' : isAvailable ? 'Add to Cart' : 'Sold out'}
            </button>
            {item.options.length > 1 && (
              <button
                type="button"
                className="social-chev"
                data-card-chev
                aria-label="Choose option"
                aria-expanded={variantsOpen}
                onClick={() => setVariantsOpen((v) => !v)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            )}
          </div>

          {item.options.length > 1 && (
            <div className={`social-variants${variantsOpen ? ' open' : ''}`} data-card-variants>
              <select
                aria-label="Option"
                data-card-select
                value={selectedVariantId}
                onChange={(e) => setSelectedVariantId(e.target.value)}
              >
                {item.options.map((opt) => (
                  <option
                    key={opt.id}
                    value={opt.id}
                    data-price={opt.price}
                    data-price-raw={opt.priceRaw}
                    data-compare={opt.compare}
                    data-compare-raw={opt.compareRaw}
                    data-available={opt.available ? 'true' : 'false'}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

function ReelModal({
  initialIndex,
  onClose,
}: {
  initialIndex: number;
  onClose: () => void;
}) {
  const { add } = useCart();
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isMuted, setIsMuted] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({});
  const [likesMap, setLikesMap] = useState<Record<number, number>>(() =>
    WATCH_ITEMS.reduce((acc, item, i) => ({ ...acc, [i]: item.likes }), {})
  );
  const [burstIndex, setBurstIndex] = useState<number | null>(null);
  const [hinted, setHinted] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [addedMap, setAddedMap] = useState<Record<number, boolean>>({});

  const activeVideoRef = useRef<HTMLVideoElement>(null);
  const lastTapRef = useRef<number>(0);
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isScrollingRef = useRef(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastMsg(null), 1800);
  };

  // Center the active slide in track
  const goTo = useCallback((idx: number, smooth = true) => {
    const track = trackRef.current;
    if (!track) return;
    const slides = track.querySelectorAll('.sm-slide') as NodeListOf<HTMLElement>;
    const s = slides[idx];
    if (!s) return;
    const left = s.offsetLeft - (track.clientWidth - s.offsetWidth) / 2;
    if (smooth && track.scrollTo) {
      isScrollingRef.current = true;
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 450);
      track.scrollTo({ left, behavior: 'smooth' });
    } else {
      track.scrollLeft = left;
    }
  }, []);

  const step = useCallback((dir: number) => {
    setCurrentIndex((prev) => {
      const next = (prev + dir + WATCH_ITEMS.length) % WATCH_ITEMS.length;
      goTo(next, true);
      return next;
    });
  }, [goTo]);

  // Initial scroll without animation
  useEffect(() => {
    goTo(initialIndex, false);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [initialIndex, goTo]);

  // Keyboard navigation & Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (sheetOpen) setSheetOpen(false);
        else onClose();
      }
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, sheetOpen, step]);

  // Detect which slide is centered when user swipes the track
  const handleTrackScroll = () => {
    if (isScrollingRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const slides = track.querySelectorAll('.sm-slide') as NodeListOf<HTMLElement>;
    if (!slides.length) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let minDiff = 1e9;
    slides.forEach((s, k) => {
      const diff = Math.abs(s.offsetLeft + s.offsetWidth / 2 - center);
      if (diff < minDiff) {
        minDiff = diff;
        best = k;
      }
    });
    if (best !== currentIndex) {
      setCurrentIndex(best);
      setHinted(true);
      setSheetOpen(false);
    }
  };

  const toggleLike = (idx: number) => {
    setLikedMap((prev) => {
      const nextLiked = !prev[idx];
      setLikesMap((lprev) => ({
        ...lprev,
        [idx]: (lprev[idx] || WATCH_ITEMS[idx].likes) + (nextLiked ? 1 : -1),
      }));
      return { ...prev, [idx]: nextLiked };
    });
  };

  const triggerBurst = (idx: number) => {
    setBurstIndex(idx);
    setTimeout(() => setBurstIndex(null), 850);
  };

  // Video tap handler: single tap = play/pause, double tap = like + burst
  const handleVideoTap = (idx: number) => {
    const now = Date.now();
    if (now - lastTapRef.current < 280) {
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
      lastTapRef.current = 0;
      if (!likedMap[idx]) toggleLike(idx);
      triggerBurst(idx);
      return;
    }
    lastTapRef.current = now;
    tapTimerRef.current = setTimeout(() => {
      const v = activeVideoRef.current;
      if (v) {
        if (v.paused) v.play().catch(() => {});
        else v.pause();
      }
    }, 280);
  };

  const handleAddToCart = (idx: number) => {
    const item = WATCH_ITEMS[idx];
    const availableOpt = item.options.find((o) => o.available) || item.options[0];
    const product: Product = {
      handle: item.handle,
      title: item.title,
      price: parseNum(availableOpt?.price || item.price),
      mrp: parseNum(availableOpt?.compare || item.comparePrice) || parseNum(item.price),
      sizes: item.options.map((o) => o.label.split('/')[0].trim().replace(/\(.*\)/, '').trim()),
      images: [item.image],
    };
    const size = availableOpt ? availableOpt.label.split('/')[0].trim().replace(/\(.*\)/, '').trim() : 'Free Size';
    add(product, size, 1);
    setAddedMap((prev) => ({ ...prev, [idx]: true }));
    setTimeout(() => setAddedMap((prev) => ({ ...prev, [idx]: false })), 1500);
  };

  const currentItem = WATCH_ITEMS[currentIndex];
  const isLiked = Boolean(likedMap[currentIndex]);
  const currentLikes = likesMap[currentIndex] ?? currentItem.likes;

  const currentShareUrl = typeof window !== 'undefined' ? `${window.location.origin}${currentItem.url}` : currentItem.url;
  const currentShareTitle = currentItem.title;

  const handleShareClick = () => {
    if (navigator.share && window.matchMedia && window.matchMedia('(pointer:coarse)').matches) {
      navigator.share({ title: currentShareTitle, url: currentShareUrl }).catch(() => {
        setSheetOpen(true);
      });
    } else {
      setSheetOpen(true);
    }
  };

  const copyLink = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(currentShareUrl).then(() => {
        showToast('Link copied');
        setSheetOpen(false);
      });
    } else {
      const t = document.createElement('textarea');
      t.value = currentShareUrl;
      t.style.position = 'fixed';
      t.style.opacity = '0';
      document.body.appendChild(t);
      t.select();
      try {
        document.execCommand('copy');
        showToast('Link copied');
      } catch {
        showToast('Could not copy link');
      }
      document.body.removeChild(t);
      setSheetOpen(false);
    }
  };

  return (
    <div
      className={`social-modal open${isMuted ? ' is-muted' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Reels"
      onClick={(e) => {
        if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('sm-top')) {
          onClose();
        }
      }}
    >
      <div className="sm-top">
        <div className="sm-bars" data-sm-bars>
          {WATCH_ITEMS.map((_, i) => (
            <i key={i} className={i <= currentIndex ? 'on' : ''} />
          ))}
        </div>
        <button
          type="button"
          className="social-modal-close"
          aria-label="Close"
          data-social-close
          onClick={onClose}
        >
          &times;
        </button>
      </div>

      <button
        type="button"
        className="social-modal-nav prev"
        aria-label="Previous reel"
        data-social-prev
        onClick={() => step(-1)}
      >
        &#8249;
      </button>
      <button
        type="button"
        className="social-modal-nav next"
        aria-label="Next reel"
        data-social-next
        onClick={() => step(1)}
      >
        &#8250;
      </button>

      <div className="sm-track" data-sm-track ref={trackRef} onScroll={handleTrackScroll}>
        {WATCH_ITEMS.map((it, i) => {
          const isActive = i === currentIndex;
          const liked = Boolean(likedMap[i]);
          const likesCount = likesMap[i] ?? it.likes;
          const isAdded = Boolean(addedMap[i]);
          const isBursting = burstIndex === i;

          return (
            <article
              key={it.id}
              className={`sm-slide${isActive ? ' active' : ''}`}
              data-i={i}
              onClick={() => {
                if (!isActive) goTo(i, true);
              }}
            >
              <div className="sm-poster">
                <img src={it.poster} alt="" draggable={false} />
              </div>

              <div className="sm-player">
                {isActive && (
                  <video
                    ref={activeVideoRef}
                    src={it.video}
                    poster={it.poster}
                    playsInline
                    loop
                    autoPlay
                    muted={isMuted}
                    onClick={() => handleVideoTap(i)}
                  />
                )}
              </div>

              <div className="sm-shade" />

              <div className="sm-who">
                <span className="sm-av">
                  <b>C</b>
                </span>
                Cool Colors
              </div>

              <button
                type="button"
                className="sm-mute"
                aria-label="Toggle sound"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted((m) => !m);
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path className="w" d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
                  <path className="o" d="M23 9l-6 6M17 9l6 6" />
                </svg>
              </button>

              <svg className={`sm-burst${isBursting ? ' go' : ''}`} viewBox="0 0 24 24">
                <path
                  fill="#ff3040"
                  d="M12 21s-7.5-4.6-9.6-9.3C.9 8.2 2.6 4.5 6.2 4.5c2.1 0 3.8 1.2 5.8 3.4 2-2.2 3.7-3.4 5.8-3.4 3.6 0 5.3 3.7 3.8 7.2C19.5 16.4 12 21 12 21z"
                />
              </svg>

              <div className="sm-rail">
                <button
                  type="button"
                  className={`sm-act sm-like${liked ? ' liked' : ''}`}
                  aria-label="Like"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(i);
                  }}
                >
                  <svg className="sm-heart" viewBox="0 0 24 24">
                    <path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.2 2.6 4.5 6.2 4.5c2.1 0 3.8 1.2 5.8 3.4 2-2.2 3.7-3.4 5.8-3.4 3.6 0 5.3 3.7 3.8 7.2C19.5 16.4 12 21 12 21z" />
                  </svg>
                  <span className="sm-cnt">{fmtCount(likesCount)}</span>
                </button>

                <button
                  type="button"
                  className="sm-act sm-share"
                  aria-label="Share"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShareClick();
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  >
                    <path d="M22 3 9.5 10.5" />
                    <path d="M22 3l-7 18-5.5-10.5L3 8z" />
                  </svg>
                  <span>Share</span>
                </button>
              </div>

              <div className="sm-prod">
                <div className="sm-prow">
                  <Link to={`/products/${it.handle}`} onClick={(e) => e.stopPropagation()}>
                    <img src={it.image} alt="" />
                  </Link>
                  <div className="sm-pinfo">
                    <Link
                      to={`/products/${it.handle}`}
                      className="sm-ptitle"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {it.title}
                    </Link>
                    <div className="sm-pprice">
                      <span className="social-price">{it.price}</span>
                      <span className="social-compare-price">{it.comparePrice}</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="sm-add"
                  data-variant-id={it.variantId}
                  disabled={!it.available}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(i);
                  }}
                >
                  {isAdded ? 'Added ✓' : it.available ? 'Add to Cart' : 'Sold out'}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className={`sm-hint${hinted ? ' hide' : ''}`} data-sm-hint>
        Swipe left or right &middot; double-tap to like
      </div>

      <div
        className={`sm-scrim${sheetOpen ? ' open' : ''}`}
        data-sm-scrim
        onClick={() => setSheetOpen(false)}
      />

      <div
        className={`sm-sheet${sheetOpen ? ' open' : ''}`}
        data-sm-sheet
        role="dialog"
        aria-label="Share"
      >
        <div className="sm-grab" />
        <h3 className="sm-sheet-title">Share</h3>
        <div className="sm-apps">
          <a
            className="sm-app"
            data-share="whatsapp"
            href={`https://wa.me/?text=${encodeURIComponent(`${currentShareTitle} ${currentShareUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span style={{ background: '#25d366' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l1.9-5.4A8.4 8.4 0 1 1 21 11.5z" />
              </svg>
            </span>
            WhatsApp
          </a>
          <a
            className="sm-app"
            data-share="facebook"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentShareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span style={{ background: '#1877f2' }}>f</span>
            Facebook
          </a>
          <a
            className="sm-app"
            data-share="x"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(currentShareTitle)}&url=${encodeURIComponent(currentShareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span style={{ background: '#000', border: '1px solid #3a3a3d' }}>X</span>
            X
          </a>
          <button type="button" className="sm-app" data-share="copy" onClick={copyLink}>
            <span style={{ background: '#27272a' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.1 0l3-3a5 5 0 0 0-7.1-7.1l-1.7 1.7" />
                <path d="M14 11a5 5 0 0 0-7.1 0l-3 3A5 5 0 0 0 11 21.1l1.7-1.7" />
              </svg>
            </span>
            Copy link
          </button>
        </div>
      </div>

      <div className={`sm-toast${toastMsg ? ' show' : ''}`} data-sm-toast>
        {toastMsg}
      </div>
    </div>
  );
}
