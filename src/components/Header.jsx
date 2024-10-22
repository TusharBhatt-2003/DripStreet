// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// Import Font Awesome icons (optional)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <header className="p-4 border-2 mt-1 mx-1 border-black rounded-xl">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-black text-2xl font-bold">
                    <Link to="/">DripStreet</Link>
                </div>
                <nav>
                    <ul className="flex items-center space-x-4">
                        <li>
                            <Link to="/men" className="text-black hover:bg-gray-100 px-3 py-2 rounded">
                                Men
                            </Link>
                        </li>
                        <li>
                            <Link to="/women" className="text-black hover:bg-gray-100 px-3 py-2 rounded">
                                Women
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart" className="text-black hover:bg-gray-100 px-3 py-2 rounded flex items-center">
                                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                                Cart
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
