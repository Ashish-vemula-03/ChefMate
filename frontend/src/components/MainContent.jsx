import React, { useState, useEffect } from "react";
import axios from "../services/axios";
import { Clock } from "lucide-react";
import "../styles/MainContent.css";

const RecipeCard = ({ recipe }) => (
  <div className="recipe-card">
    <img src={recipe.image} alt={recipe.title} className="recipe-image" />
    <div className="recipe-details">
      <h3 className="recipe-title">{recipe.title}</h3>
      <div className="recipe-tags">
        <span className="recipe-cuisine">{recipe.cuisine}</span>
        <span className="recipe-category">{recipe.category}</span>
      </div>
      <p className="recipe-time">
        <Clock size={16} />
        <span>Prep: {recipe.prepTime} mins</span> |
        <span>Cook: {recipe.cookTime} mins</span>
      </p>
    </div>
  </div>
);

const LoadingSkeleton = () => (
  <div className="recipe-card skeleton">
    <div className="recipe-image skeleton-image" />
    <div className="recipe-details">
      <div className="skeleton-title" />
      <div className="skeleton-tags">
        <div className="skeleton-tag" />
        <div className="skeleton-tag" />
      </div>
      <div className="skeleton-time" />
    </div>
  </div>
);

const MainContent = ({ searchQuery }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("/recipes");
        setRecipes(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      recipe.title.toLowerCase().includes(searchLower) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchLower)
      ) ||
      recipe.cuisine.toLowerCase().includes(searchLower) ||
      recipe.category.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="main-content">
        {[...Array(6)].map((_, i) => (
          <LoadingSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="main-content">
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))
      ) : (
        <div className="no-recipes">
          No recipes found matching your search!
        </div>
      )}
    </div>
  );
};

export default MainContent;
