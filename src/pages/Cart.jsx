import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Dialog from '../components/Dialog'; // Import your Dialog component

const Cart = () => {
    const { state, dispatch } = useCart();
    const { items } = state;
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    const totalCost = items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    const handleRemoveItem = (item) => {
        dispatch({ type: 'REMOVE_ITEM', payload: item });
    };

    const handleRemoveOne = (item) => {
        dispatch({ type: 'REMOVE_ONE', payload: item });
    };

    const handleAddOne = (item) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
    };

    const handleMakeOrder = () => {
        // Here, we can directly navigate to the payment page since there are no address fields
        navigate('/payment', { state: { totalCost, items } }); // Redirect with total cost and items
    };

    return (
        <div className="container h-full mx-auto px-10 py-10">
            <h1 className="text-4xl font-bold mb-6 teko">Your Cart</h1>
            {items.length === 0 ? (
                <p className="text-lg text-gray-700">Your cart is empty.</p>
            ) : (
                <>
                    <div className="flex flex-col justify-center items-center md:grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {items.map(item => (
                            <div key={item.id} className="border flex flex-col justify-between w-[75vw] md:w-[25vw] lg:w-[20vw] h-full border-black rounded px-2 py-3">
                                <div className='flex justify-center items-start gap-5'>
                                    <img src={item.imageUrl} alt={item.itemName} className="w-20 h-full object-cover" />
                                    <div className='flex flex-col items-start'>
                                        <h3 className="text-lg font-semibold">{item.itemName}</h3>
                                        <p className="text-gray-700">Price: ${item.price.toFixed(2)}</p>
                                        <p className="text-gray-700">Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="mt-2 px-2 border text-black rounded-full hover:border-red-800 hover:text-red-800 transition"
                                        onClick={() => handleRemoveOne(item)}
                                    >
                                        -1
                                    </button>
                                    <button
                                        className="mt-2 px-2 border text-black rounded-full hover:border-blue-800 hover:blue-red-800 transition"
                                        onClick={() => handleAddOne(item)}
                                    >
                                        +1
                                    </button>
                                    <button
                                        className="mt-2 ml-2 px-2 py-1 bg-red-800 text-white rounded border hover:border-red-600 hover:bg-red-200 hover:text-red-600 transition"
                                        onClick={() => handleRemoveItem(item)}
                                    >
                                        Remove All
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h2 className="text-2xl font-bold mt-6">Total Cost: ${totalCost}</h2>

                    {/* Make Order Button */}
                    <button 
                        className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded border hover:border-green-600 hover:bg-green-200 hover:text-green-600 transition"
                        onClick={handleMakeOrder}
                    >
                        Make Order
                    </button>
                </>
            )}

            {/* Dialog for Address Error */}
            <Dialog 
                isOpen={dialogOpen} 
                onClose={() => setDialogOpen(false)} 
                title="Error" 
                message={dialogMessage} 
            />
        </div>
    );
};

export default Cart;
