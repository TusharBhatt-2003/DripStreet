// src/components/ItemCard.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const ItemCard = ({ item }) => {
    const { itemName, price, imageUrl, itemsInStock, id } = item; // Ensure id is available
    const { dispatch } = useCart(); // Access the dispatch method from the CartContext

    const handleAddToCart = () => {
        dispatch({ type: 'ADD_ITEM', payload: item }); // Dispatch the add item action
        // alert(`${itemName} has been added to your cart!`); // Placeholder alert for user feedback
    };

    return (
        <Link to={`/item/${id}`}> {/* Add Link component with the item ID in the path */}
            <div className="bg-white rounded-3xl md:m-0 shadow-md overflow-hidden cursor-pointer"> {/* Add cursor pointer */}
                <img src={imageUrl} alt={itemName} className="w-full h-52 rounded-3xl object-cover" />
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{itemName}</h3>
                    <p className="text-gray-700 mb-2">Price: ${price.toFixed(2)}</p>
                    <p className={`text-sm ${itemsInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {itemsInStock > 0 ? `${itemsInStock} in stock` : 'Out of stock'}
                    </p>
                    <button
                        className={`mt-4 w-full px-4 py-2 text-white rounded ${itemsInStock > 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
                        onClick={itemsInStock > 0 ? handleAddToCart : null}
                        disabled={itemsInStock === 0}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ItemCard;
