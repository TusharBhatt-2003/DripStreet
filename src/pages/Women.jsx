// Women.jsx
import React, { useState } from 'react';
import womenData from '../data/womenData';
import ItemCard from '../components/ItemCard';
import CategoriesList from '../components/CategoriesList';
import { getUniqueCategories } from '../utils';

const Women = () => {
    const categories = getUniqueCategories(womenData);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    // Filter womenData based on the selected category
    const filteredItems = womenData.filter(item => item.category === selectedCategory);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-6">Women's Clothing</h1>
            <CategoriesList
                categories={categories}
                onSelectCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Women;
