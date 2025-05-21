import React, { useState } from "react";
import axios from "axios";
import "./WhatsInMyKitchen.css";

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateRecipe = async (e) => {
    e.preventDefault();
    if (!ingredients.trim()) {
      setError("Please add some ingredients first!");
      return;
    }

    setLoading(true);
    setError(null);
    setRecipe(null); // Changed from setRecipes([]) to setRecipe(null)

    try {
      const ingredientsList = ingredients.split(",").map(i => i.trim()).filter(Boolean);
      const response = await axios.post("http://localhost:5000/api/recipes/generate", {
        ingredients: ingredientsList
      });
      
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      
      setRecipe(response.data); // Changed from setRecipes([response.data]) to setRecipe(response.data)
    } catch (err) {
      console.error('Error details:', err.response?.data || err.message);
      setError(err.response?.data?.error || "Failed to generate recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipe-generator">
      <form onSubmit={handleGenerateRecipe} className="recipe-form">
        <textarea
          className="ingredient-input"
          placeholder="Enter ingredients separated by commas (e.g., tomatoes, onions, chicken)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button type="submit" disabled={loading} className="generate-btn">
          {loading ? "Generating..." : "Generate Recipe"}
        </button>
      </form>

      {loading && <p className="loading-text">Creating your recipe...</p>}
      {error && <p className="error-text">{error}</p>}

      {recipe && (
        <div className="recipe-card">
          {recipe.imageUrl && (
            <div className="recipe-image">
              <img src={recipe.imageUrl} alt={recipe.title} />
            </div>
          )}
          <h3 className="recipe-title">{recipe.title}</h3>
          <div className="recipe-meta">
            <span className="meta-item">
              <i className="fas fa-globe"></i> {recipe.cuisine}
            </span>
            <span className="meta-item">
              <i className="fas fa-signal"></i> {recipe.difficulty}
            </span>
            <span className="meta-item">
              <i className="fas fa-clock"></i> Prep: {recipe.prepTime} mins
            </span>
            <span className="meta-item">
              <i className="fas fa-fire"></i> Cook: {recipe.cookTime} mins
            </span>
          </div>
          
          <div className="recipe-section">
            <h4 className="section-title">
              <i className="fas fa-list"></i> Ingredients
            </h4>
            <ul className="ingredients-list">
              {recipe.ingredients.map((item, i) => (
                <li key={i} className="ingredient-item">{item}</li>
              ))}
            </ul>
          </div>

          <div className="recipe-section">
            <h4 className="section-title">
              <i className="fas fa-tasks"></i> Instructions
            </h4>
            <ol className="instructions-list">
              {recipe.instructions.map((step, i) => (
                <li key={i} className="instruction-item">{step}</li>
              ))}
            </ol>
          </div>

          {recipe.nutrition && (
            <div className="nutrition-info">
              <h4 className="section-title">
                <i className="fas fa-heartbeat"></i> Nutrition Information
              </h4>
              <div className="nutrition-grid">
                <div className="nutrition-item">
                  <span className="nutrition-label">Calories:</span>
                  <span className="nutrition-value">{recipe.nutrition.calories}kcal</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Protein:</span>
                  <span className="nutrition-value">{recipe.nutrition.protein}g</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Fat:</span>
                  <span className="nutrition-value">{recipe.nutrition.fat}g</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Carbs:</span>
                  <span className="nutrition-value">{recipe.nutrition.carbs}g</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;
