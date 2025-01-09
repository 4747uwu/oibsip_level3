import express from 'express';
import Order from '../models/Order.js';
import adminAuth from '../middleware/adminAuth.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// Create new order
router.post('/orders', async (req, res) => {
  try {
    console.log("Request Body:", req.body); 
    const orderId = 'ORD' + Date.now();
    const order = new Order({ ...req.body, orderId });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
     console.error("Error creating order:", error); 
    res.status(400).json({ message: error.message });
  }
});

// Get all orders (admin)
// router.get('/admin/orders', adminAuth, async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get user orders
// router.get('/orders/:email', async (req, res) => {
//   try {
//     const orders = await Order.find({ 'user.email': req.params.email }).sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Get all orders (admin)
router.get('/admin/orders', userAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found." });
    }
    res.json(orders);
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get user orders
router.get('/orders/:email', async (req, res) => {
  try {
    const email = req.params.email;

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    const orders = await Order.find({ 'user.email': email }).sort({ createdAt: -1 });
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user." });
    }
    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: error.message });
  }
});


// Update order status (admin)
router.patch('/admin/orders/:orderId', adminAuth, async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { status: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;