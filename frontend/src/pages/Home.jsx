import React from 'react'
import Hero from '../components/Hero'
import PizzaCardGrid from '../components/PizzaGrid'
import Navbar from '../components/Navbar'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'


const Home = () => {
   const pizzaSectionRef = useRef(null);
   const { isLoggedin, getAuthState } = useContext(AppContext);  // Assuming 'isLoggedIn' tells if the user is logged in
  const navigate = useNavigate();
  const handleOrderNowClick = () => {
    if (isLoggedin) {
      pizzaSectionRef.current?.scrollIntoView({ behavior: 'smooth' });  // Scroll to the pizza section
    } else {
      navigate('/login');  // Redirect to the login page if not logged in
    }
  };
  return (
    <div>
      
        <Hero onOrderNowClick={handleOrderNowClick} />
         <div ref={pizzaSectionRef}>
        <PizzaCardGrid />
      </div>
    </div>
  )
}

export default Home
