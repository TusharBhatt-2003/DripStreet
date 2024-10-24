import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './context/CartContext'; // Import the CartProvider
import Footer from './components/Footer.jsx';
import { DialogProvider } from './context/DialogContext.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <DialogProvider>
     <CartProvider> {/* Wrap App with CartProvider */}
        <App />
     </CartProvider>
  </DialogProvider>
);
