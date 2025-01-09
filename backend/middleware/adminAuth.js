import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    // console.log('Headers:', req.headers); // Log headers
    // console.log('Cookies:', req.cookies); // Log cookies

    const token = req.cookies.jwt || req.header('Authorization')?.replace('Bearer ', '');
    // console.log('Token:', token); // Log token

    if (!token) {
      return res.status(400).json({ message: "Invalid Authentication" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('Decoded Token:', decoded); // Log decoded token

    if (decoded.email !== process.env.ADMIN_EMAIL || decoded.password !== process.env.ADMIN_PASSWORD) {
      return res.status(400).json({ message: "Invalid Authentication" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Authentication Error:', error); // Log error
    return res.status(400).json({ message: "Invalid Authentication" });
  }
};

export default adminAuth;