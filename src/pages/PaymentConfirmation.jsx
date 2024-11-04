import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PaymentConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { paymentData } = location.state || {};

    // Function to generate a unique order ID and get the current date & time
    const generateOrderDetails = () => {
        const orderId = `ds_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
        const orderDateTime = new Date().toLocaleString(); // Get current date and time
        return { orderId, orderDateTime };
    };

    // Save paymentData to localStorage for order history
    useEffect(() => {
        if (paymentData) {
            // Generate a unique order ID and get the current date & time
            const { orderId, orderDateTime } = generateOrderDetails();

            // Create a new order object with the generated ID and date/time
            const orderWithId = {
                ...paymentData,
                id: orderId, // Add the generated order ID
                dateTime: orderDateTime, // Add the date and time
            };

            // Get existing orders from localStorage or initialize with an empty array
            const existingOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];

            // Add the current payment data to the list of orders
            const updatedOrders = [...existingOrders, orderWithId];

            // Save the updated list to localStorage
            localStorage.setItem('orderHistory', JSON.stringify(updatedOrders));
        }
    }, [paymentData]);

    // Cancel order by removing it from localStorage
    const handleCancelOrder = () => {
        const existingOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
        const updatedOrders = existingOrders.filter(order => order.id !== paymentData.id);

        // Update localStorage with the remaining orders
        localStorage.setItem('orderHistory', JSON.stringify(updatedOrders));

        // Navigate to the order history page after cancellation
        navigate('/order-history');
    };

    if (!paymentData) {
        return <div>No payment information available.</div>;
    }

    return (
        <div className="container mx-auto px-5 py-10 flex flex-col items-center justify-center w-full">
            <h1 className="text-4xl font-bold mb-4">Payment Confirmation</h1>
            <h2 className="text-2xl font-light mb-2">Thank you for your payment!</h2>

            <div className='flex border border-black border-dashed flex-col justify-center w-[70vw] lg:w-[40vw] rounded-xl p-3'>
                {/* Display Order ID and Date/Time */}
                <h3 className="text-lg font-semibold mb-2">Order ID: {generateOrderDetails().orderId}</h3>
                <p className="text-sm text-gray-600 mb-4">Order Date & Time: {generateOrderDetails().orderDateTime}</p>

                <h3 className="text-lg font-semibold">Items:</h3>
                <ul className="">
                    {paymentData.items.map(item => (
                        <ul key={item.id}>
                            <li className='flex justify-between items-center'>
                                <p>{item.itemName}</p>
                                <p>${item.price}</p>
                            </li>
                            <li>ID: {item.id}</li>
                            <li className='border-b border-dotted border-black'>Quantity: {item.quantity}</li>
                        </ul>
                    ))}
                </ul>
                <h3 className="text-lg font-semibold flex justify-between items-center border-b border-dotted border-black">
                    Total Cost: <span className='font-normal bg-stone-700/20 rounded-md my-1 px-1'>${paymentData.totalCost}</span>
                </h3>
                <h3 className="text-lg font-semibold">Payment Method: <span className='font-normal uppercase'>{paymentData.selectedPaymentMethod}</span></h3>
                <h3 className="text-lg font-semibold">Payment Details:</h3>
                {/* Display relevant payment details based on method */}
                {paymentData.selectedPaymentMethod === 'creditCard' && (
                    <>
                        <p>Card Number: **** **** **** {paymentData.paymentDetails.cardNumber.slice(-4)}</p>
                        <p>Expiry Date: {paymentData.paymentDetails.cardExpiry}</p>
                        <p>CVC: ***</p>
                    </>
                )}
                {paymentData.selectedPaymentMethod === 'upi' && (
                    <p>UPI ID: {paymentData.paymentDetails.upiId}</p>
                )}
                {paymentData.selectedPaymentMethod === 'cashOnDelivery' && (
                    <p>Cash Amount: ${paymentData.paymentDetails.cashAmount}</p>
                )}
                {paymentData.selectedPaymentMethod === 'netBanking' && (
                    <p>Net Banking Account: {paymentData.paymentDetails.netBankingAccount}</p>
                )}
                <h3 className="text-lg font-semibold">Delivery Address:</h3>
                <p className="mb-4">
                    {paymentData.address.houseNumber}, {paymentData.address.streetName}, {paymentData.address.landmark}<br />
                    {paymentData.address.city}, {paymentData.address.state}, {paymentData.address.postalCode}
                </p>
            </div>

            <div className="mt-6 flex">
                <button
                    onClick={() => navigate('/')}
                    className="bg-[#fedcd0] text-[#F24405] border border-[#F24405] hover:bg-transparent px-4 py-2 rounded mr-4"
                >
                    Go to Home
                </button>
                <button
                    onClick={() => navigate('/order-history')}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded border hover:border-blue-600 hover:bg-blue-200 hover:text-blue-600 transition"
                >
                    View Order History
                </button>
                <button
                    onClick={handleCancelOrder}
                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded border hover:border-red-600 hover:bg-red-200 hover:text-red-600 transition ml-4"
                >
                    Cancel Order
                </button>
            </div>
        </div>
    );
};

export default PaymentConfirmation;
