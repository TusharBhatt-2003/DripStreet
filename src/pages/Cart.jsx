import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Dialog from '../components/Dialog'; // Import your Dialog component
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Cart = () => {
    const { state, dispatch } = useCart();
    const { items } = state;
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    const totalCost = items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    const totalItems = items.reduce((total, item) => total + item.quantity, 0); // Calculate total items

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
        <div className="container w-screen h-full py-10">
            <h1 className="text-4xl font-bold mb-6 teko">Your Cart</h1>
            {items.length === 0 ? (
                <p className="text-lg text-gray-700">Your cart is empty.</p>
            ) : (
                <>
                    <div className="flex w-screen mx-auto px-10 flex-col justify-center items-center md:grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {items.map(item => (
                            <div key={item.id} className="bg-[#fedcd0] flex flex-col justify-between w-[65vw] md:w-[25vw] lg:w-[20vw] h-full  rounded-xl px-2 py-3">
                                <div className='flex justify-center items-start gap-5'>
                                    <img src={item.imageUrl} alt={item.itemName} className="w-20 h-full object-cover" />
                                    <div className='flex flex-col items-start'>
                                        <h3 className="text-lg font-semibold">{item.itemName}</h3>
                                        <p className="text-gray-700">Price: ${item.price.toFixed(2)}</p>
                                        <p className="text-gray-700">Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                                <div className='flex w-full self-center justify-center gap-16 mt-5 items-center'>
                                   <div className='flex bg gap-2'>
                                   <div
                                        className="mt-2 text-xl px-3 py-1 rounded border border-transparent border-red-600 hover:bg-red-200 text-red-600 transition"
                                        onClick={() => handleRemoveOne(item)}
                                    >
                                <FontAwesomeIcon icon={faMinus} />
                                    </div>
                                    <div
                                        className="mt-2 text-xl px-3 py-1 rounded border border-transparent border-blue-600 hover:bg-blue-200 text-blue-600 transition"
                                        onClick={() => handleAddOne(item)} 
                                    >
                                 <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                   </div>
                                    <div
                                        className="mt-2 text-xl ml-2 px-3 py-1 rounded border border-transparent hover:border-red-600 bg-red-600 text-red-200 border-red-600 hover:bg-red-200 hover:text-red-600 transition"
                                        onClick={() => handleRemoveItem(item)}
                                    >
                                    <FontAwesomeIcon icon={faTrash} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {items.length > 0 && (
                <div className="border-y-4 my-10  w-screen border-black sticky bottom-10 bg-white p-4 flex justify-evenly items-center">
                 <div className='flex flex-col gap-1 md:gap-10 md:flex-row justify-around'>
                 <h2 className="md:text-2xl md:font-bold">Total Items: {totalItems}</h2> {/* Display Total Items */}
                 <h2 className="md:text-2xl md:font-bold">Total Cost: ${totalCost}</h2> {/* Total Cost */}
                 </div>
                    <button 
                        className="px-6 py-3 bg-green-600 text-white font-semibold rounded border hover:border-green-600 hover:bg-green-200 hover:text-green-600 transition"
                        onClick={handleMakeOrder}
                    >
                        Make Order
                    </button>
                </div>
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
