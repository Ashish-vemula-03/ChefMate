import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js"; 

// ✅ Register a New User
export const register = async (req, res) => {
  try {
    const { username, email, password, mobile } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or Mobile already registered" });
    }

    console.log("📌 Registering user:", { username, email });

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword, mobile });
    await newUser.save();

    console.log("✅ User registered successfully!");
    res.status(201).json({ message: "User registered successfully!" });

  } catch (error) {
    console.error("❌ Register Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "fallback_secret_key",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user: { id: user._id, username: user.username, email: user.email, profilePicture: user.profilePicture },
    });

  } catch (error) {
    console.error("❌ Login Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Validate Token


export const validateToken = (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ valid: false, message: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ valid: false, message: "Invalid or expired token" });
  }
};

export const updateProfilePicture = async (req, res) => {
  try {
    const { userId } = req.params; // Get the user ID from URL
    const { profilePicture } = req.body; // Get the new profile picture URL

    // ✅ Find the user and update the profile picture
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture },
      { new: true } // ✅ Return the updated user data
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ Profile picture updated:", user.profilePicture);
    res.status(200).json({ message: "Profile updated", user });
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


