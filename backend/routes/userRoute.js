import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserData } from '../controllers/userController.js'; // Ensure the correct file path and extension

const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData); // GET request for fetching user data

export default userRouter;
