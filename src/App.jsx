// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Men from './pages/Men'; // Assuming you have these components
import Women from './pages/Women';
import Cart from './pages/Cart';
import ItemPage from './pages/ItemPage'; // Import your new ItemPage component

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/men" element={<Men />} />
                <Route path="/women" element={<Women />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/item/:id" element={<ItemPage />} /> {/* Add this route */}
            </Routes>
        </Router>
    );
};

export default App;
