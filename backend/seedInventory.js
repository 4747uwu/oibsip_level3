import mongoose from 'mongoose';
import Inventory from './models/Inventory.js';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
 // Update the path as needed

const seedData = [
  {
    name: 'Pizza Base',
    quantity: 50,
    unit: 'units',
    threshold: 10,
  },
  {
    name: 'Tomato Sauce',
    quantity: 20,
    unit: 'liters',
    threshold: 5,
  },
  {
    name: 'Mozzarella Cheese',
    quantity: 15,
    unit: 'kg',
    threshold: 5,
  },
  {
    name: 'Bell Peppers',
    quantity: 10,
    unit: 'kg',
    threshold: 2,
  },
  {
    name: 'Mushrooms',
    quantity: 8,
    unit: 'kg',
    threshold: 3,
  },
  {
    name: 'Olives',
    quantity: 12,
    unit: 'kg',
    threshold: 3,
  },
  {
    name: 'Onions',
    quantity: 25,
    unit: 'kg',
    threshold: 5,
  },
  {
    name: 'Jalapenos',
    quantity: 5,
    unit: 'kg',
    threshold: 2,
  },
  {
    name: 'Pepperoni',
    quantity: 30,
    unit: 'kg',
    threshold: 10,
  },
  {
    name: 'Chicken',
    quantity: 20,
    unit: 'kg',
    threshold: 7,
  },
];

const seedInventory = async () => {
  try {
    await connectDB();


    console.log('Connected to database');

    await Inventory.deleteMany(); // Clear existing data
    console.log('Cleared existing inventory');

    const created = await Inventory.insertMany(seedData);
    console.log('Seeded inventory:', created);

    process.exit();
  } catch (error) {
    console.error('Error seeding inventory:', error);
    process.exit(1);
  }
};

seedInventory();
