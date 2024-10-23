import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Favicon = ({ isItemFromMen, isItemFromWomen }) => {
    const location = useLocation();

    const updateFavicon = () => {
        const favicon = document.querySelector("link[rel='icon']");

        if (isItemFromWomen) {
            favicon.href = './women.svg';
        } else if (isItemFromMen) {
            favicon.href = './men.svg';
        } else if (location.pathname.includes('/women')) {
            favicon.href = './women.svg';
        } else if (location.pathname.includes('/men')) {
            favicon.href = './men.svg';
        } else {
            favicon.href = './home.svg'; // Default favicon for the home page
        }
    };

    useEffect(() => {
        updateFavicon();
    }, [location, isItemFromMen, isItemFromWomen]); // Update favicon whenever the route or item changes

    return null; // This component doesn't render anything
};

export default Favicon;
