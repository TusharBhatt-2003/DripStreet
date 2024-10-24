import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Dialog from '../components/Dialog'; // Ensure this path is correct

const PaymentMethod = ({ method, selected, onChange }) => (
    <label className="custom-radio block mb-2 cursor-pointer">
        <input
            type="radio"
            name="paymentMethod"
            value={method}
            className="hidden"
            checked={selected === method}
            onChange={onChange}
        />
        <span className={`flex justify-center w-[30vw] lg:w-[25vw] items-center p-2 border border-gray-300 rounded transition-colors duration-200 ${selected === method ? 'border border-[#F24405] text-[#F24405] hover:bg-zinc-100' : 'hover:bg-[#fff2ee]'}`}>
            {method === 'creditCard' && 'Credit Card'}
            {method === 'upi' && 'UPI'}
            {method === 'cashOnDelivery' && 'Cash on Delivery'}
            {method === 'netBanking' && 'Net Banking'}
        </span>
    </label>
);

const PaymentDetailsForm = ({ method, details, onChange }) => {
    const renderForm = () => {
        switch (method) {
            case 'creditCard':
                return (
                    <div className='flex flex-col justify-center'>
                        <h3 className="text-lg font-semibold mb-4">Credit Card Details</h3>
                        <div className='flex flex-col items-center justify-center p-2'>
                            <input type="text" name="cardNumber" placeholder="Card Number" value={details.cardNumber} onChange={onChange} className="border-b bg-transparent px-1 mb-2 w-fit" />
                            <input type="text" name="cardExpiry" placeholder="MM/YY" value={details.cardExpiry} onChange={onChange} className="border-b bg-transparent px-1 mb-2 w-fit" />
                            <input type="text" name="cardCVC" placeholder="CVC" value={details.cardCVC} onChange={onChange} className="border-b bg-transparent px-1 w-fit" />
                        </div>
                    </div>
                );
            case 'upi':
                return (
                    <>
                        <h3 className="text-lg font-semibold mb-4">UPI ID</h3>
                        <input type="text" name="upiId" placeholder="Enter UPI ID" value={details.upiId} onChange={onChange} className="border-b bg-transparent px-1 mb-2 w-full" />
                    </>
                );
            case 'cashOnDelivery':
                return (
                    <>
                        <h3 className="text-lg font-semibold mb-4">Cash Amount</h3>
                        <input type="number" name="cashAmount" placeholder="Enter Amount" value={details.cashAmount} onChange={onChange} className="border-b bg-transparent px-1 mb-2 w-full" />
                    </>
                );
            case 'netBanking':
                return (
                    <>
                        <h3 className="text-lg font-semibold mb-4">Net Banking Account</h3>
                        <input type="text" name="netBankingAccount" placeholder="Enter Account Number" value={details.netBankingAccount} onChange={onChange} className="border-b bg-transparent px-1 mb-2 w-full" />
                    </>
                );
            default:
                return null;
        }
    };

    return <div className="mt-4">{renderForm()}</div>;
};

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { address, totalCost, items } = location.state || {};
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        cardExpiry: '',
        cardCVC: '',
        upiId: '',
        cashAmount: '',
        netBankingAccount: '',
    });

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

    const handlePaymentDetailsChange = (event) => {
        const { name, value } = event.target;
        setPaymentDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleMockPayment = () => {
        const paymentData = {
            method: selectedPaymentMethod,
            totalCost: totalCost,
            items: items,
            address: address,
            paymentDetails: paymentDetails,
        };

        console.log("Processing payment...", paymentData);
        
        // Simulating payment processing
        setTimeout(() => {
            navigate('/payment-confirmation', { state: { paymentData } });

            // Setting dialog message and opening the dialog
            setDialogMessage("Payment successful! Thank you for your order.");
            setDialogOpen(true); // This should trigger the dialog to open

            // Log to check if we reached this point
            console.log("Dialog Open State:", true);
        }, 2000);
    };

    return (
        <div className="container mx-auto px-5 py-10 lg:w-[70vw]">
            <h1 className="text-4xl font-bold mb-6 teko">Payment</h1>
            <h2 className="text-2xl font-bold mb-4">Your Order</h2>
            {items && items.length > 0 ? (
                <div className="mb-4">
                    {items.map(item => (
                        <div key={item.id} className="flex justify-between mb-2">
                            <span>{item.itemName} (x{item.quantity})</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <hr className="my-4" />
                    <div className="flex justify-between font-bold">
                        <span>Total Cost:</span>
                        <span>${totalCost}</span>
                    </div>
                </div>
            ) : (
                <p className="text-red-500">No items in your order.</p>
            )}

            <div className="mt-10 py-5 flex flex-col md:flex-row md:justify-evenly justify-center items-center rounded-xl border-2 border-black">
                <div className='flex flex-col justify-center items-center'>
                    <h2 className="text-2xl font-bold mb-4">Payment Options</h2>
                    <p>Please select a payment method:</p>
                    
                    <div className="mt-4">
                        {['creditCard', 'upi', 'cashOnDelivery', 'netBanking'].map((method) => (
                            <PaymentMethod key={method} method={method} selected={selectedPaymentMethod} onChange={handlePaymentMethodChange} />
                        ))}
                    </div>
                </div>

                <div className='flex flex-col justify-center items-center'>
                    {/* Payment Details Form */}
                    {selectedPaymentMethod && (
                        <PaymentDetailsForm method={selectedPaymentMethod} details={paymentDetails} onChange={handlePaymentDetailsChange} />
                    )}

                    <button 
                        className="mt-4 px-3 py-2 bg-green-600 text-white font-semibold rounded border hover:border-green-600 hover:bg-green-200 hover:text-green-600 transition"
                        disabled={!selectedPaymentMethod}
                        onClick={handleMockPayment}
                    >
                        Pay Now
                    </button>
                </div>
            </div>

            {/* Delivery Address */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Delivery Address</h2>
                {address ? (
                    <div>
                        <p>{address.name}</p>
                        <p>{address.street}</p>
                        <p>{address.city}, {address.state} {address.zip}</p>
                        <p>{address.country}</p>
                    </div>
                ) : (
                    <p className="text-red-500">No delivery address provided.</p>
                )}
            </div>

            {/* Dialog Component */}
            <Dialog 
                isOpen={dialogOpen} 
                onClose={() => setDialogOpen(false)} 
                title="Payment Status" 
                message={dialogMessage} 
            />
        </div>
    );
};

export default Payment;
