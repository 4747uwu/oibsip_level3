// const express = require('express');
// const router = express.Router();
// const Ingredient = require('../models/CustomPizzaIngredients');
import express from 'express';
import Ingredient from '../models/CustomPizzaIngredients.js';

const router = express.Router();

// Get all ingredients
router.get('/ingredients', async (req, res) => {
  try {
    const ingredients = await Ingredient.find({ isAvailable: true });
    const categorizedIngredients = {
      bases: ingredients.filter(item => item.category === 'base'),
      sauces: ingredients.filter(item => item.category === 'sauce'),
      cheeses: ingredients.filter(item => item.category === 'cheese'),
      veggies: ingredients.filter(item => item.category === 'veggies')
    };
    res.json(categorizedIngredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get ingredients by category
router.get('/ingredients/:category', async (req, res) => {
  try {
    const ingredients = await Ingredient.find({ 
      category: req.params.category,
      isAvailable: true 
    });
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;