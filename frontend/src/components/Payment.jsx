// import React, { useState } from 'react';
// import { useCart } from '../context/CartContext'; // Adjust path as needed

// const PaymentComponent = ({ orderId }) => {
//   const [paymentStatus, setPaymentStatus] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const { getOrderSummary, clearCart } = useCart();
//   const { total } = getOrderSummary();

//   const initializeRazorpay = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      
//       script.onerror = () => {
//         alert('Failed to load Razorpay SDK. Please disable ad blocker or try another browser.');
//         setPaymentStatus('Payment SDK Failed to Load');
//         resolve(false);
//       };
      
//       script.onload = () => resolve(true);
//       document.body.appendChild(script);
//     });
//   };

//   const handlePayment = async () => {
//     setIsLoading(true);
//     try {
//       const loaded = await initializeRazorpay();
//       if (!loaded) return;

//       const options = {
//         key: 'rzp_test_YBi5YVAPXcCN0U',
//         amount: Math.round(total * 100),
//         currency: 'INR',
//         name: 'Pizza App',
//         description: `Order #${orderId}`,
//         handler: function (response) {
//           handlePaymentSuccess(response);
//         },
//         prefill: {
//           name: 'Customer Name',
//           email: 'customer@example.com',
//           contact: '9999999999'
//         },
//         theme: {
//           color: '#F37254'
//         },
//         modal: {
//           ondismiss: function() {
//             setPaymentStatus('Payment Cancelled');
//             setIsLoading(false);
//           },
//           escape: true,
//           backdropclose: false
//         }
//       };

//       const paymentObject = new window.Razorpay(options);
//       paymentObject.on('payment.failed', function (response) {
//         setPaymentStatus(`Payment Failed: ${response.error.description}`);
//         setIsLoading(false);
//       });
//       paymentObject.open();
//     } catch (error) {
//       console.error('Payment error:', error);
//       setPaymentStatus('Payment Failed to Initialize');
//       setIsLoading(false);
//     }
//   };

//   const handlePaymentSuccess = (response) => {
//     try {
//       const paymentDetails = {
//         paymentId: response.razorpay_payment_id,
//         orderId: orderId,
//         amount: total,
//         timestamp: new Date().toISOString()
//       };
      
//       const payments = JSON.parse(localStorage.getItem('payments') || '[]');
//       payments.push(paymentDetails);
//       localStorage.setItem('payments', JSON.stringify(payments));
      
//       setPaymentStatus('Payment Successful');
//       clearCart();
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Error saving payment details:', error);
//     }
//   };

//   return (
//     <div className="payment-container">
//       <button 
//         onClick={handlePayment}
//         disabled={isLoading}
//         className={`w-full py-3 rounded-lg ${
//           isLoading 
//             ? 'bg-gray-400 cursor-not-allowed' 
//             : 'bg-blue-500 hover:bg-blue-600'
//         } text-white transition-colors`}
//       >
//         {isLoading ? 'Processing...' : `Pay Now ₹${Math.round(total)}`}
//       </button>
//       {paymentStatus && (
//         <p className={`mt-4 text-center ${
//           paymentStatus.includes('Success') ? 'text-green-600' : 
//           paymentStatus.includes('Failed') ? 'text-red-600' : 'text-orange-600'
//         }`}>
//           {paymentStatus}
//         </p>
//       )}
//     </div>
//   );
// };

// export default PaymentComponent;


// import React, { useState, useContext } from 'react';
// import { useCart } from '../context/CartContext';
// import { useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import { useEffect } from 'react';
// import axios from 'axios';

// const PaymentComponent = ({ orderId }) => {
//     const [userDetails, setUserDetails] = useState(null);
// useEffect(() => {
//   const fetchUserData = async () => {
//     try {
//       const userResponse = await axios.get('http://localhost:5000/api/user/data', {
//         withCredentials: true,
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         }
//       });

//       console.log('User data response:', userResponse.data);
//       setUserDetails(userResponse.data.userData); // Use the setter function directly
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };
//   fetchUserData();
// }, []);

// console.log('User data:', userDetails);
  
//   const [paymentStatus, setPaymentStatus] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const { getOrderSummary, clearCart, cart } = useCart();
//   const { total } = getOrderSummary();
//   const navigate = useNavigate();

//   const initializeRazorpay = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      
//       script.onerror = () => {
//         alert('Failed to load Razorpay SDK');
//         setPaymentStatus('Payment SDK Failed to Load');
//         resolve(false);
//       };
      
//       script.onload = () => resolve(true);
//       document.body.appendChild(script);
//     });
//   };

//   const createOrder = async (paymentDetails) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/orders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         credentials: 'include',
//         body: JSON.stringify({
//           user: "userorder",
//           items: cart,
//           orderSummary: getOrderSummary(),
//           paymentDetails: {
//             paymentId: paymentDetails.paymentId,
//             amount: paymentDetails.amount,
//             timestamp: paymentDetails.timestamp
//           },
//           status: 'Confirmed'
//         }),
//       });

//       if (response.ok) {
//         const order = await response.json();
//         return order;
//       }
//       throw new Error('Failed to create order');
//     } catch (error) {
//       console.error('Error creating order:', error);
//       throw error;
//     }
//   };

//   const handlePaymentSuccess = async (response) => {
//     try {
//       const paymentDetails = {
//         paymentId: response.razorpay_payment_id,
//         orderId: orderId,
//         amount: total,
//         timestamp: new Date().toISOString()
//       };

//       // Create order in database
//       const order = await createOrder(paymentDetails);
      
//       // Store payment details locally
//       const payments = JSON.parse(localStorage.getItem('payments') || '[]');
//       payments.push(paymentDetails);
//       localStorage.setItem('payments', JSON.stringify(payments));

//       setPaymentStatus('Payment Successful');
//       clearCart();
//       setIsLoading(false);

//       // Redirect to order status page
//       navigate(`/my-orders/${order.orderId}`);
//     } catch (error) {
//       console.error('Error processing payment:', error);
//       setPaymentStatus('Payment Successful but Order Creation Failed');
//     }
//   };

//   const handlePayment = async () => {
//     setIsLoading(true);
//     try {
//       const loaded = await initializeRazorpay();
//       if (!loaded) return;

//       const options = {
//         key: 'rzp_test_YBi5YVAPXcCN0U',
//         amount: Math.round(total * 100),
//         currency: 'INR',
//         name: 'Pizza App',
//         description: `Order #${orderId}`,
//         handler: handlePaymentSuccess,
//         prefill: {
//           name: userDetails.name,
//           email: userDetails.email,
          
//         },
//         theme: { color: '#F37254' },
//         modal: {
//           ondismiss: function() {
//             setPaymentStatus('Payment Cancelled');
//             setIsLoading(false);
//           },
//           escape: true,
//           backdropclose: false
//         }
//       };

//       const paymentObject = new window.Razorpay(options);
//       paymentObject.on('payment.failed', function (response) {
//         setPaymentStatus(`Payment Failed: ${response.error.description}`);
//         setIsLoading(false);
//       });
//       paymentObject.open();
//     } catch (error) {
//       console.error('Payment error:', error);
//       setPaymentStatus('Payment Failed to Initialize');
//       setIsLoading(false);
//     }
//   };

//   return (
    
//     <div className="payment-container">
//       <button 
//         onClick={handlePayment}
//         disabled={isLoading}
//         className={`w-full py-3 rounded-lg ${
//           isLoading 
//             ? 'bg-gray-400 cursor-not-allowed'
//             : 'bg-blue-500 hover:bg-blue-600'
//         } text-white transition-colors`}
//       >
//         {isLoading ? 'Processing...' : `Pay Now ₹${Math.round(total)}`}
//       </button>
//       {paymentStatus && (
//         <p className={`mt-4 text-center ${
//           paymentStatus.includes('Success') ? 'text-green-600' : 
//           paymentStatus.includes('Failed') ? 'text-red-600' : 'text-orange-600'
//         }`}>
//           {paymentStatus}
//         </p>
//       )}
//     </div>
//   );
// };

// export default PaymentComponent;



import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentComponent = ({ orderId }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { getOrderSummary, clearCart, cart } = useCart();
  const { total } = getOrderSummary();
  const navigate = useNavigate();

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onerror = () => {
        alert('Failed to load Razorpay SDK');
        setPaymentStatus('Payment SDK Failed to Load');
        resolve(false);
      };
      script.onload = () => resolve(true);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:5000/api/user/data', {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        setUserDetails(userResponse.data.userData);
        setFormData(prev => ({
          ...prev,
          name: userResponse.data.userData.name || '',
          email: userResponse.data.userData.email || ''
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createOrder = async (paymentDetails) => {
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          user: {
            name: formData.name,
            email: formData.email,
            address: formData.address,
            phone: formData.phone
          },
          items: cart.map(item => ({
            _id: item._id,
            title: item.title,
            imageUrl: item.imageUrl,
            size: item.size,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity
          })),
          orderSummary: getOrderSummary(),
          orderId: orderId,
          status: 'Confirmed',
          paymentDetails: {
            paymentId: paymentDetails.paymentId,
            amount: paymentDetails.amount,
            timestamp: paymentDetails.timestamp
          }
        }),
      });

      if (response.ok) {
        const order = await response.json();
        return order;
      }
      throw new Error('Failed to create order');
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const handlePaymentSuccess = async (response) => {
    try {
      const paymentDetails = {
        paymentId: response.razorpay_payment_id,
        orderId: orderId,
        amount: total,
        timestamp: new Date().toISOString()
      };

      const order = await createOrder(paymentDetails);

      const payments = JSON.parse(localStorage.getItem('payments') || '[]');
      payments.push(paymentDetails);
      localStorage.setItem('payments', JSON.stringify(payments));

      setPaymentStatus('Payment Successful');
      clearCart();
      setIsLoading(false);
      navigate('/my-orders');
    } catch (error) {
      console.error('Error processing payment:', error);
      setPaymentStatus('Payment Successful but Order Creation Failed');
    }
  };

  const handlePayment = async () => {
    if (!formData.name || !formData.email || !formData.address || !formData.phone) {
      setPaymentStatus('Please fill in all delivery details');
      return;
    }

    setIsLoading(true);
    try {
      const loaded = await initializeRazorpay();
      if (!loaded) return;

      const options = {
        key: 'rzp_test_YBi5YVAPXcCN0U',
        amount: Math.round(total * 100),
        currency: 'INR',
        name: 'Pizza App',
        description: `Order #${orderId}`,
        handler: handlePaymentSuccess,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: { color: '#F37254' },
        modal: {
          ondismiss: function() {
            setPaymentStatus('Payment Cancelled');
            setIsLoading(false);
          },
          escape: true,
          backdropclose: false
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        setPaymentStatus(`Payment Failed: ${response.error.description}`);
        setIsLoading(false);
      });
      paymentObject.open();
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('Payment Failed to Initialize');
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-container max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800">Enter Your Details</h2>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleFormChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleFormChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </form>

      <button
        onClick={handlePayment}
        disabled={isLoading}
        className={`w-full py-3 rounded-lg ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-blue-600'} text-white transition-colors`}
      >
        {isLoading ? 'Processing...' : `Pay Now ₹${Math.round(total)}`}
      </button>
      
      {paymentStatus && (
        <p className={`text-center text-sm mt-4 ${
          paymentStatus.includes('Success') ? 'text-green-600' : 
          paymentStatus.includes('Failed') ? 'text-red-600' : 'text-orange-600'
        }`}>
          {paymentStatus}
        </p>
      )}
    </div>
  );
};

export default PaymentComponent;
