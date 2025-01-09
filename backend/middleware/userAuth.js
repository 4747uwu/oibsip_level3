import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const userAuth = async (req, res, next) => {
    try {
        console.log('Cookies received:', req.cookies);
        const token = req.cookies.jwt;  // Changed to look for 'jwt' cookie
        console.log('Received token:', token);

        if (!token) {
            console.log('No token found in cookies');
            return res.status(401).json({
                success: false,
                message: "Please login to continue"
            });
        }

        try {
            // console.log('Verifying token...');
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Token verified:', decoded);
            req.userId = decoded.id;
            next();
        } catch (err) {
            console.error('Token verification failed:', err);
            res.clearCookie('jwt');  // Changed cookie name to 'jwt'
            return res.status(401).json({
                success: false,
                message: "Session expired, please login again"
            });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export default userAuth;