import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import Cart from './pages/Cart';
import ItemPage from './pages/ItemPage';
import Favicon from './components/Favicon'; // Import the Favicon component
import Payment from './pages/Payment';
import PaymentConfirmation from './pages/PaymentConfiermation';
import Footer from './components/Footer';

const App = () => {
    return (
        <Router>
            <Header />
            <Favicon /> {/* Favicon inside the Router */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/men" element={<Men />} />
                <Route path="/women" element={<Women />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/item/:id" element={<ItemPage />} />
                <Route path='/payment' element={<Payment />} />
                <Route path='/payment-confirmation' element={<PaymentConfirmation />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
