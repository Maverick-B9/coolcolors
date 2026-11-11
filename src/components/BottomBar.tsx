import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../cart';

export default function BottomBar() {
  const { pathname } = useLocation();
  const { count } = useCart();

  return (
    <div className="cc-bottombar" role="navigation" aria-label="Quick actions">
      <Link to="/search" className={`cc-bb${pathname === '/search' ? ' is-active' : ''}`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
        <span>Search</span>
      </Link>
      <Link to="/account" className={`cc-bb${pathname.startsWith('/account') ? ' is-active' : ''}`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span>Sign in</span>
      </Link>
      <Link to="/cart" className={`cc-bb${pathname === '/cart' ? ' is-active' : ''}`}>
        <span className="cc-bb__ico">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
          </svg>
          {count > 0 && <i className="cc-ibtn__count">{count}</i>}
        </span>
        <span>Cart</span>
      </Link>
    </div>
  );
}
