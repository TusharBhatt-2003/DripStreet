import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Search from './Search';

const Header = () => {
    return (
        <header
            className="sticky flex justify-center items-center top-1 bg-[#fffffc] px-4 border-2 mt-2 mx-1 border-[#000000] rounded-xl z-[99] select-none"
        >
            <div className="container w-[100%] flex justify-between items-center">
                <div className="text-[#F24405] text-lg font-extrabold select-none silkscreen-regular">
                    <Link to="/">DS</Link>
                </div>
                <div className='flex justify-center items-center w-1/3'>
                    <Search /> {/* Add the search component here */}
                </div>

                {/* Desktop Menu */}
                <nav className="md:flex">
                    <ul className="flex items-center space-">
                        <li>
                            <NavLink to="/men" className={({ isActive }) => `hidden md:block text-black hover:bg-blue-300/30 hover:backdrop-blur-3xl px-3 py-2 rounded-3xl ${isActive ? 'text-blue-600/60' : ''}`}>
                                Men
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/women" className={({ isActive }) => `hidden md:block text-black hover:bg-pink-300/30 hover:backdrop-blur-3xl px-3 py-2 rounded-3xl ${isActive ? 'text-pink-600/60' : ''}`}>
                                Women
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/order-history" className={({ isActive }) => `text-blue-900 hover:bg-indigo-300/30 hover:backdrop-blur-3xl px-3 py-2 rounded-full ${isActive ? 'text-green-600/60' : ''}`}>
                            <FontAwesomeIcon icon={faClockRotateLeft} />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/cart" className={({ isActive }) => `text-[#F24405] hover:bg-[#f2870555] hover:backdrop-blur-3xl px-3 py-2 rounded-3xl flex items-center ${isActive ? 'text-green-600/60' : ''}`}>
                                <FontAwesomeIcon icon={faShoppingCart}/>
                              
                            </NavLink>
                        </li>
                    </ul>
                </nav>           
            </div>
        </header>
    );
};

export default Header;
