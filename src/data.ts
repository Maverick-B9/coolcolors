export interface Product {
  handle: string;
  title: string;
  price: number;
  mrp: number;
  sizes: string[];
  images: string[];
  color?: string;
  category?: string;
  fabric?: string;
  pattern?: string;
  fit?: string;
  neck?: string;
  sleeve?: string;
  gender?: string;
  type?: string;
  tags?: string[];
  description?: string;
  rating?: number;
  ratingCount?: number;
  isNew?: boolean;
}
export interface NavItem { label: string; handle: string; children?: { label: string; handle: string }[] }
export interface Store { kind: 'store' | 'office' | 'manufacturing'; name: string; address: string; lat: number; lng: number }

export const F = 'https://coolcolors.in/cdn/shop/files/';
export const IMG = (n: string) => `/images/${n}.jpg`;
export const LOCAL = ['cc-reel-1', 'cc-reel-2', 'cc-reel-3', 'cc-reel-4', 'cc-cat-kurtas', 'cc-cat-trousers', 'cc-ed-btm', 'cc-hero'].map(IMG);

const kids = (a: string[][]) => a.map(([label, handle]) => ({ label, handle }));
export const NAV: NavItem[] = [
  { label: 'Best Selling', handle: 'best-sellers' },
  { label: 'Most Trending', handle: 'most-trending-old' },
  { label: 'Shirts', handle: 'shirts', children: kids([['Printed Picks','printed-shirt'],['Sharp Stripes','stripe-shirt'],['Modern Checks','checks-shirt'],['Classic Solids','solid-color-shirt'],['Fusion Kurtas','kurta-type-shirt-for-men'],['Denim Dose','denim-1']]) },
  { label: 'T-Shirts', handle: 't-shirt', children: kids([['Crew Neck T-Shirts','crew-neck-t-shirt'],['Polo T shirt','polo-t-shirt'],['Printed T-Shirts','printed-t-shirt'],['Striped T-Shirts','polo-striped-t-shirt']]) },
  { label: 'Bottoms', handle: 'bottoms', children: kids([['Denims','denim'],['Trousers','trousers'],['Joggers','jogger'],['Shorts','shorts']]) },
  { label: 'Blazers', handle: 'blazers' },
  { label: 'Diwali Collection', handle: 'diwali' },
];
export const MORE_FROM = 5;

export const COLLECTION_TITLES: Record<string, string> = { 'new-arrivals': 'New Arrivals', 'most-trending': 'Most Trending', bottomwear: 'Bottoms', 'featured-products': 'Featured collection' };
NAV.forEach(n => { COLLECTION_TITLES[n.handle] = n.label; n.children?.forEach(c => (COLLECTION_TITLES[c.handle] = c.label)); });

const BASE: [string, number, number, string][] = [
  ['Dk Green Solid Slim Fit Casual Shirts', 1165, 1295, 'S,M,L,XL,2XL'], ['Dusty Pink Solid Slim Fit Casual Shirts', 1165, 1295, 'S,M,L,XL,2XL'],
  ['Men Brown Slim Fit Color-Block Striped Jacquard Polo T-Shirt', 805, 895, 'S,M,L,XL'], ['Men Beige Slim Fit Stretchable Solid Polo T-Shirt', 993, 1045, 'M,L,XL,2XL'],
  ['Men Blue Narrow Fit Lycra Plain Casual Trouser', 1199, 1795, '30,32,34,36,38'], ['Men White Slim Fit Graphic Print Crew Neck Casual T-Shirt', 625, 695, 'S,M,L,XL,2XL'],
  ['Men Brown Slim Fit Printed Full Sleeve Casual Shirt', 1076, 1195, 'S,M,L,XL'], ['Black Stripes Slim Fit Cotton Casual Shirts', 598, 1195, 'S,M,L,XL,2XL'],
];

const META = [
  { color: 'Green', category: 'Shirt', fabric: 'Cotton', pattern: 'Solid', fit: 'Slim Fit', neck: 'Mandarin', sleeve: 'Full', type: 'Casual Shirts' },
  { color: 'Pink', category: 'Shirt', fabric: 'Cotton', pattern: 'Solid', fit: 'Slim Fit', neck: 'Mandarin', sleeve: 'Full', type: 'Casual Shirts' },
  { color: 'Brown', category: 'T-Shirt', fabric: 'Jacquard', pattern: 'Stripes', fit: 'Slim Fit', neck: 'Polo', sleeve: 'Half', type: 'Polo T-Shirts' },
  { color: 'Beige', category: 'T-Shirt', fabric: 'Cotton', pattern: 'Solid', fit: 'Slim Fit', neck: 'Polo', sleeve: 'Half', type: 'Polo T-Shirts' },
  { color: 'Blue', category: 'Trouser', fabric: 'Lycra', pattern: 'Solid', fit: 'Narrow Fit', neck: 'Round', sleeve: 'Full', type: 'Casual Trousers' },
  { color: 'White', category: 'T-Shirt', fabric: 'Cotton', pattern: 'Checks', fit: 'Slim Fit', neck: 'Crew Neck', sleeve: 'Half', type: 'Crew Neck T-Shirts' },
  { color: 'Brown', category: 'Shirt', fabric: 'Cotton', pattern: 'Checks', fit: 'Slim Fit', neck: 'Mandarin', sleeve: 'Full', type: 'Casual Shirts' },
  { color: 'Black', category: 'Shirt', fabric: 'Cotton', pattern: 'Stripes', fit: 'Slim Fit', neck: 'Mandarin', sleeve: 'Full', type: 'Casual Shirts' },
];

export const COLOR_HEX_MAP: Record<string, string> = {
  black: '#111111', white: '#ffffff', grey: '#9CA3AF', gray: '#9CA3AF',
  navy: '#1F2A44', blue: '#3B82F6', red: '#DC2626', maroon: '#7F1D1D',
  green: '#16A34A', olive: '#6B7A3A', khaki: '#C3B091', beige: '#E8DCC5',
  brown: '#7B4B27', tan: '#D2B48C', cream: '#F5F0E6', yellow: '#EAB308',
  orange: '#F97316', pink: '#F472B6', purple: '#8B5CF6', burgundy: '#6B1F3A',
  mustard: '#D8A518', denim: '#4A6FA5', charcoal: '#3A3A3A', teal: '#0D9488',
};

export const PRODUCTS: Product[] = Array.from({ length: 24 }, (_, i) => {
  const b = BASE[i % 8];
  const m = META[i % 8];
  const sizes = b[3].split(',');
  const tags = [
    m.color,
    m.category,
    m.fabric,
    m.pattern,
    m.fit,
    m.neck,
    m.sleeve,
    'Men',
    ...sizes,
  ];
  return {
    handle: `product-${i}`,
    title: i > 7 ? `${b[0]} #${i - 7}` : b[0],
    price: b[1],
    mrp: b[2],
    sizes,
    images: [LOCAL[i % 4], LOCAL[(i + 1) % 4], LOCAL[(i + 2) % 4]],
    color: m.color,
    category: m.category,
    fabric: m.fabric,
    pattern: m.pattern,
    fit: m.fit,
    neck: m.neck,
    sleeve: m.sleeve,
    gender: 'Men',
    type: m.type,
    tags,
    description: 'A refined, breathable fabric designed for crisp mornings and relaxed weekends. Tailored with care for a modern silhouette that transitions easily between work and leisure.',
    rating: 4.8,
    ratingCount: 124,
    isNew: i % 2 === 0,
  };
});
export const discount = (p: Product) => Math.round((1 - p.price / p.mrp) * 100);
export const inr = (n: number) => '₹ ' + n.toLocaleString('en-IN');

export const STORES: Store[] = [
  { kind: 'store', name: 'Cool Colors Hyderabad (Dilsukhnagar)', address: '16-11-740/1/H, Ideal Degree College for Women, Hyderabad - Vijayawada Hwy, Gaddiannaram, Dilsukhnagar, Hyderabad, Telangana 500060', lat: 17.3685, lng: 78.5262 },
  { kind: 'store', name: 'Cool Colors Chittoor', address: '10-185, Gandhi Rd, Bapuji Nagar, Thotapalyam, Chittoor, Andhra Pradesh 517001', lat: 13.216, lng: 79.1005 },
  { kind: 'store', name: 'Cool Colors Tirupati', address: '631/A, Mosque Rd, beside Karur Vysya Bank, RS Gardens, Tirupati, Andhra Pradesh 517501', lat: 13.6285, lng: 79.419 },
  { kind: 'store', name: 'Cool Colors Chandapura, Bengaluru', address: 'Ground Floor, Jayaram Reddy Building, No.365, Chandapura-Anekal Rd, Anekal, Karnataka 560081', lat: 12.799, lng: 77.705 },
  { kind: 'office', name: 'Bafna Clothing Company Pvt. Ltd.', address: '7, 2nd Cross Rd, K.S. Garden, Sudhama Nagar, Bengaluru, Karnataka 560027', lat: 12.9525, lng: 77.5895 },
];
export const KIND_LABEL = { store: 'Stores', office: 'Office', manufacturing: 'Manufacturing Units' } as const;

const links = (a: string[][]) => a.map(([label, to]) => ({ label, to }));
export const FOOTER = [
  { title: 'Shop', links: NAV.map(n => ({ label: n.label, to: `/collections/${n.handle}` })) },
  { title: 'Company', links: links([['About Us','/pages/our-story'],['My Account','/account'],['Contact Us','/pages/contact-us-1'],['Sitemap','/pages/sitemap'],['Stores','/pages/store-location'],['FAQ','/pages/faq']]) },
  { title: 'Support', links: links([['Terms & Conditions','/pages/terms-and-conditions-1'],['Privacy Policy','/pages/privacy-policy-1'],['Returns Policy','/pages/return-and-refund-policy-1'],['Shipping Policy','/pages/shipping-policy-1'],['Payment Terms','/pages/payment-terms-1'],['Cancellation Policy','/pages/cancellation-policy']]) },
];
export const EXTERNAL = [{ label: 'Track Order', href: 'https://www.delhivery.com/tracking' }, { label: 'Return/Exchange', href: 'https://coolcolors.in/apps/return_prime' }];
export const WHATSAPP = 'https://wa.me/919742377001';

const V = (id: string, n: number, q = '2.5Mbps') => `https://coolcolors.in/cdn/shop/videos/c/vp/${id}/${id}.HD-1080p-${q}-${n}.mp4`;
export const EDITORIAL_VIDEO = V('184f6327a1c04b16bf82947c8b54c18f', 96349435, '7.2Mbps');
export const WATCH = [
  { product: PRODUCTS[4], video: V('307b3d6200104250bfd13bc785d1f313', 96349437) },
  { product: PRODUCTS[5], video: V('ecc9b09142884586b6d9f50b94c05155', 96349438) },
  { product: PRODUCTS[6], video: V('865b19f6d3424bdea637a75d24efa1d7', 96349439) },
  { product: PRODUCTS[7], video: V('1f7d842f68eb451aa40013e87ea56a4c', 96349436) },
];
export const HERO_SLIDES = [
  { d: `${F}WhatsApp_Image_2026-10-29_at_13.01.34.jpg?width=2000`, m: `${F}WhatsApp_Image_2026-10-29_at_12.59.46.jpg?width=900`, to: '/collections/diwali' },
  { d: `${F}COOL_COLORS_BANNER_1_e9cd3c6f-4517-481d-872a-e4f9678046d9.png?width=2000`, m: `${F}COOL_COLORS_BENNER_1_b2698411-7915-4b49-9ffc-95b2c339cd0d.png?width=900`, to: '/collections/diwali' },
  { d: `${F}HERO_BANNER_3.png?width=2000`, m: `${F}HERO_BANNER_3_MOBILE.png?width=900`, to: '/collections/most-trending-old' },
];
