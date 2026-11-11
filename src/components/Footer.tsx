import { Link, useLocation } from 'react-router-dom';
import { WHATSAPP } from '../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { pathname } = useLocation();
  const isCollection = pathname.startsWith('/collections');

  return (
    <>
      <footer className="cc-footer">
        <div className="cc-wrap">
          <div className="cc-footer__top">
            {/* Brand Logo & Description */}
            <div className="cc-footer__brand">
              <Link to="/" className="cc-footer__logo" aria-label="COOL COLORS">
                <img
                  src="/images/brand_logo_dark_background.svg"
                  alt="COOL COLORS CASUALS"
                  width="210"
                  height="48"
                  style={{ maxWidth: '210px', height: 'auto', display: 'block' }}
                />
              </Link>
              <p>Modern silhouettes, premium fabrics, and a calm editorial aesthetic for the modern man.</p>
            </div>

            {/* Shop Column */}
            <div className="cc-footer__col">
              <h4>Shop</h4>
              <ul>
                <li><Link to="/collections/best-sellers">Best Selling</Link></li>
                <li><Link to="/collections/most-trending-old">Most Trending</Link></li>
                <li><Link to="/collections/shirts">Shirts</Link></li>
                <li><Link to="/collections/t-shirt">T-Shirts</Link></li>
                <li><Link to="/collections/bottoms">Bottoms</Link></li>
                <li><Link to="/collections/blazers">Blazers</Link></li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="cc-footer__col">
              <h4>Company</h4>
              <ul>
                <li><Link to="/pages/our-story">About Us</Link></li>
                <li><Link to="/pages/lookbook">Lookbook</Link></li>
                <li><Link to="/account">My Account</Link></li>
                <li><Link to="/pages/contact-us-1">Contact Us</Link></li>
                <li><Link to="/pages/sitemap">Sitemap</Link></li>
                <li><Link to="/pages/store-location">Stores</Link></li>
                <li><Link to="/pages/faq">FAQ</Link></li>
                <li><a href="https://www.delhivery.com/tracking" target="_blank" rel="noopener noreferrer">Track Order</a></li>
                <li><a href="https://coolcolors.in/apps/return_prime" target="_blank" rel="noopener noreferrer">Return/Exchange</a></li>
              </ul>
            </div>

            {/* Support Column */}
            <div className="cc-footer__col">
              <h4>Support</h4>
              <ul>
                <li><Link to="/pages/terms-and-conditions-1">Terms & Conditions</Link></li>
                <li><Link to="/pages/privacy-policy-1">Privacy Policy</Link></li>
                <li><Link to="/pages/return-and-refund-policy-1">Returns Policy</Link></li>
                <li><Link to="/pages/shipping-policy-1">Shipping Policy</Link></li>
                <li><Link to="/pages/payment-terms-1">Payment Terms</Link></li>
                <li><Link to="/pages/cancellation-policy">Cancellation Policy</Link></li>
              </ul>
            </div>

            {/* Follow Column */}
            <div className="cc-footer__col">
              <h4>Follow</h4>
              <ul>
                <li><a href="https://www.instagram.com/coolcolors.in/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="https://www.facebook.com/coolcolorsofficial/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                <li><a href="https://www.youtube.com/@coolcolorsmenswear" target="_blank" rel="noopener noreferrer">YouTube</a></li>
                <li><a href={WHATSAPP} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="cc-footer__bottom">
            <span>© {currentYear} COOL COLORS. All rights reserved.</span>
            <span className="cc-footer__legal">
              <Link to="/pages/privacy-policy-1">Privacy</Link>
              <Link to="/pages/terms-and-conditions-1">Terms</Link>
            </span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button - excluded on collection pages */}
      {!isCollection && (
        <a className="cc-wa" href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.700-5.400A8.400 8.400 0 1 1 21 11.500z" />
            <path d="M9 9.500c.5 2 2.500 4 5 5l1.500-1.500-2-1-1 .8c-.8-.4-1.600-1.200-2-2l.8-1-1-2z" fill="#fff" stroke="none" />
          </svg>
        </a>
      )}
    </>
  );
}
