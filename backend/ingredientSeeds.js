import mongoose from 'mongoose';
import Ingredient from './models/CustomPizzaIngredients.js';
import connectDB from './config/db.js';

const ingredients = [
  // Bases
  { name: "Thin Crust", price: 99, imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/iklja3bmxhtstzyisco2", category: "base" },
  { name: "Thick Crust", price: 119, imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/fjvbf1cunp3m39rgw36c", category: "base" },
  { name: "Cheese Burst", price: 99, imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/kcqq7zwbn95vjnzawov2", category: "base" },
  { name: "Stuffed Crust", price: 149, imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/gmdwfhktmeqgnadu2lp9", category: "base" },
  { name: "Whole Wheat", price: 199, imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/anqhl5homqzq43kf2rq6", category: "base" },

  // Sauces
  { name: "Tomato Basil", price: 99, imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/buxodpctwikniev4ukxn", category: "sauce" },
  { name: "Alfredo", price: 49, imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/lxigckvuylwux0tflied", category: "sauce" },
  { name: "Barbecue", price: 49, imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/j1mghsr95sx6zbrnp3ua", category: "sauce" },
  { name: "Pesto", price: 39, imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/ksiswkba07i3zqdb9hsf", category: "sauce" },
  { name: "Spicy Marinara", price: 99, imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/ffwzvyjqsbqonszxur2y", category: "sauce" },

  // Cheeses
  { name: "Mozzarella", price: 99, imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/e962cohnpd4imnivoqlk", category: "cheese" },
  { name: "Cheddar", price: 119, imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/ciiitjh00cdw8fes847m", category: "cheese" },
  { name: "Parmesan", price: 99, imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/d8alyvyumgvwbmwx7e9j", category: "cheese" },
  { name: "Provolone", price: 199, imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/o96kargsjgb3lxyagcpx", category: "cheese" },
  { name: "Ricotta", price: 299, imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/ttjjjfbbsbetvophldu0", category: "cheese" },

  // Veggies
    { name: "Mushrooms", price: 99, imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/kvlkae7kiet1hgfx6clj", category: "veggies" },
  { name: "Bell Peppers", price: 49, imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/mc8zsvliats7hmwqddwl", category: "veggies" },
  { name: "Onions", price: 69, imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/oz51j4lwf81z5hpy6wwc", category: "veggies" },
  { name: "Olives", price: 69, imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/djtjifyv1xd6cz0hw2xm", category: "veggies" },
  { name: "Spinach", price: 79, imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/gvkwrpeynqza3gxrvlvb", category: "veggies" }
];

const seedIngredients = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing data
    await Ingredient.deleteMany({});
    console.log('Cleared existing ingredients');

    // Insert new data
    await Ingredient.insertMany(ingredients);
    console.log('Ingredients seeded successfully');

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding ingredients:', error);
    process.exit(1);
  }
};

// Execute seeding if file is run directly
// if (require.main === module) {

// }

// module.exports = seedIngredients;
  seedIngredients();
