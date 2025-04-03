const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const User = require("../models/User"); // ✅ Ensure it's imported correctly
const authMiddleware = require("../middlewares/authMiddleware");
const { updateProfilePicture }  = require("../controllers/authController"); // ✅ Ensure the controller is imported correctly

const router = express.Router();

/**
 * ✅ Add a Recipe to Favorites
 */
router.post("/favorites/:recipeId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const recipeId = req.params.recipeId;

    // Check if already in favorites
    if (user.favorites.includes(recipeId)) {
      return res.status(400).json({ success: false, message: "Recipe already in favorites" });
    }

    user.favorites.push(recipeId);
    await user.save();

    res.status(200).json({ success: true, message: "Recipe added to favorites!", favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * ✅ Remove a Recipe from Favorites
 */
router.delete("/favorites/:recipeId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const recipeId = req.params.recipeId.toString();

    user.favorites = user.favorites.filter((id) => id.toString() !== recipeId);

    await user.save();
    res.status(200).json({ success: true, message: "Recipe removed from favorites!", favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * ✅ Get All Favorite Recipes
 */
router.get("/favorites", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * ✅ Update User Profile (Fixed Duplicate)
 */
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { username, email, mobile } = req.body;
    const userId = req.user.id; // ✅ Consistent use of req.user.id

    // ✅ Update user in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, mobile },
      { new: true }
    );

    res.json(updatedUser); // ✅ Send updated data back to frontend
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
});

// 🔹 Ensure 'uploads/' directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 🔹 Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // ✅ Ensures 'uploads/' exists before saving files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

/**
 * ✅ Upload Profile Picture
 */
router.post("/upload-profile-picture", authMiddleware, upload.single("profilePicture"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const user = await User.findById(req.user.id); // ✅ Ensure req.user.id is used

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profilePicture = `http://localhost:5000/uploads/${req.file.filename}`;
    await user.save();

    res.status(200).json({ profilePicture: user.profilePicture });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ✅ Update Profile Picture Route (Moved Below Initialization)
 */
router.put("/profile-picture/:userId", updateProfilePicture); // ✅ Fixed position

module.exports = router;
