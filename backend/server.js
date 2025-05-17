const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const cron = require("node-cron");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/authRoutes");

const Recipe = require("./models/Recipe");
const Ingredient = require("./models/Ingredient");
const MealPlan = require("./models/MealPlan");
const recipeRoutes = require("./routes/recipeRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const nutrition = require("./routes/nutrition");
const shoppingListRoutes = require("./routes/shoppingListRoutes");
const mealPlanRoutes = require("./routes/mealPlanRoutes");

const userRoutes = require("./routes/userRoutes");
const recognizeRoute = require("./routes/recognize");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ Parses form data
// Allow frontend to connect (CORS)
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/favorites", favoritesRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/nutrition", nutrition);
app.use("/uploads", express.static(path.join(__dirname, "uploads/profile")));
app.use("/api/shopping-list", shoppingListRoutes);
app.use("/api/meal-plan", mealPlanRoutes);

// 🟢 Serve Static Files (Uploaded Images)
app.use("/uploads", express.static("uploads/profile"));

// 🟢 Configure Multer for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// 🟢 User Model (Mongoose Schema)
const User = require("./models/User");

// 🟢 Upload Profile Picture Endpoint
app.post("/upload", upload.single("profileImage"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ profileImage: imageUrl });
});

// 🟢 Update User Profile Picture
app.post("/update-profile", async (req, res) => {
  const { userId, profileImage } = req.body;

  try {
    await User.findByIdAndUpdate(userId, { profileImage });
    res.json({ message: "Profile updated successfully!", profileImage });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
});

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to the Indian Recipe API! 🍛");
});

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Daily at midnight (00:00)
cron.schedule("0 0 * * *", async () => {
  console.log("Running daily recommendation refresh...");

  try {
    const users = await User.find();

    for (const user of users) {
      const favoriteCuisines = user.favorites
        .map((recipe) => recipe.cuisine)
        .filter(Boolean);
      const favoriteCategories = user.favorites
        .map((recipe) => recipe.category)
        .filter(Boolean);

      const newRecommendations = await Recipe.find({
        $or: [
          { cuisine: { $in: favoriteCuisines } },
          { category: { $in: favoriteCategories } },
        ],
        _id: { $nin: user.favorites },
      }).limit(10);

      // Optionally, save precomputed recommendations into User model:
      user.recommendations = newRecommendations.map((recipe) => recipe._id);
      await user.save();
    }
    console.log("Daily recommendations updated.");
  } catch (error) {
    console.error("Error updating recommendations:", error);
  }
});

app.use("/api/recipes", recipeRoutes);
app.use("/api/recognize", recognizeRoute);
