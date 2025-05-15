import React, { useState, useEffect } from "react";
import axios from "../services/axios";
import { Clock } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../styles/MainContent.css";

// Recipe Card
const RecipeCard = ({ recipe, isFavorite, onToggleFavorite, onClick }) => (
  <div className="recipe-card" onClick={() => onClick(recipe)} style={{ cursor: "pointer" }}>
    <div style={{ position: "relative" }}>
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <button
        className="favorite-btn"
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          background: "none",
          border: "none",
          cursor: "pointer",
          color: isFavorite ? "#e74c3c" : "#aaa",
          fontSize: "1.5rem",
          zIndex: 2,
        }}
        onClick={e => {
          e.stopPropagation(); // Prevent card click
          onToggleFavorite(recipe);
        }}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
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

// Recipe Details View
const RecipeDetails = ({
  recipe,
  onBack,
  onFavorite,
  isFavorite
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      minHeight: "100vh",
      width: "100%",
    }}
  >
    <div
      className="recipe-details-view"
      style={{
        maxWidth: 600,
        width: "100%",
        background: "#222",
        borderRadius: 16,
        padding: 32,
        boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
        color: "#fff",
        margin: "40px 0",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back to recipes
        </button>
        <button
          className="btn btn-danger"
          onClick={() => onFavorite(recipe)}
          style={{ display: "flex", alignItems: "center", gap: 6 }}
        >
          <FaHeart style={{ color: isFavorite ? "#e74c3c" : "#fff" }} />
          {isFavorite ? "Remove Favorite" : "Add to Favorites"}
        </button>
      </div>
      <h2 style={{ marginBottom: 16, textAlign: "center" }}>{recipe.title}</h2>
      <img
        src={recipe.image}
        alt={recipe.title}
        style={{ width: "100%", maxWidth: 400, borderRadius: 12, margin: "0 auto 20px", display: "block" }}
      />
      <div style={{ margin: "1rem 0", textAlign: "left" }}>
        <strong>Cuisine:</strong> {recipe.cuisine} <br />
        <strong>Category:</strong> {recipe.category} <br />
        <strong>Prep Time:</strong> {recipe.prepTime} mins <br />
        <strong>Cook Time:</strong> {recipe.cookTime} mins <br />
        {recipe.description && (
          <>
            <strong>Description:</strong> {recipe.description} <br />
          </>
        )}
      </div>
      <div style={{ textAlign: "left" }}>
        <h4>Ingredients</h4>
        <ul>
          {recipe.ingredients?.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
        <h4>Instructions</h4>
        <ol>
          {recipe.instructions?.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
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

const MainContent = ({
  searchQuery,
  favorites = [],
  setFavorites = () => { },
  showOnlyFavorites = false,
}) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (recipe) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav._id === recipe._id);
      if (exists) {
        return prev.filter((fav) => fav._id !== recipe._id);
      } else {
        return [...prev, recipe];
      }
    });
  };

  const displayedRecipes = showOnlyFavorites
    ? favorites
    : recipes.filter((recipe) => {
      const searchLower = searchQuery?.toLowerCase() || "";
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

  // Show details if a recipe is selected
  if (selectedRecipe) {
    return (
      <div className="main-content">
        <RecipeDetails
          recipe={selectedRecipe}
          onBack={() => setSelectedRecipe(null)}
          onFavorite={handleToggleFavorite}
          isFavorite={favorites.some((fav) => fav._id === selectedRecipe._id)}
        />
      </div>
    );
  }

  // Otherwise, show list
  return (
    <div className="main-content">
      {displayedRecipes.length > 0 ? (
        displayedRecipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            isFavorite={favorites.some((fav) => fav._id === recipe._id)}
            onToggleFavorite={handleToggleFavorite}
            onClick={setSelectedRecipe}
          />
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
