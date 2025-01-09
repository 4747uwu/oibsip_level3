import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppContext } from './context/AppContext'; // Import the AppContext
import Home from './pages/Home';
import CustomPizza from './pages/Custom-pizza';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';
import UserOrders from './components/UserOrder';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
// Use PrivateRoute for protected routes
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import UserProfile from './pages/UserProfile';
import Footer from './components/Footer';

const App = () => {
  const { isLoggedin, userData } = useContext(AppContext);
  console.log(isLoggedin, userData); 
  // Access the context values

  return (
    <CartProvider>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <ToastContainer />
        <Navbar />
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute isAuthenticated={isLoggedin} />}>
            <Route path="/custom-pizza" element={<CustomPizza />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/email-verify" element={<EmailVerify />} />
            <Route path="/userProfile" element={<UserProfile />} />
            {userData && userData.email && (
              <Route path="/my-orders" element={<UserOrders userEmail={userData.email} />} />
            )}
          </Route>

          {/* Public Route */}
          <Route path="/login" element={<Login />} />
        </Routes>
            <hr/>

        <Footer/>
      </div>
    </CartProvider>
  );
};

export default App;
