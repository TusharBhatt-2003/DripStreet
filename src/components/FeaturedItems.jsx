// src/components/FeaturedItems.jsx
import React from 'react';
import ItemCard from './ItemCard';
import menData from '../data/menData';
import womenData from '../data/womenData';

const FeaturedItems = () => {
    // Filter featured items from men and women data
    const featuredMen = menData.filter(item => item.featured);
    const featuredWomen = womenData.filter(item => item.featured);

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-3xl font-bold mb-6">Featured Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredMen.concat(featuredWomen).map(item => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default FeaturedItems;
