import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


  

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, item.quantity + change);
    updateQuantity(item._id, item.size, newQuantity);
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg mb-4">
      <div className="flex items-center gap-4">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h3 className="font-medium">{item.title}</h3>
          <p className="text-sm text-gray-600">Size: {item.size}</p>
          <p className="text-sm text-gray-600">
            Calories: {item.calories}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleQuantityChange(-1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button 
            onClick={() => handleQuantityChange(1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="w-24 text-right">
          ₹{(item.price * item.quantity).toFixed(2)}
        </div>
        
        <button
          onClick={() => removeFromCart(item._id, item.size)}
          className="p-1 text-red-500 hover:bg-red-50 rounded"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const Cart = () => {
  const navigate = useNavigate();
  
  const { cart, getOrderSummary } = useCart();
  const { subtotal, tax, deliveryFee, total } = getOrderSummary();
   const [buttonText, setButtonText] = useState('Proceed to Checkout');
  if (!cart || cart.length === 0) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className="p-8 bg-gradient-to-r from-teal-100 to-lime-100 text-center text-gray-800 rounded-lg shadow-xl space-y-4">
        <h2 className="text-4xl font-bold text-gray-800">Oops! Your Cart is Hungry!</h2>
        <p className="text-lg font-medium text-gray-800">
          A cart with no <span className='text-red-500'>food</span>  is like a pizza with no toppings! (*/ω＼*)
        </p>
        <button 
          className="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => window.location.href = '/'}
        >
          Let's Add Some Yummy Items!
        </button>
      </div>
      </div>


    );
  }

  return (
    
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      
      <div className="space-y-4">
        {cart.map(item => (
          <CartItem 
            key={`${item._id}-${item.size}`} 
            item={item} 
          />
        ))}
      </div>
      
      <div className="mt-6 border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax (8%)</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery Fee</span>
          <span>₹{deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2 border-t">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
      
       <button 
      className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-red-600 transition-all duration-300"
      onClick={() => navigate('/orders')}
      onMouseEnter={() => setButtonText('Thank you for shopping.....')}
      onMouseLeave={() => setButtonText('Proceed to Checkout')}
    >
      {buttonText}
    </button>
    </div>
  );
};

export default Cart;



