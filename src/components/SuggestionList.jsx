// src/components/SuggestionList.jsx
import ItemCard from './ItemCard';
import menData from '../data/menData';
import womenData from '../data/womendata';

const SuggestionList = ({ numSuggestions = 100, excludedItems = [], itemSource }) => {
    // Filter items based on the itemSource ('Men' or 'Women')
    const relevantItems = itemSource === 'Men' ? menData : womenData;

    // Filter out excluded items
    const filteredItems = relevantItems.filter(item => !excludedItems.includes(item.id));

    // Function to get random items
    const getRandomItems = (array, num) => {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    };

    // Get random suggestions
    const randomItems = getRandomItems(filteredItems, Math.min(numSuggestions, filteredItems.length));

    return (
        <div className="flex flex-col justify-center items-center container mx-auto py-10">
            <h2 className="text-3xl font-bold mb-6 text-center teko text-[#F24405]">You May Also Like</h2>
            <div className="mx-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {randomItems.map(item => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default SuggestionList;
