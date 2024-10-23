// src/components/CategoriesList.jsx
import React from 'react';

const CategoriesList = ({ categories, onSelectCategory, selectedCategory }) => {
    return (
        <div className="flex flex-wrap gap-1  mb-6 mx-2">
            {categories.map((category) => (
                <button
                    key={category}
                    className={`px-2 py-1 rounded transition duration-300 ${
                        selectedCategory === category
                            ? 'bg-[black] text-[#F2F0E4]'
                            : 'bg-[#F2F0E4] text-[#F24405] hover:bg-zinc-300'
                    }`}
                    onClick={() => onSelectCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoriesList;
