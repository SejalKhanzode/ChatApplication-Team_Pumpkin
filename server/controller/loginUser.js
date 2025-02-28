const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function loginController(request, response) {
    try {
        const { email, password } = request.body;

        // Check if user exists
        const user = await UserModel.findOne({ email });

        if (!user) {
            return response.status(400).json({
                message: "User does not exist",
                error: true,
            });
        }

        // Verify password
        const verifyPassword = await bcryptjs.compare(password, user.password);

        if (!verifyPassword) {
            return response.status(400).json({
                message: "Incorrect password",
                error: true,
            });
        }

        // Generate JWT token
        const tokenData = {
            id: user._id,
            email: user.email,
        };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Cookie options
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
        };

        // Send response
        return response
            .cookie("token", token, cookieOptions)
            .status(200)
            .json({
                message: "Login successful",
                token: token,
                success: true,
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name, 
                },
            });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
        });
    }
}

module.exports = loginController;
