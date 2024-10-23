import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import hamburger and close icons
import Search from './Search';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false); // State to handle mobile menu toggle

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Toggle the menu state
    };

    return (
        <header className="sticky top-1 bg-white/30 backdrop-blur-lg p-4 border-2 mt-1 mx-1 border-black rounded-xl z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-black text-lg font-extrabold">
                    <Link to="/">DripStreet</Link>
                </div>
                <div className='flex justify-center items-center'>
                  <Search /> {/* Add the search component here */}
                </div>
                {/* Desktop Menu */}
                <nav className="hidden md:flex">
                    <ul className="flex items-center space-x-4">
                        <li>
                            <Link to="/men" className="text-black hover:bg-gray-100/30 hover:backdrop-blur-3xl px-3 py-2 rounded-3xl">
                                Men
                            </Link>
                        </li>
                        <li>
                            <Link to="/women" className="text-black hover:bg-gray-100/30 hover:backdrop-blur-3xl px-3 py-2 rounded-3xl">
                                Women
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart" className="text-black hover:bg-gray-100/30 hover:backdrop-blur-3xl px-3 py-2 rounded-3xl flex items-center">
                                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                                Cart
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Hamburger Icon for Mobile */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-black focus:outline-none">
                        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <nav className="md:hidden mt-4">
                    <ul className="flex flex-col items-center space-y-4 bg-white p-4 rounded-lg">
                        <li>
                            <Link to="/men" className="text-black hover:bg-gray-100/30 px-3 py-2 rounded-lg" onClick={toggleMenu}>
                                Men
                            </Link>
                        </li>
                        <li>
                            <Link to="/women" className="text-black hover:bg-gray-100/30 px-3 py-2 rounded-lg" onClick={toggleMenu}>
                                Women
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart" className="text-black hover:bg-gray-100/30 px-3 py-2 rounded-lg flex items-center" onClick={toggleMenu}>
                                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                                Cart
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;
