// src/Home.jsx
import React from 'react';
import FeaturedItems from '../components/FeaturedItems';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen py-10">
            <h1 className="text-4xl font-bold mx-2 text-center mb-4">Welcome to DripStreet</h1>
            <p className="text-lg text-gray-700 mx-5 text-center mb-6">Your one-stop shop for the latest fashion trends.</p>
            <FeaturedItems />
        </div>
    );
};

export default Home;
