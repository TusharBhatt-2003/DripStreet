// src/components/FeaturedItems.jsx
import React from 'react';
import ItemCard from './ItemCard';
import menData from '../data/menData';
import womenData from '../data/womendata';

const FeaturedItems = () => {
    // Filter featured items from men and women data
    const featuredMen = menData.filter(item => item.featured);
    const featuredWomen = womenData.filter(item => item.featured);

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-3xl text-center md:ml-7 md:text-start font-bold mb-6 text-[#F24405]">Featured Items</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-5 gap-6">
                {featuredMen.concat(featuredWomen).map(item => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default FeaturedItems;
