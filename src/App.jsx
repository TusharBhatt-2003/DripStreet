import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import Cart from './pages/Cart';
import ItemPage from './pages/ItemPage';
import Favicon from './components/Favicon'; // Import the Favicon component
import Payment from './pages/Payment';
import PaymentConfirmation from './pages/PaymentConfirmation';
import Footer from './components/Footer';
import OrderHistory from './pages/OrderHistory';

const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen"> {/* Flexbox layout */}
                <Header />
                <Favicon /> {/* Favicon inside the Router */}
                <main className="flex-grow"> {/* Main content area */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/men" element={<Men />} />
                        <Route path="/women" element={<Women />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/item/:id" element={<ItemPage />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
                        <Route path="/order-history" element={<OrderHistory />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
