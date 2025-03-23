const express = require("express");
const { validateToken } = require("../controllers/authController"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config(); // Load environment variables

const router = express.Router();
router.get("/validate", validateToken); // ✅ Route is correct
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Use .env for production

// 🔹 Register a new user
router.post("/register", async (req, res) => {
  try {
    console.log("Registering user:", req.body);  // <-- Add this
    const { username, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ username, email, password: hashedPassword });
    await user.save();

    console.log("User registered successfully!");
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in registration:", error);  // <-- Add this
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ 
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, email: user.email } 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
