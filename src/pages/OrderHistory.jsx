import { useEffect, useState } from 'react';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Retrieve order history from localStorage
        const storedOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
        setOrders(storedOrders);
    }, []);

    return (
        <div className="container mx-auto px-5 py-10">
            <h1 className="text-4xl font-bold mb-6">Order History</h1>
            {orders.length > 0 ? (
                <div>
                    {orders.map((order, index) => (
                        <div key={index} className="mb-6 border-b pb-4">
                            <h2 className="text-2xl font-semibold mb-2">Order {index + 1}</h2>
                            <p><strong>Payment Method:</strong> {order.method}</p>
                            <p><strong>Total Cost:</strong> ${order.totalCost}</p>
                            <h3 className="text-lg font-semibold">Delivery Address:</h3>
                            <p>{order.address.houseNumber}, {order.address.streetName}, {order.address.landmark}, {order.address.city}, {order.address.state}, {order.address.postalCode}</p>
                            <h3 className="text-lg font-semibold">Items:</h3>
                            <ul>
                                {order.items.map((item, idx) => (
                                    <li key={idx}>{item.itemName} (x{item.quantity})</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-red-500">No order history available.</p>
            )}
        </div>
    );
};

export default OrderHistory;
