// src/components/ItemPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import menData from '../data/menData';
import womenData from '../data/womenData';
import SuggestionList from '../components/SuggestionList';

const ItemPage = () => {
    const { id } = useParams(); // Get the item ID from the URL
    const { dispatch } = useCart();

    // Find the item in both men's and women's data
    const menItem = menData.find(item => item.id === parseInt(id));
    const womenItem = womenData.find(item => item.id === parseInt(id));

    // Select the item based on which category it was found in
    const item = menItem || womenItem;

    // Sample reviews (this should come from your data)
    const reviews = [
        { id: 1, user: 'John Doe', comment: 'Great quality!', rating: 5 },
        { id: 2, user: 'Jane Smith', comment: 'Very comfortable.', rating: 4 },
        { id: 3, user: 'Alice Johnson', comment: 'Not what I expected.', rating: 2 },
    ];

    const handleAddToCart = () => {
        dispatch({ type: 'ADD_ITEM', payload: item });
        alert(`${item.itemName} has been added to your cart!`);
    };

    if (!item) {
        return <div className="text-center mt-10">Item not found.</div>;
    }

    return (
        <div className="container mx-auto py-10">
           <div className=' lg:justify-between lg:flex'>
           <div className="flex flex-col md:justify-between md:flex-row">
                <img src={item.imageUrl} alt={item.itemName} className="w-96 h-full object-cover rounded-lg" />
                <div className="md:ml-8 mt-4 md:mt-0">
                    <h2 className="text-3xl font-bold">{item.itemName}</h2>
                    <p className="text-gray-700 mt-2">Price: ${item.price.toFixed(2)}</p>
                    <p className="text-gray-700 mt-2">Description: {item.itemDesc}</p>
                    <p className={`text-sm ${item.itemsInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.itemsInStock > 0 ? `${item.itemsInStock} in stock` : 'Out of stock'}
                    </p>
                    <button
                        className={`mt-4 w-full px-4 py-2 text-white rounded ${item.itemsInStock > 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
                        onClick={item.itemsInStock > 0 ? handleAddToCart : null}
                        disabled={item.itemsInStock === 0}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="mt-8">
                <h3 className="text-2xl font-bold">Reviews</h3>
                {reviews.length === 0 ? (
                    <p className="text-gray-700">No reviews yet.</p>
                ) : (
                    <div className="mt-4 space-y-4">
                        {reviews.map(review => (
                            <div key={review.id} className="border rounded p-4">
                                <h4 className="font-semibold">{review.user}</h4>
                                <p className="text-gray-600">{review.comment}</p>
                                <p className="text-yellow-500">Rating: {review.rating} ★</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
           </div>
           <SuggestionList />
        </div>
    );
};

export default ItemPage;
