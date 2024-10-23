// src/context/CartContext.jsx
import { createContext, useContext, useReducer } from 'react';

// Create a Context for the cart
const CartContext = createContext();

// Initial state for the cart
const initialState = {
    items: [],
};

// Cart reducer to manage cart actions
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex >= 0) {
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex].quantity += 1; // Increase quantity
                return { ...state, items: updatedItems };
            } else {
                return {
                    ...state,
                    items: [...state.items, { ...action.payload, quantity: 1 }],
                };
            }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id),
            };
        case 'REMOVE_ONE':
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index >= 0) {
                const updatedCart = [...state.items];
                if (updatedCart[index].quantity > 1) {
                    updatedCart[index].quantity -= 1; // Decrease quantity
                } else {
                    updatedCart.splice(index, 1); // Remove item if quantity is 1
                }
                return { ...state, items: updatedCart };
            }
            return state;
        default:
            return state;
    }
};

// Create a provider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the CartContext
export const useCart = () => {
    return useContext(CartContext);
};
