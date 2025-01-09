import User from "../models/userModel.js"; // Ensure the correct file path and extension

export const getUserData = async (req, res) => {
	try {
		const user = await User.findById(req.userId);
		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}
		res.status(200).json({ success: true, userData: {
                name: user.username,
                email: user.email,
                isAccountVerified: user.isAccountVerified
        } });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};

export const updateUserData = async (req, res) => {
	try {
		const { name } = req.body;
		const user = await User.findById(req.userId);
		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}
		user.username = name || user.username;
		await user.save();
		res.status(200).json({ success: true, message: "User data updated successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};