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
                            <input type="text" name="cardNumber" placeholder="Card Number" value={details.cardNumber} onChange={onChange} className="border-b bg-transparent px-1 mb-2 w-fit outline-none focus:border-b-black placeholder:text-zinc-500" />
                            <input type="text" name="cardExpiry" placeholder="MM/YY" value={details.cardExpiry} onChange={onChange} className="border-b bg-transparent px-1 mb-2 w-fit outline-none focus:border-b-black placeholder:text-zinc-500" />
                            <input type="text" name="cardCVC" placeholder="CVC" value={details.cardCVC} onChange={onChange} className="border-b bg-transparent px-1 w-fit outline-none focus:border-b-black placeholder:text-zinc-500" />
                        </div>
                    </div>
                );
            case 'upi':
                return (
                    <>
                        <h3 className="text-lg font-semibold mb-4">UPI ID</h3>
                        <input type="text" name="upiId" placeholder="Enter UPI ID" value={details.upiId} onChange={onChange} className="border-b bg-transparent px-1 mb-2 w-full outline-none focus:border-b-black placeholder:text-zinc-500" />
                    </>
                );
            case 'cashOnDelivery':
                return (
                    <>
                        <h3 className="text-lg font-semibold mb-4">Cash Amount</h3>
                        <input type="number" name="cashAmount" placeholder="Enter Amount" value={details.cashAmount} onChange={onChange} className="border-b bg-transparent px-1 mb-2 w-full outline-none focus:border-b-black placeholder:text-zinc-500" />
                    </>
                );
            case 'netBanking':
                return (
                    <>
                        <h3 className="text-lg font-semibold mb-4">Net Banking Account</h3>
                        <input type="text" name="netBankingAccount" placeholder="Enter Account Number" value={details.netBankingAccount} onChange={onChange} className="border-b bg-transparent px-1 mb-2 w-full outline-none focus:border-b-black placeholder:text-zinc-500" />
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
    const { totalCost, items } = location.state || {};
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
    const [address, setAddress] = useState({
        houseNumber: '',
        streetName: '',
        landmark: '',
        city: '',
        state: '',
        postalCode: '',
    });

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
        if (!address.houseNumber) {
            setDialogMessage("Please enter your delivery address before proceeding with the payment.");
            setDialogOpen(true);
            return;
        }
    
        const paymentData = {
            method: selectedPaymentMethod,
            totalCost: totalCost,
            items: items,
            address: address,
            paymentDetails: paymentDetails,
        };
    
        // Get the current order history from localStorage
        const storedOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    
        // Add the new order to the history
        const updatedOrders = [...storedOrders, paymentData];
    
        // Save the updated order history back to localStorage
        localStorage.setItem('orderHistory', JSON.stringify(updatedOrders));
    
        // Simulate payment processing
        setTimeout(() => {
            setDialogMessage("Payment successful! Thank you for your order.");
            setDialogOpen(true);
        }, 2000);
    };
    
    const closeDialog = () => {
        setDialogOpen(false);
        // After closing the dialog, navigate to the confirmation page if payment was successful
        if (dialogMessage === "Payment successful! Thank you for your order.") {
            navigate('/payment-confirmation', { state: { paymentData: { selectedPaymentMethod, totalCost, items, address, paymentDetails } } });
        }
    };

    return (
        <div className="container mx-auto px-5 py-10 lg:w-[70vw]">
            <h1 className="text-4xl font-bold mb-6 teko">Payment</h1>
            <h2 className="text-2xl font-bold mb-4">Your Order</h2>
            {items && items.length > 0 ? (
                <div className="mb-4">
                    {items.map(item => (
                        <div key={item.id} className="flex justify-between border-b border-zinc-200 mb-2">
                            <span>{item.itemName} (x{item.quantity})</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="my-4 h-[2px] rounded-full bg-black" />
                    <div className="flex justify-between font-bold">
                        <span>Total Cost:</span>
                        <span>${totalCost}</span>
                    </div>
                    <div className="my-4 h-[1.7px] rounded-full bg-black" />
                </div>
            ) : (
                <p className="text-red-500">No items in your order.</p>
            )}

   {/* Delivery Address */}
   <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Delivery Address</h2>
                <div className="flex flex-col mb-4">
                    <input type="text" placeholder="House Number" value={address.houseNumber} onChange={(e) => setAddress({ ...address, houseNumber: e.target.value })} className="border-b mb-2 outline-none focus:border-b-black placeholder:text-zinc-500" />
                    <input type="text" placeholder="Street Name" value={address.streetName} onChange={(e) => setAddress({ ...address, streetName: e.target.value })} className="border-b mb-2 outline-none focus:border-b-black placeholder:text-zinc-500" />
                    <input type="text" placeholder="Landmark" value={address.landmark} onChange={(e) => setAddress({ ...address, landmark: e.target.value })} className="border-b mb-2 outline-none focus:border-b-black placeholder:text-zinc-500" />
                    <input type="text" placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="border-b mb-2 outline-none focus:border-b-black placeholder:text-zinc-500" />
                    <input type="text" placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} className="border-b mb-2 outline-none focus:border-b-black placeholder:text-zinc-500" />
                    <input type="text" placeholder="Postal Code" value={address.postalCode} onChange={(e) => setAddress({ ...address, postalCode: e.target.value })} className="border-b mb-2 outline-none focus:border-b-black placeholder:text-zinc-500" />
                </div>
            </div>

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

         

            {/* Dialog Component */}
            <Dialog 
                isOpen={dialogOpen} 
                onClose={closeDialog} // Close dialog and navigate to confirmation
                title="Payment Status" 
                message={dialogMessage} 
            />
        </div>
    );
};

export default Payment;
