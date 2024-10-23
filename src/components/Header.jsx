import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import hamburger and close icons
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion
import Search from './Search';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false); // State to handle mobile menu toggle

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Toggle the menu state
    };

    // Framer Motion animation variants for the menu container
    const menuVariants = {
        hidden: {
            opacity: 0,
            y: '-10vh', // Start from off-screen (top)
        },
        visible: {
            opacity: 1,
            y: 0, // Move into the view
            transition: {
                type: 'spring',
                stiffness: 80,
                delayChildren: 0.2, // Delay child elements (list items) to stagger their animations
                staggerChildren: 0.2, // Stagger the appearance of list items
            },
        },
        exit: {
            opacity: 0,
            y: '-1vh',
            transition: {
                duration: 0.3,
            },
        },
    };

    // Variants for individual menu items to alternate horizontal animation
    const menuItemVariants = {
        hiddenLeft: {
            opacity: 0,
            x: -100, // Start from left side
        },
        hiddenRight: {
            opacity: 0,
            x: 100, // Start from right side
        },
        visible: {
            opacity: 1,
            x: 0, // Move into the view
            transition: {
                type: 'spring',
                stiffness: 50,
            },
        },
    };

    return (
        <header className="sticky top-1 bg-white/30 backdrop-blur-lg px-4 border-2 mt-1 mx-1 border-black rounded-xl z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-black text-lg font-extrabold">
                    <Link to="/">DripStreet</Link>
                </div>
                <div className='flex justify-center items-center w-1/3'>
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

            {/* Mobile Menu with Framer Motion */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.nav
                        className="md:hidden mt-4"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuVariants} // Apply the animation variants
                    >
                        <ul className="flex flex-col items-center space-y-4 bg-white/30 backdrop-blur-3xl p-4 rounded-xl">
                            <motion.li
                                variants={menuItemVariants}
                                initial="hiddenLeft"
                                animate="visible"
                                exit="hiddenRight" // Use exit variant for animation
                                className="text-black hover:bg-blue-300/30 px-3 py-2 rounded-lg"
                            >
                                <Link to="/men" onClick={() => setMenuOpen(false)}>
                                    Men
                                </Link>
                            </motion.li>
                            <motion.li
                                variants={menuItemVariants}
                                initial="hiddenRight"
                                animate="visible"
                                exit="hiddenLeft" // Use exit variant for animation
                                className="text-black hover:bg-pink-300/30 px-3 py-2 rounded-lg"
                            >
                                <Link to="/women" onClick={() => setMenuOpen(false)}>
                                    Women
                                </Link>
                            </motion.li>
                            <motion.li
                                variants={menuItemVariants}
                                initial="hiddenLeft"
                                animate="visible"
                                exit="hiddenRight" // Use exit variant for animation
                                className="text-black hover:bg-green-300/30 px-3 py-2 rounded-lg flex items-center"
                            >
                                <Link to="/cart" onClick={() => setMenuOpen(false)}>
                                    <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                                    Cart
                                </Link>
                            </motion.li>
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
