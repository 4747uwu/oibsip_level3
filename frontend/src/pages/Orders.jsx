import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // Adjust path as needed
import PaymentComponent from '../components/Payment.jsx'
const OrderPage = () => {
  const [showPayment, setShowPayment] = useState(false);
  const [orderId] = useState('ORDER_' + Math.random().toString(36).substr(2, 9).toUpperCase());
  const [buttonText, setButtonText] = useState('Proceed to Payment');
  
  const { 
    cart, 
    totalAmount, 
    removeFromCart, 
    updateQuantity,
    getOrderSummary 
  } = useCart();

  const { subtotal, tax, deliveryFee, total } = getOrderSummary();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {!showPayment ? (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Order</h1>
          
          {/* Cart Items */}
          {cart.length > 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              {cart.map(item => (
                <div key={`${item._id}-${item.size}`} className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-gray-600">Size: {item.size}</p>
                      <p className="text-gray-600">₹{item.price} × {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id, item.size)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">Your cart is empty</p>
            </div>
          )}

          {/* Order Summary */}
          {cart.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                    onClick={() => setShowPayment(true)}
                    className="w-full bg-black text-white py-3 rounded-lg hover:bg-green-600 mt-4 transition-all duration-300"
                    onMouseEnter={() => setButtonText('Get your card ready captain...')}
                    onMouseLeave={() => setButtonText('Proceed to Payment')}
                  >
                    {buttonText}
                  </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
          <div className="mb-4">
            <p className="text-gray-600">Order ID: {orderId}</p>
            <p className="text-gray-600">Total Amount: ₹{total.toFixed(2)}</p>
          </div>
          <PaymentComponent orderId={orderId} />
          <button
            onClick={() => setShowPayment(false)}
            className="mt-4 text-blue-500 hover:text-blue-600"
          >
            Back to Order
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderPage;