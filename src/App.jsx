// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import Cart from './pages/Cart'; // Import the Cart component
import Header from './components/Header';
import { CartProvider } from './context/CartContext';

const App = () => {
    return (
        <CartProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/men" element={<Men />} />
                    <Route path="/women" element={<Women />} />
                    <Route path="/cart" element={<Cart />} /> {/* Cart route */}
                </Routes>
            </Router>
        </CartProvider>
    );
};

export default App;
