import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Search from './Search';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Header animation variants based on menu state
    const headerVariants = {
        open: {
            y: 1,
            height: 'auto', // Automatically adjust height when open
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15, // Adjust damping for smoother animation
            },
        },
        closed: {
            height: '45px', // Set a fixed height when closed
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
            },
        },
    };

    // Framer Motion animation variants for the menu container
    const menuVariants = {
        hidden: {
            opacity: 0,
            y: '-25vh', // Start from off-screen (top)
        },
        visible: {
            opacity: 1,
            y: -10, // Move into the view
            transition: {
                type: 'spring',
                stiffness: 50,
                delayChildren: 0.2,
                staggerChildren: 0.2,
            },
        },
        exit: {
            opacity: 1,
            y: '-25vh',
            transition: {
                duration: 0.3,
            },
        },
    };

    // Variants for individual menu items to alternate horizontal animation
    const menuItemVariants = {
        hiddenLeft: {
            opacity: 0,
            x: -200,
        },
        hiddenRight: {
            opacity: 0,
            x: 200,
        },
        hiddenUp: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 70,
            },
        },
    };

    return (
        <motion.header
            className="sticky top-1 bg-[#fffffc]  px-4 border-2 mt-2 mx-1 border-[#000000] rounded-xl z-[99] select-none"
            variants={headerVariants} // Apply header variants
            initial="closed" // Set initial state
            animate={menuOpen ? "open" : "closed"} // Animate based on menu state
            style={{ overflow: '' }} // Prevent overflow during animation
        >
            <div className="container flex justify-between items-center">
                <div className="text-[#F24405] text-lg font-extrabold select-none silkscreen-regular">
                    <Link to="/">DripStreet</Link>
                </div>
                <div className='flex justify-center items-center w-1/3'>
                    <Search /> {/* Add the search component here */}
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex">
                    <ul className="flex items-center space-x-4">
                        <li>
                            <NavLink to="/men" className={({ isActive }) => `text-black hover:bg-blue-300/30 hover:backdrop-blur-3xl px-3 py-2 rounded-3xl ${isActive ? 'text-blue-600/60' : ''}`}>
                                Men
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/women" className={({ isActive }) => `text-black hover:bg-pink-300/30 hover:backdrop-blur-3xl px-3 py-2 rounded-3xl ${isActive ? 'text-pink-600/60' : ''}`}>
                                Women
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/cart" className={({ isActive }) => `text-[#F24405] hover:bg-[#f2870555] hover:backdrop-blur-3xl px-3 py-2 rounded-3xl flex items-center ${isActive ? 'text-green-600/60' : ''}`}>
                                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                                Cart
                            </NavLink>
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
                        <ul className="flex flex-col items-center space-y-4 p-4 rounded-xl overflow-hidden">
                            <motion.li
                                variants={menuItemVariants}
                                initial="hiddenLeft"
                                animate="visible"
                                exit="hiddenLeft"
                                className="text-black hover:bg-blue-300/30 px-3 py-2 rounded-lg"
                            >
                                <NavLink to="/men" onClick={() => setMenuOpen(false)} className={({ isActive }) => `${isActive ? 'text-blue-600/60' : ''}`}>
                                    Men
                                </NavLink>
                            </motion.li>
                            <motion.li
                                variants={menuItemVariants}
                                initial="hiddenRight"
                                animate="visible"
                                exit="hiddenUp"
                                className="text-black hover:bg-pink-300/30 px-3 py-2 rounded-lg"
                            >
                                <NavLink to="/women" onClick={() => setMenuOpen(false)} className={({ isActive }) => `${isActive ? 'text-pink-600/60' : ''}`}>
                                    Women
                                </NavLink>
                            </motion.li>
                            <motion.li
                                variants={menuItemVariants}
                                initial="hiddenLeft"
                                animate="visible"
                                exit="hiddenRight"
                                className="text-[#F24405] hover:bg-[#f2870555] px-3 py-2 rounded-lg flex items-center"
                            >
                                <NavLink to="/cart" onClick={() => setMenuOpen(false)} className={({ isActive }) => `${isActive ? 'text-[#F24405]' : ''}`}>
                                    <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                                    Cart
                                </NavLink>
                            </motion.li>
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;
