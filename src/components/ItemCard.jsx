// src/components/ItemCard.jsx
import { Link } from 'react-router-dom'; // Import Link
import { useCart } from '../context/CartContext';

const ItemCard = ({ item }) => {
    const { itemName, price, imageUrl, itemsInStock, id } = item; // Destructure id
    const { dispatch } = useCart(); // Access the dispatch method from the CartContext

    const handleAddToCart = () => {
        dispatch({ type: 'ADD_ITEM', payload: item }); // Dispatch the add item action
    };

    return (
        <div className="bg-[#fffdf9] rounded-xl rounded-t-3xl md:m-0 shadow-md overflow-hidden">
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
            <button
                className={`w-full px-4 py-2 text-white select-none ${itemsInStock > 0 ? 'bg-black hover:bg-zinc-700' : 'bg-gray-400 cursor-not-allowed'}`}
                onClick={itemsInStock > 0 ? handleAddToCart : null}
                disabled={itemsInStock === 0}
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ItemCard;
