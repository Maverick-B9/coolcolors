import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV, MORE_FROM, type NavItem } from '../data';
import { useCart } from '../cart';

const Chev = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M6 9l6 6 6-6" /></svg>;

function NavEntry({ n }: { n: NavItem }) {
  if (!n.children) return <Link to={`/collections/${n.handle}`}>{n.label}</Link>;
  return (
    <div className="cc-dd">
      <Link to={`/collections/${n.handle}`}>{n.label}<Chev /></Link>
      <div className="cc-dd__m">{n.children.map(c => <Link key={c.handle} to={`/collections/${c.handle}`}>{c.label}</Link>)}</div>
    </div>
  );
}

export default function Header() {
  const { pathname, search } = useLocation();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const story = pathname === '/pages/our-story' || (pathname === '/pages/about-us' && !search.includes('lookbook'));
  const overlay = pathname === '/' || story;
  useEffect(() => { const f = () => setScrolled(window.scrollY > 24); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, []);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  const more: NavItem = { label: 'More', handle: '', children: NAV.slice(MORE_FROM).map(n => ({ label: n.label, handle: n.handle })) };
  return (
    <div id="hg" className={overlay ? 'home' : ''}>
      <div className={`cch${!overlay || scrolled || open ? ' solid' : ''}${story ? ' lt' : ''}`}>
        <div className="cch__bar">
          <button className="cch__burger" aria-label="Menu" onClick={() => setOpen(o => !o)}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
          <Link className="cch__logo" to="/"><span className="cch__mark" /><span className="cch__brand"><strong>COOL COLORS</strong><small>CASUALS</small></span></Link>
          <nav className={`cch__nav${open ? ' open' : ''}`}>
            {NAV.slice(0, MORE_FROM).map(n => <NavEntry key={n.handle} n={n} />)}
            <div className="cc-dd"><a href="#more" onClick={e => e.preventDefault()}>More<Chev /></a><div className="cc-dd__m">{more.children!.map(c => <Link key={c.handle} to={`/collections/${c.handle}`}>{c.label}</Link>)}</div></div>
          </nav>
          <div className="cch__icons">
            <Link className="ibtn" to="/search" aria-label="Search"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg></Link>
            <Link className="ibtn" to="/account" aria-label="Account"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6z" /></svg></Link>
            <Link className="ibtn" to="/cart" aria-label="Cart"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 8h14l-1 12H6z" /><path d="M9 8V6a3 3 0 016 0v2" /></svg><span className="cnt">{count}</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
