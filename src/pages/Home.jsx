// src/Home.jsx
import React from 'react';
import FeaturedItems from '../components/FeaturedItems';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen py-10">
            <h1 className="text-4xl font-bold mx-2 text-center mb-4">Welcome to DripStreet</h1>
            <p className="text-lg text-gray-700 mx-5 text-center mb-6">Your one-stop shop for the latest fashion trends.</p>
            <div className='h-fit w-[85vw] rounded flex justify-center items-center'>
             <img src='https://images.beta.cosmos.so/49a9f84c-ab25-4f46-a5e0-b9904c70f048?format=jpeg' className='lg:hidden' />
            </div>
            <FeaturedItems />
        </div>
    );
};

export default Home;
