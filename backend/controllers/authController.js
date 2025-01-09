import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import transporter from "../config/nodeMailer.js";
import userModel from "../models/userModel.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!email || !password || !name) {
            return res.status(400).json({ 
                success: false, 
                message: "All fields are required" 
            });
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid email" 
            });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ 
                success: false, 
                message: "Email already exists" 
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 12);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        };

        // Send welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to our website",
            text: `Hello ${name}, welcome to our website.`  
        }

        await transporter.sendMail(mailOptions);

        // Set cookie in response
        res.cookie('jwt', token, {  // Changed cookie name to 'jwt'
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcryptjs.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie('jwt', token, {  // Changed cookie name to 'jwt'
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt', {  // Changed cookie name to 'jwt'
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            path: '/'
        });
        return res.json({ success: true, message: "Logged out" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const sendVerifyOtp = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        if (user.isAccountVerified) {
            return res.status(400).json({ success: false, message: "Account is already verified" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        user.verifyOtp = otp;
        user.verifyOtpExpiredAt = Date.now() + 5 * 60 * 1000; // 5 minutes
        await user.save();
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account Verification OTP",
            text: `Your account verification OTP is ${otp}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "OTP sent successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { otp } = req.body;
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.verifyOtp !== otp || user.verifyOtp === "") {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        if (user.verifyOtpExpiredAt < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP expired" });
        }

        user.isAccountVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpiredAt = 0;
        await user.save();

        res.status(200).json({ success: true, message: "Account verified successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const isAuthenticated = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,  // Ensure this matches the property name
                email: user.email
            }
        });
    } catch (error) {
        console.error("Auth Check Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const sendResetOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if(!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const user = await userModel.findOne({email});

        if(!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        user.resetOtp = otp;
        user.resetOtpExpiredAt = Date.now() + 5 * 60 * 1000; // 5 minutes
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Password Reset OTP",
            text: `Your password reset OTP is ${otp}`
        };

        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: "OTP sent successfully" });
    } catch (error) {        
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const {email, otp, newPassword} = req.body;

        if(!email || !otp || !newPassword) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const user = await userModel.findOne({email});
        if(!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if(user.resetOtp !== otp || user.resetOtp === "") {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        if(user.resetOtpExpiredAt < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP expired" });
        }

        const hashedPassword = await bcryptjs.hash(newPassword, 12);
        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpiredAt = 0;
        await user.save();

        return res.json({ success: true, message: "Password reset successfully" });
    }catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// export const adminLogin = async (req, res) => {
//     try{
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(400).json({ success: false, message: "All fields are required" });
//         }

//         if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
//             const token = jwt.sign(email+password, process.env.JWT_SECRET);

//             res.json({success: true, message: "Login successful", token});

//         }
//         else{
//             res.status(400).json({ success: false, message: "Invalid credentials" });
//         }


//     }catch(error){
//             console.error(error);
//             res.status(500).json({ success: false, message: "Internal Server Error" });
//         }

// }
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email, password }, process.env.JWT_SECRET, { expiresIn: '20h' });
      console.log('Token:', token);

      res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      res.json({ success: true, message: "Login successful", token });
    } else {
      res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};