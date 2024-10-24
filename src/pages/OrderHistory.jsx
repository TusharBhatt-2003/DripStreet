import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve order history from localStorage
        const storedOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
        setOrders(storedOrders);
    }, []);

    // Function to handle deleting an order
    const handleDeleteOrder = (index) => {
        const updatedOrders = orders.filter((_, i) => i !== index);
        setOrders(updatedOrders);
        localStorage.setItem('orderHistory', JSON.stringify(updatedOrders)); // Update localStorage
    };

    // Function to handle clearing all order history
    const handleClearHistory = () => {
        setOrders([]); // Clear orders in the state
        localStorage.removeItem('orderHistory'); // Remove order history from localStorage
    };

    // Function to handle viewing a specific item
    const handleViewItem = (itemID) => {
        navigate(`/item/${itemID}`); // Navigate to the item page (assuming `/item/:id` route exists)
    };

    return (
        <div className="container mx-auto px-2 py-10">
            <h1 className="text-4xl font-bold mb-6">Order History</h1>
            {orders.length > 0 ? (
                <>
                    <button
                        onClick={handleClearHistory}
                        className="mb-6 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Clear All History
                    </button>
                    <div className='flex flex-col justify-center md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-5 items-center'>
                        {orders.map((order, index) => (
                            <div key={index} className="mb-6 h-full w-full border-black border-2 rounded-xl p-4">
                                <h2 className="text-2xl border-b border-slate-900 font-semibold mb-2">Order {index + 1}</h2>
                                <p><strong>Payment Method:</strong> {order.selectedPaymentMethod}</p>
                                <p><strong>Total Cost:</strong> ${order.totalCost}</p>
                                <h3 className="text-lg font-semibold">Delivery Address:</h3>
                                <p>{order.address.houseNumber}, {order.address.streetName}, {order.address.landmark}, {order.address.city}, {order.address.state}, {order.address.postalCode}</p>
                                <h3 className="text-lg font-semibold">Items:</h3>
                                <ul className='bg-[#fedcd0] w-fit p-2 rounded-lg'>
                                    {order.items.map((item, idx) => (
                                        <li key={idx} className='flex justify-between'>
                                            {item.itemName} (x{item.quantity})
                                            <button
                                                onClick={() => handleViewItem(item.itemId)} // Assuming each item has an `itemId`
                                                className="text-sm text-blue-500 underline ml-4"
                                            >
                                                View Item
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => handleDeleteOrder(index)}
                                    className="mt-4 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700"
                                >
                                    Delete Order
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-red-500">No order history available.</p>
            )}
        </div>
    );
};

export default OrderHistory;
