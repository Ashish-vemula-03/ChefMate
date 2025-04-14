import React, { useState, useEffect } from "react";
import axios from "../services/axios";
import "../styles/MainContent.css";

const MainContent = () => {
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

  if (loading) {
    return <div className="loading">Loading recipes...</div>;
  }

  return (
    <div className="main-content">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
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