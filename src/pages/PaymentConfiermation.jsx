import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PaymentConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { paymentData } = location.state || {};

    // Save paymentData to localStorage for order history
    useEffect(() => {
        if (paymentData) {
            // Get existing orders from localStorage or initialize with an empty array
            const existingOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
            
            // Add the current payment data to the list of orders
            const updatedOrders = [...existingOrders, paymentData];
            
            // Save the updated list to localStorage
            localStorage.setItem('orderHistory', JSON.stringify(updatedOrders));
        }
    }, [paymentData]);

    if (!paymentData) {
        return <div>No payment information available.</div>;
    }

    return (
        <div className="container mx-auto px-5 py-10">
            <h1 className="text-4xl font-bold mb-4">Payment Confirmation</h1>
            <h2 className="text-2xl font-bold mb-2">Thank you for your payment!</h2>
            <h3 className="text-lg font-semibold">Payment Method: {paymentData.selectedPaymentMethod}</h3>
            <h3 className="text-lg font-semibold">Total Cost: ${paymentData.totalCost}</h3>
            <h3 className="text-lg font-semibold">Delivery Address:</h3>
            <p className="mb-4">
                {paymentData.address.houseNumber}, {paymentData.address.streetName}, {paymentData.address.landmark}<br />
                {paymentData.address.city}, {paymentData.address.state}, {paymentData.address.postalCode}
            </p>
            <h3 className="text-lg font-semibold">Items:</h3>
            <ul className="mb-4">
                {paymentData.items.map(item => (
                    <li key={item.id}>{item.itemName} (x{item.quantity})</li>
                ))}
            </ul>
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
            <div className="mt-6">
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
                >
                    Go to Home
                </button>
                <button
                    onClick={() => navigate('/order-history')}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    View Order History
                </button>
            </div>
        </div>
    );
};

export default PaymentConfirmation;
