// src/components/ItemCard.jsx
import { Link } from 'react-router-dom'; // Import Link
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion'; // Import Framer Motion
import { useState, useEffect } from 'react'; // Import useState and useEffect

const ItemCard = ({ item }) => {
    const { itemName, price, imageUrl, itemsInStock, id } = item; // Destructure id
    const { state, dispatch } = useCart(); // Access the cart state and dispatch method from the CartContext
    const [inCart, setInCart] = useState(false); // Track if the item is in the cart

    // Check if the item is already in the cart when the component mounts
    useEffect(() => {
        const foundInCart = state.items.some(cartItem => cartItem.id === id);
        setInCart(foundInCart);
    }, [state.items, id]);

    const handleAddToCart = () => {
        dispatch({ type: 'ADD_ITEM', payload: item }); // Dispatch the add item action
        setInCart(true); // Set the item as added to the cart
    };

    return (
        <motion.div
            className="bg-[#fffdf9] rounded-xl rounded-t-3xl md:m-0 shadow-md overflow-hidden"
            whileHover={{ scale: 1.05 }} // Scale up on hover
            whileTap={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }} // Add a spring transition
        >
            <Link 
                to={`/item/${id}`} 
                onClick={() => window.scrollTo(0, 0)} // Scroll to top on click
            >
                <img src={imageUrl} alt={itemName} className="w-full h-64 rounded-3xl object-cover select-none" />
                <div className="p-4">
                    <h3 className="text-sm md:text-[0.92rem] lg:text-base font-semibold mb-1">{itemName}</h3>
                    <p className="text-gray-700 mb-1">Price: ${price.toFixed(2)}</p>
                    <p className={`text-sm ${itemsInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {itemsInStock > 0 ? `${itemsInStock} in stock` : 'Out of stock'}
                    </p>
                </div>
            </Link>

            {/* Conditional Button Rendering */}
            {inCart ? (
                <Link
                    to="/cart" // Link to the cart page
                    className="w-full px-4 py-2 bg-[#F24405] text-white text-center block hover:bg-[#ffb195] hover:text-[#F24405]"
                >
                    View in Cart
                </Link>
            ) : (
                <button
                    className={`w-full px-4 py-2 text-white select-none ${itemsInStock > 0 ? 'bg-black hover:bg-zinc-700' : 'bg-gray-400 cursor-not-allowed'}`}
                    onClick={itemsInStock > 0 ? handleAddToCart : null}
                    disabled={itemsInStock === 0}
                >
                    Add to Cart
                </button>
            )}
        </motion.div>
    );
};

export default ItemCard;
