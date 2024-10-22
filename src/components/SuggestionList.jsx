// src/components/SuggestionList.jsx
import React from 'react';
import ItemCard from './ItemCard'; // Ensure this path is correct
import menData from '../data/menData'; // Import men data
import womenData from '../data/womenData'; // Import women data

const SuggestionList = ({ numSuggestions = 10 }) => {
    // Combine both men and women data into one array
    const allItems = [...menData, ...womenData];

    // Function to get random items
    const getRandomItems = (array, num) => {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    };

    // Get random suggestions
    const randomItems = getRandomItems(allItems, numSuggestions);

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {randomItems.map(item => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default SuggestionList;
