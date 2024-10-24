// Men.jsx
import React, { useState } from 'react';
import menData from '../data/menData';
import ItemCard from '../components/ItemCard';
import CategoriesList from '../components/CategoriesList';
import { getUniqueCategories } from '../utils';

const Men = () => {
    const categories = getUniqueCategories(menData);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    // Filter menData based on the selected category
    const filteredItems = menData.filter(item => item.category === selectedCategory);

    return (
        <div className="container mx-auto py-10 px-5">
          <style>
                {`
                    ::selection {
                        background: #869EFf;
                        color: white;
                    }
                `}
            </style>
            <h1 className="text-4xl font-extrabold mb-6 teko">Men's <span className='font-extralight'>Clothing</span></h1>
            <CategoriesList
                categories={categories}
                onSelectCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mx-2">
                {filteredItems.map(item => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Men;
