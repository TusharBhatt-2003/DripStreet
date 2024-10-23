import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './context/CartContext'; // Import the CartProvider
import Footer from './components/Footer.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <CartProvider> {/* Wrap App with CartProvider */}
    <App />
    <Footer />
  </CartProvider>
);
