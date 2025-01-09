import { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/frontend_assets/assets.js'
import { CartContext } from '../context/CartContext'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
// 
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const Navbar = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getCartCount } = useContext(CartContext);

  const { userData, backendUrl, setUserData, isLoggedin, setIsLoggedin, totalAmount  } = useContext
  (AppContext);

  const { cart, getOrderSummary } = useCart();
    const { subtotal, tax, deliveryFee, total } = getOrderSummary();

    console.log('total', total);

    const sendVerificationOtp = async () => {
        try{
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`, {}, {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if(data.success){
                toast.success('Verification OTP sent successfully');
                navigate('/email-verify');
            }
            else{
                toast.error(data.message);
            }

        }catch{
            console.error('Verification OTP Error:', error);
            toast.error('An error occurred while sending');
        }
    }

   
  
  

  const logout = async () => {
     try {
            const { data } = await axios.post(`${backendUrl}/api/auth/logout`, {}, {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (data.success) {
                setIsLoggedin(false);
                setUserData(null);
                // Clear cookies and session storage
                document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                sessionStorage.clear();
                navigate('/');
            }
        } catch (error) {
            console.error('Logout Error:', error);
            
        }

  }
    useEffect(() => {
        if (userData) {
            console.log('Account verification status:', userData.isAccountVerified);
        }
    }, [userData]);

  return (
    <nav className='relative bg-gray  '>
     
      {/* Desktop Navigation */}
      <div className='flex flex-row justify-between items-center py-5 font-medium'>
        <Link to='/'><img  src={assets.logo} className='w-36' alt="logo" /></Link>

        {/* Mobile Menu Button */}
        <button 
          className='md:hidden z-50'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <img src={assets.menu_icon} className='w-6' alt="menu" />
        </button>

        {/* Desktop Menu */}
           <ul className='hidden md:flex gap-5 text-sm text-gray-700'>
  <NavLink 
    className='flex flex-col items-center justify-center h-full px-6 py-3 rounded-md transition-all duration-300 ease-in-out hover:bg-black hover:text-white' 
    to='/'
  >
    <p className='text-center'>HOME</p>
    <hr className='w-2/4 h-[1.5px] border-none bg-gray-700 hidden'></hr>
  </NavLink>
  
  <NavLink 
    className='flex flex-col items-center justify-center h-full px-6 py-3 rounded-md transition-all duration-300 ease-in-out hover:bg-black hover:text-white' 
    to='/about'
  >
    <p className='text-center'>ABOUT</p>
    <hr className='w-2/4 h-[1.5px] border-none bg-gray-700 hidden'></hr>
  </NavLink>
  <NavLink 
    className='flex flex-col items-center justify-center h-full px-6 py-3 rounded-md transition-all duration-300 ease-in-out hover:bg-black hover:text-white' 
    to='/contact'
  >
    <p className='text-center'>CONTACT</p>
    <hr className='w-2/4 h-[1.5px] border-none bg-gray-700 hidden'></hr>
  </NavLink>

  <NavLink 
    className='flex flex-col items-center justify-center h-full px-6 py-3 rounded-md transition-all duration-300 ease-in-out hover:bg-black hover:text-white' 
    to='/custom-pizza'
  >
    <p className='text-center'>CREATE YOUR OWN PIZZA</p>
    <hr className='w-2/4 h-[1.5px] border-none bg-gray-700 hidden'></hr>
  </NavLink>
</ul>

        {/* Desktop Icons */}
        <div className='hidden md:flex items-center gap-6'>
          {/* <img src={assets.search_icon} className='w-6 cursor-pointer' alt="search" /> */}
          
          <div className='group relative'>
            <img className='w-6 cursor-pointer' src={assets.profile_icon} alt="profile" />
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
              <div className='flex flex-col gap-2 w-40 py-3 px-5 bg-slate-100 text-gray-500 rounded-lg shadow-lg '>
               {/* <Link to='/login'> <p className='cursor-pointer hover:text-black'>Login</p></Link> */}
               <Link to={isLoggedin ? '#' : '/login'} onClick={isLoggedin ? logout : undefined}>
                <p className='cursor-pointer hover:text-black'>
                  {isLoggedin ? 'Logout' : 'Login'}
                </p>
              </Link>
               <hr/>
               <Link to='/userProfile'> <p className='cursor-pointer hover:text-black'>My Profile</p></Link>
               <hr/>
                <Link to='/my-orders'><p className='cursor-pointer hover:text-black'>Orders</p></Link>
                <hr/>

               <Link to="/email-verify">
                  {userData?.isAccountVerified === false && (
                    <p onClick={sendVerificationOtp} className="cursor-pointer hover:text-black">
                      Verify Account
                    </p>
                  )}
                </Link>
                  
                {/* <p onClick={logout} className='cursor-pointer hover:text-black -mt-2'>Logout</p> */}
              </div>
            </div>
          </div>
          
          <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} className='w-5 min-w-5' alt="cart" />
            <p className='absolute -top-2 -right-2 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-40 md:hidden transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className='flex flex-col items-center pt-20 gap-8'>
          <NavLink className="hover:text-black" to='/' onClick={() => setIsMobileMenuOpen(false)}>HOME</NavLink>
          <NavLink className="hover:text-black" to='/custom-pizza' onClick={() => setIsMobileMenuOpen(false)}>COLLECTION</NavLink>
          <NavLink to='/about' onClick={() => setIsMobileMenuOpen(false)}>ABOUT</NavLink>
          <NavLink to='/contact' onClick={() => setIsMobileMenuOpen(false)}>CONTACT</NavLink>
          <Link to='/cart' onClick={() => setIsMobileMenuOpen(false)}>CART</Link>
          
          <div className='flex gap-4 mt-8'>
            {/* <img src={assets.search_icon} className='w-7' alt="search" /> */}
            <div className='group relative'>
            <img src={assets.profile_icon} className='w-6' alt="profile" />
             <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
              <div className='flex flex-col gap-2 w-40 py-3 px-5 bg-slate-100 text-gray-500 rounded-lg shadow-lg '>
               {/* <Link to='/login'> <p className='cursor-pointer hover:text-black'>Login</p></Link> */}
               <Link to={isLoggedin ? '#' : '/login'} onClick={isLoggedin ? logout : undefined}>
                <p className='cursor-pointer hover:text-black'>
                  {isLoggedin ? 'Logout' : 'Login'}
                </p>
              </Link>
               <hr/>
               <Link to='/userProfile'> <p className='cursor-pointer hover:text-black'>My Profile</p></Link>
               <hr/>
                <Link to='/my-orders'><p className='cursor-pointer hover:text-black'>Orders</p></Link>
                <hr/>

               <Link to="/email-verify">
                  {userData?.isAccountVerified === false && (
                    <p onClick={sendVerificationOtp} className="cursor-pointer hover:text-black">
                      Verify Account
                    </p>
                  )}
                </Link>
                  
                {/* <p onClick={logout} className='cursor-pointer hover:text-black -mt-2'>Logout</p> */}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar