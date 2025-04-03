const jwt = require("jsonwebtoken");
const mongoose = require("mongoose"); // ✅ Import mongoose
const User = require("../models/User"); // ✅ Import User model
require("dotenv").config(); // ✅ Load environment variables

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // ✅ Fallback for dev

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // ✅ Remove 'Bearer ' from the token if present
    const tokenValue = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
    console.log("Extracted Token:", tokenValue);

    // ✅ Verify token
    const decoded = jwt.verify(tokenValue, SECRET_KEY);
    console.log("Decoded Token:", decoded);

    // ✅ Ensure `decoded.userId` exists
    if (!decoded.userId) {
      return res.status(400).json({ message: "Invalid token structure." });
    }

    // ✅ Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(decoded.userId)) {
      console.error("Invalid userId format:", decoded.userId);
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // ✅ Find user in the database
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      console.error("User not found in database for ID:", decoded.userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User from Database:", user);

    // ✅ Attach user to `req`
    req.user = user; // ✅ This ensures `req.user._id` is set properly
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please log in again." });
    }

    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;