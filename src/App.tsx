import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomBar from './components/BottomBar';
import Home from './pages/Home';
import Collection from './pages/Collection';
import ProductPage from './pages/Product';
import Cart from './pages/Cart';
import Search from './pages/Search';
import Stores from './pages/Stores';
import About from './pages/About';
import Lookbook from './pages/Lookbook';
import Page from './pages/Page';
import Account from './pages/Account';
import NotFound from './pages/NotFound';

function AboutUs() { const [q] = useSearchParams(); return q.get('view') === 'lookbook' ? <Lookbook /> : <About />; }
function ScrollTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollTop /><Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Navigate to="/collections/best-sellers" replace />} />
          <Route path="/collections/:handle" element={<Collection />} />
          <Route path="/products/:handle" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/pages/store-location" element={<Stores />} />
          <Route path="/pages/our-story" element={<About />} />
          <Route path="/pages/about-us" element={<AboutUs />} />
          <Route path="/pages/lookbook" element={<Lookbook />} />
          <Route path="/pages/:slug" element={<Page />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BottomBar />
    </>
  );
}
