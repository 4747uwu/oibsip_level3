import React, { useState, useEffect } from 'react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
       const token = localStorage.getItem('token');
    console.log('Token being sent:', token);

    if (!token) {
      throw new Error('No token found');
    }

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
      const response = await fetch('http://localhost:5000/api/admin/orders', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.trim()}`  // Add token
        }
      });

       if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch orders: ${errorText}`);
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        setOrders([]);
        return;
      }
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/orders/${orderId}`, {
        method: 'PATCH',
         headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Add token
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        fetchOrders(); // Refresh orders after update
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.orderId} className="border rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">Order #{order.orderId}</h3>
                <p className="text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
                <p className="mt-2">
                  <span className="font-medium">Customer:</span> {order.user.name}
                </p>
                <p><span className="font-medium">Email:</span> {order.user.email}</p>
                <p><span className="font-medium">Phone:</span> {order.user.phone}</p>
                <p><span className="font-medium">Address:</span> {order.user.address}</p>
              </div>
              <div className="text-right">
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                  className="border rounded p-2"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <p className="mt-2">
                  <span className="font-medium">Total:</span> ₹{order.orderSummary.total.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Order Items:</h4>
              <div className="grid gap-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover rounded" />
                      <div className="ml-4">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-600">
                          Size: {item.size}, Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p>₹{item.total.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;