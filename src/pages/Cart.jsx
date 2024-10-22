// src/Cart.jsx
import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { state, dispatch } = useCart();
    const { items } = state;

    const totalCost = items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    const handleRemoveItem = (item) => {
        dispatch({ type: 'REMOVE_ITEM', payload: item });
    };

    const handleRemoveOne = (item) => {
        dispatch({ type: 'REMOVE_ONE', payload: item });
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-6">Your Cart</h1>
            {items.length === 0 ? (
                <p className="text-lg text-gray-700">Your cart is empty.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map(item => (
                            <div key={item.id} className="bg-white rounded shadow-md p-4">
                                <img src={item.imageUrl} alt={item.itemName} className="h-48 object-cover mb-4" />
                                <h3 className="text-lg font-semibold">{item.itemName}</h3>
                                <p className="text-gray-700">Price: ${item.price.toFixed(2)}</p>
                                <p className="text-gray-700">Quantity: {item.quantity}</p>
                                <button
                                    className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                                    onClick={() => handleRemoveOne(item)}
                                >
                                    Remove One
                                </button>
                                <button
                                    className="mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                    onClick={() => handleRemoveItem(item)}
                                >
                                    Remove All
                                </button>
                            </div>
                        ))}
                    </div>
                    <h2 className="text-2xl font-bold mt-6">Total Cost: ${totalCost}</h2>
                </>
            )}
        </div>
    );
};

export default Cart;
