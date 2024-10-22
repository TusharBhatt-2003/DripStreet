// src/Home.jsx
import React from 'react';
import FeaturedItems from '../components/FeaturedItems';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen py-10">
            <h1 className="text-4xl font-bold mb-4">Welcome to DripStreet</h1>
            <p className="text-lg text-gray-700 mb-6">Your one-stop shop for the latest fashion trends.</p>
            <div className="flex space-x-4 mb-6">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    <a href="/men">Shop Men</a>
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                    <a href="/women">Shop Women</a>
                </button>
            </div>
            <FeaturedItems />
        </div>
    );
};

export default Home;
