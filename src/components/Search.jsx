import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Import search icon
import menData from '../data/menData'; // Import men data
import womenData from '../data/womendata';


const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    // Combine men and women data
    const allItems = [...menData, ...womenData];

    // Filter function
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSuggestions([]);
        } else {
            const filteredSuggestions = allItems.filter(item =>
                item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by item name or category
            );
            setSuggestions(filteredSuggestions);
        }
    }, [searchTerm]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="relative w-full bg-transparent p-1 flex items-center">
            {/* Search Input with Icon */}
            <span className="absolute left-0 pl-2 text-gray-500">
                <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
                type="text"
                className="w-full border-b-2 bg-transparent border-black p-1 pl-8 outline-none" // Adjusted padding for icon space
                placeholder=""
                value={searchTerm}
                onChange={handleInputChange}
            />
            
            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
                <ul className="absolute top-10 left-0 right-0 bg-white border border-gray-300 rounded-lg mt-2 z-10 max-h-60 overflow-y-auto scrollbar-hide">
                    {suggestions.map(item => (
                        <li key={item.id} className="p-2 hover:bg-gray-200">
                            <Link to={`/item/${item.id}`} onClick={() => setSearchTerm('')}>
                                <span className="font-semibold">{item.itemName}</span> 
                                <span className="text-sm text-gray-500">({item.category})</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Search;
