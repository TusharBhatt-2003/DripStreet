import { useLocation } from 'react-router-dom';

const PaymentConfirmation = () => {
    const location = useLocation();
    const { paymentData } = location.state || {}; // Retrieve payment data from state

    // Function to calculate estimated delivery date
    const getEstimatedDeliveryDate = () => {
        const currentDate = new Date();
        const estimatedDeliveryDate = new Date(currentDate);
        
        // Set the estimated delivery date to 5 days from now
        estimatedDeliveryDate.setDate(currentDate.getDate() + 5);
        
        return estimatedDeliveryDate.toLocaleDateString(); // Format to a readable date
    };

    return (
        <div className="container mx-auto px-5 py-10">
            <h1 className="text-4xl font-bold mb-6">Payment Confirmation</h1>
            {paymentData ? (
                <div>
                    <h2 className="text-2xl font-bold">Thank you for your payment!</h2>
                    <p>Payment Method: {paymentData.method}</p>
                    <p>Total Cost: ${paymentData.totalCost}</p>
                    
                    <h3 className="mt-4">Order Details:</h3>
                    {paymentData.items.map(item => (
                        <div key={item.id} className="flex justify-between mb-2">
                            <span>{item.itemName} (x{item.quantity})</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}

                    {/* Estimated Delivery Date */}
                    <h3 className="mt-4">Estimated Delivery Date:</h3>
                    <p>{getEstimatedDeliveryDate()}</p>
                </div>
            ) : (
                <p className="text-red-500">No payment information available.</p>
            )}
        </div>
    );
};

export default PaymentConfirmation;
