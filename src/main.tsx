import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './cart';
import { ErrorBoundary } from './components/ErrorBoundary';
import './styles/global.css';

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <CartProvider>
            <App />
          </CartProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
} else {
  console.error('Fatal error: Root element "#root" not found in DOM.');
}
