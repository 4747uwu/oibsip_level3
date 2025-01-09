import express from 'express';
import Pizza from '../models/Pizza.js';
import adminAuth from '../middleware/adminAuth.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// Add new pizza
router.post('/pizzas',adminAuth,  async (req, res) => {
  try {
    const pizza = new Pizza(req.body);
    await pizza.save();
    res.status(201).json(pizza);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all pizzas
router.get('/pizzas', adminAuth, async (req, res) => {
  try {
    const pizzas = await Pizza.find().sort({ createdAt: -1 });
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

 // Update pizza
router.put('/pizzas/:id', adminAuth, async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(pizza);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete pizza
router.delete('/pizzas/:id', adminAuth, async (req, res) => {
  try {
    await Pizza.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pizza deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});  

export default router;