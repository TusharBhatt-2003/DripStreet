// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'; // Ensure you have Header imported
import Home from './pages/Home';     // Import the new Home component
import Men from './pages/Men';
import Women from './pages/Women';

const App = () => {
    return (
        <Router>
            <Header /> {/* Include the Header */}
            <Routes>
                <Route path="/" element={<Home />} /> {/* Set Home as the default route */}
                <Route path="/men" element={<Men />} />
                <Route path="/women" element={<Women />} />
            </Routes>
        </Router>
    );
};

export default App;
