import mongoose from 'mongoose';
import Pizza from './models/Pizza.js';
import connectDB from './config/db.js';

const pizzaData = [
  {
    title: "Margherita",
    description: "Classic Margherita with fresh mozzarella and basil",
    calories: {
      small: 800,
      medium: 1100,
      large: 1400,
    },
    prices: {
      small: 199,
      medium: 299,
      large: 399,
    },
    imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/gzuqntupqr2myfiogctw",
    isVeg: true,
  },
  {
    title: "Pepperoni",
    description: "Loaded with spicy pepperoni and extra mozzarella",
    calories: {
      small: 950,
      medium: 1300,
      large: 1700,
    },
    prices: {
      small: 249,
      medium: 369,
      large: 469,
    },
    imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/bd50g63315hauvow9txi",
    isVeg: false,
  },
  {
    title: "BBQ Chicken",
    description: "Grilled chicken with BBQ sauce and mozzarella",
    calories: {
      small: 1000,
      medium: 1350,
      large: 1800,
    },
    prices: {
      small: 259,
      medium: 379,
      large: 479,
    },
    imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/tkzncnh78xn1okegnduo",
    isVeg: false,
  },
  {
    title: "Veggie Supreme",
    description: "Mushrooms, olives, bell peppers, and onions",
    calories: {
      small: 850,
      medium: 1200,
      large: 1500,
    },
    prices: {
      small: 219,
      medium: 329,
      large: 429,
    },
    imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/jp6itceukvtfxa0lnyzq",
    isVeg: true,
  },
  {
    title: "Paneer Tikka",
    description: "Spicy paneer tikka with veggies and a tikka sauce",
    calories: {
      small: 900,
      medium: 1250,
      large: 1600,
    },
    prices: {
      small: 229,
      medium: 349,
      large: 449,
    },
    imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/tbd0kovkj15bhbp4xsj9",
    isVeg: true,
  },
  {
    title: "Hawaiian",
    description: "Ham and pineapple on a cheesy base",
    calories: {
      small: 950,
      medium: 1300,
      large: 1700,
    },
    prices: {
      small: 239,
      medium: 359,
      large: 459,
    },
    imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/hawaiannPizza",
    isVeg: false,
  },
  {
    title: "Cheese Pizza",
    description: "Extra cheesy goodness with mozzarella and cheddar",
    calories: {
      small: 850,
      medium: 1150,
      large: 1450,
    },
    prices: {
      small: 199,
      medium: 299,
      large: 399,
    },
    imageUrl: "https://res.cloudinary.com/darcn1hgn/image/upload/f_auto,q_auto/b3sisprktlbv6ymkhjkn",
    isVeg: true,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    await Pizza.deleteMany({}); // Clear the existing data
    await Pizza.insertMany(pizzaData); // Insert new data
    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
