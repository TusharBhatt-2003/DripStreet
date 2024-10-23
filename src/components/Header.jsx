import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Search from './Search'; // Import the Search component

const Header = () => {
    return (
        <header className="sticky top-1 bg-white/30 backdrop-blur-lg px-4 border-2 mt-1 mx-1 border-black rounded-xl z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-black text-2xl font-bold">
                    <Link to="/">DripStreet</Link>
                </div>
            <div className='flex justify-center items-center'>
              <Search /> {/* Add the search component here */}
            </div>
                <nav>
                    <ul className="flex items-center ">
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
            </div>
        </header>
    );
};

export default Header;
