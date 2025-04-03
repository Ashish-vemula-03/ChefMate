const mongoose = require("mongoose");
const Recipe = require("./models/Recipe");
const fs = require("fs");
const path = require("path");

// Connect to MongoDB
mongoose.connect("mongodb+srv://apimate:apimate@api.u4z67.mongodb.net/?retryWrites=true&w=majority&appName=api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Database Connected"))
  .catch(err => console.error("❌ DB Connection Error:", err));

// Load JSON data (Ensure correct path)
const filePath = path.join(__dirname, "recipes.json");
if (!fs.existsSync(filePath)) {
  console.error("❌ Error: recipes.json file not found!");
  process.exit(1);
}

let fileContent = fs.readFileSync(filePath, "utf-8");

let recipes;
try {
  recipes = JSON.parse(fileContent);

  // ✅ Handle case where JSON contains an object with key "recipes"
  if (recipes.hasOwnProperty("recipes") && Array.isArray(recipes.recipes)) {
    recipes = recipes.recipes;
  } else if (!Array.isArray(recipes)) {
    throw new Error("recipes.json must contain an array!");
  }

} catch (error) {
  console.error("❌ JSON Parsing Error:", error.message);
  process.exit(1);
}

// ✅ Add Default Image or Validate Existing Image
recipes = recipes.map(recipe => ({
  ...recipe,
  image: recipe.image && recipe.image.trim() !== "" 
    ? recipe.image 
    : "https://via.placeholder.com/300.png?text=No+Image", // Default Image URL
}));

console.log("📄 Recipe Data Before Saving:", JSON.stringify(recipes, null, 2));

// Bulk Insert with Image Handling
const importData = async () => {
  try {
    await Recipe.insertMany(recipes);
    console.log("🎉 Recipes Imported Successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error:", error);
    mongoose.connection.close();
  }
};

// Run import function
importData();
