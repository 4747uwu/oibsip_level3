import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import ingredientRoutes from './routes/ingredientRoutes.js';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import Pizza from './models/Pizza.js';
import adminRoutes from './routes/admin.js'; // Import admin routes
import orderRoutes from './routes/orderRoutes.js';
import inventoryRoute from './routes/inventoryRoute.js';



const app = express();
const PORT = process.env.PORT || 6000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Frontend URL
  credentials: true,              // Allow cookies
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/api/pizzas', async (req, res) => {
  try {
    // const Pizza = require('./models/Pizza');
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/", (req, res) => { 
  res.send("Hello World!"); 
});

app.use('/api', ingredientRoutes);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use('/api/admin', adminRoutes);
app.use('/api', orderRoutes);
app.use('/api', inventoryRoute);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});