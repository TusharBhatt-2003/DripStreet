const Dialog = ({ isOpen, onClose, title, message }) => {
    console.log("Dialog Component Rendered"); // Log to confirm rendering
    console.log("Dialog isOpen:", isOpen); // Log the open state

    if (!isOpen) return null; // Prevent rendering if not open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> {/* Added z-50 for visibility */}
            <div className="bg-[#fffffc] p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="mt-2">{message}</p>
                <button 
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Dialog;
