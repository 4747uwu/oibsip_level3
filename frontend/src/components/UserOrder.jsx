import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const UserOrders = ({ userEmail }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useContext(AppContext);
  console.log(userData);

  useEffect(() => {
    fetchUserOrders();
  }, [userEmail]);
  console.log(userEmail);

  const fetchUserOrders = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${userEmail}`);
      const data = await response.json();
      console.log(data);
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-yellow-200 text-yellow-800',
      'Confirmed': 'bg-blue-200 text-blue-800',
      'Preparing': 'bg-purple-200 text-purple-800',
      'Out for Delivery': 'bg-orange-200 text-orange-800',
      'Delivered': 'bg-green-200 text-green-800'
    };
    return colors[status] || 'bg-gray-200 text-gray-800';
  };

  if (loading) return <div className="flex justify-center items-center p-6">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">My Orders</h2>
      <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">
        Looking back at how much you eat?{' '}
        <span className="text-red-600">{userData.name}!</span>
      </h2>
      <hr />

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6 flex-wrap">
                <div className="flex flex-col">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Order #{order.orderId}
                  </h3>
                  <p className="text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="space-y-6">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-md shadow-sm hover:bg-gray-100 transition-colors duration-300 flex-wrap"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg shadow-sm"
                      />
                      <div>
                        <p className="font-semibold text-gray-700">{item.title}</p>
                        <p className="text-sm text-gray-500">
                          Size: {item.size}, Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">₹{item.total.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-2 pt-4 border-t border-gray-300">
              <div className="space-y-4">
                <div className="flex justify-between ml-2 text-gray-700">
                  <span>Subtotal:</span>
                  <span className='mr-2'>₹{order.orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between ml-2 text-gray-700">
                  <span>Tax:</span>
                  <span className='mr-2'>₹{order.orderSummary.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between ml-2 text-gray-700">
                  <span>Delivery Fee:</span>
                  <span className='mr-2'>₹{order.orderSummary.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between ml-2  font-semibold text-gray-900 mt-2">
                  <span>Total:</span>
                  <span className='mr-2'>₹{order.orderSummary.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;
