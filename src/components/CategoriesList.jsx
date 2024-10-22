// src/components/CategoriesList.jsx
import React from 'react';

const CategoriesList = ({ categories, onSelectCategory, selectedCategory }) => {
    return (
        <div className="flex flex-wrap space-y-2 space-x-2 mb-6 mx-2">
            {categories.map((category) => (
                <button
                    key={category}
                    className={`px-2 py-1 rounded transition duration-300 ${
                        selectedCategory === category
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
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
