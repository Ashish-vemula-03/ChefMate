import React, { useState, useEffect } from "react";
import axios from "../services/axios";
import "../styles/MainContent.css";

const MainContent = ({ searchQuery }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("/recipes"); // Fetch recipes from the backend
        setRecipes(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Filter recipes based on the search query
  const filteredRecipes = recipes.filter((recipe) => {
    return (
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (loading) {
    return <div className="loading">Loading recipes...</div>;
  }

  return (
    <div className="main-content">
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
          <div className="recipe-card" key={recipe._id}>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="recipe-image"
            />
            <div className="recipe-details">
              <h3 className="recipe-title">{recipe.title}</h3>
              <p className="recipe-cuisine">{recipe.cuisine}</p>
              <p className="recipe-category">{recipe.category}</p>
              <p className="recipe-time">
                Prep Time: {recipe.prepTime} mins | Cook Time: {recipe.cookTime} mins
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="no-recipes">No recipes found!</div>
      )}
    </div>
  );
};

export default MainContent;
