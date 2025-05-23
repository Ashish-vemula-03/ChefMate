import React, { useState, useEffect } from "react";
import axios from "../services/axios";
import { Clock, ChevronDown } from "lucide-react";
import { FaHeart, FaRegHeart, FaSearch, FaFilter } from "react-icons/fa";
import "../styles/MainContent.css";

// Recipe Card
const RecipeCard = ({ recipe, isFavorite, onToggleFavorite, onClick }) => (
  <div className="recipe-card" onClick={() => onClick(recipe)}>
    <div style={{ position: "relative" }}>
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <button
        className={`favorite-btn ${isFavorite ? "active" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
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
const RecipeDetails = ({ recipe, onBack, onFavorite, isFavorite }) => (
  <div className="recipe-details-view">
    <div className="recipe-details-header">
      <button className="btn btn-back" onClick={onBack}>
        ← Back to recipes
      </button>
      <button
        className={`btn btn-favorite ${isFavorite ? "active" : ""}`}
        onClick={() => onFavorite(recipe)}
      >
        <FaHeart />
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>

    <h2 className="recipe-details-title">{recipe.title}</h2>

    <div className="recipe-details-image-container">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="recipe-details-image"
      />
    </div>

    <div className="recipe-details-content">
      <div className="recipe-info-section">
        <div className="recipe-meta">
          <div className="meta-item">
            <strong>Cuisine:</strong> {recipe.cuisine}
          </div>
          <div className="meta-item">
            <strong>Category:</strong> {recipe.category}
          </div>
          <div className="meta-item">
            <strong>Diet Type:</strong> {recipe.dietType}
          </div>
          <div className="meta-item">
            <strong>Meal Type:</strong> {recipe.mealType}
          </div>
          <div className="meta-item">
            <strong>Region:</strong> {recipe.mainCourseRegion}
          </div>
          <div className="meta-item">
            <strong>Prep Time:</strong> {recipe.prepTime} mins
          </div>
          <div className="meta-item">
            <strong>Cook Time:</strong> {recipe.cookTime} mins
          </div>
          <div className="meta-item">
            <strong>Servings:</strong> {recipe.servings}
          </div>
          <div className="meta-item">
            <strong>Difficulty:</strong> {recipe.difficulty}
          </div>
        </div>

        {recipe.description && (
          <div className="recipe-description">
            <h3>Description</h3>
            <p>{recipe.description}</p>
          </div>
        )}

        {recipe.nutrition && (
          <div className="nutrition-info">
            <h3>Nutrition Information</h3>
            <div className="nutrition-grid">
              <div className="nutrition-item">
                <span>Calories</span>
                <strong>{recipe.nutrition.calories} kcal</strong>
              </div>
              <div className="nutrition-item">
                <span>Protein</span>
                <strong>{recipe.nutrition.protein}g</strong>
              </div>
              <div className="nutrition-item">
                <span>Fat</span>
                <strong>{recipe.nutrition.fat}g</strong>
              </div>
              <div className="nutrition-item">
                <span>Carbs</span>
                <strong>{recipe.nutrition.carbs}g</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="recipe-ingredients">
        <h3>Ingredients</h3>
        <ul>
          {recipe.ingredients?.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
      </div>

      <div className="recipe-instructions">
        <h3>Instructions</h3>
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
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || "");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

  // Filter categories
  const filterCategories = [
    { label: "All", value: "" },
    { label: "Diet Type", options: [
      { label: "Veg", value: "category:veg" },
      { label: "Non-veg", value: "category:non-veg" },
      { label: "Balanced Diet", value: "dietType:balanced" },
      { label: "Low Diet", value: "dietType:low" },
      { label: "High Diet", value: "dietType:high" },
    ]},
    { label: "Region", options: [
      { label: "South-Indian", value: "mainCourseRegion:South" },
      { label: "North-Indian", value: "mainCourseRegion:North" },
      { label: "East-Indian", value: "mainCourseRegion:East" },
      { label: "West-Indian", value: "mainCourseRegion:West" },
    ]},
    { label: "Meal Type", options: [
      { label: "Breakfast/Tiffin", value: "mealType:breakfast" },
      { label: "Lunch", value: "mealType:lunch" },
      { label: "Dinner", value: "mealType:dinner" },
    ]},
  ];

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
    // Update local search query when prop changes
    setLocalSearchQuery(searchQuery || "");
  }, [searchQuery]);

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

  const handleSearchChange = (e) => {
    setLocalSearchQuery(e.target.value);
  };

  const handleFilterSelect = (filterValue) => {
    setSelectedFilter(filterValue);
    setShowFilterDropdown(false);
  };

  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  const displayedRecipes = showOnlyFavorites
    ? favorites
    : recipes.filter((recipe) => {
      // Text search filter
      const searchLower = localSearchQuery.toLowerCase();
      const matchesSearch = searchLower === "" || (
        recipe.title.toLowerCase().includes(searchLower) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(searchLower)
        ) ||
        recipe.cuisine?.toLowerCase().includes(searchLower) ||
        recipe.category?.toLowerCase().includes(searchLower)
      );

      // Category filter
      let matchesFilter = true;
      if (selectedFilter) {
        const [filterType, filterValue] = selectedFilter.split(':');
        
        switch(filterType) {
          case 'category':
            matchesFilter = recipe.category?.toLowerCase().includes(filterValue.toLowerCase());
            break;
          case 'dietType':
            matchesFilter = recipe.dietType?.toLowerCase().includes(filterValue.toLowerCase());
            break;
          case 'mainCourseRegion':
            matchesFilter = recipe.mainCourseRegion?.toLowerCase().includes(filterValue.toLowerCase());
            break;
          case 'mealType':
            matchesFilter = recipe.mealType?.toLowerCase().includes(filterValue.toLowerCase());
            break;
          default:
            matchesFilter = true;
        }
      }

      return matchesSearch && matchesFilter;
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

  // Otherwise, show list with search bar and filter dropdown
  return (
    <>
      <div className="search-container">
        <div className="search-filters">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search recipes, ingredients, cuisines..."
              value={localSearchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          
          <div className="filter-dropdown-container">
            <button 
              className="filter-button" 
              onClick={toggleFilterDropdown}
              aria-expanded={showFilterDropdown}
              aria-haspopup="true"
            >
              <FaFilter />
              <span>{selectedFilter ? filterCategories.flatMap(cat => cat.options || []).find(opt => opt.value === selectedFilter)?.label || "Filter" : "Filter"}</span>
              <ChevronDown size={16} />
            </button>
            
            {showFilterDropdown && (
              <div className="filter-dropdown">
                {filterCategories.map((category) => (
                  <div key={category.label} className="filter-category">
                    {category.label !== "All" ? (
                      <div className="filter-category-label">{category.label}</div>
                    ) : (
                      <div 
                        className={`filter-option ${selectedFilter === "" ? "active" : ""}`}
                        onClick={() => handleFilterSelect("")}
                      >
                        All Recipes
                      </div>
                    )}
                    
                    {category.options?.map((option) => (
                      <div 
                        key={option.value} 
                        className={`filter-option ${selectedFilter === option.value ? "active" : ""}`}
                        onClick={() => handleFilterSelect(option.value)}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
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
          <div className="no-recipes">No recipes found matching your criteria!</div>
        )}
      </div>
    </>
  );
};

export default MainContent;
