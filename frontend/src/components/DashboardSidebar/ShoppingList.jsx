// src/components/DashboardSidebar/ShoppingList.jsx
import React, { useState, useEffect } from "react";
import { Check, Trash2, RefreshCw, Trash, Loader2 } from "lucide-react";
import {
  getShoppingList,
  removeFromShoppingList,
  removeRecipeFromShoppingList,
  updateShoppingListItem,
} from "../../services/dashboardService";
import "../../styles/ShoppingList.css";
import { toast } from "react-hot-toast";

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingRecipe, setDeletingRecipe] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchShoppingList = async () => {
    try {
      setLoading(true);
      setRefreshing(true);
      console.log("Fetching shopping list...");
      const response = await getShoppingList();
      console.log("Shopping list response:", response.data);
      setShoppingList(response.data.items || []);
      console.log(
        "Shopping list items count:",
        (response.data.items || []).length
      );
      setError(null);
    } catch (error) {
      console.error("Error fetching shopping list:", error);
      setError("Failed to fetch shopping list");
      setShoppingList([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchShoppingList();
  }, []);

  const handleToggleItem = async (itemId, currentStatus) => {
    try {
      console.log("Toggling item:", itemId, "Current status:", currentStatus);
      await updateShoppingListItem(itemId, { added: !currentStatus });
      fetchShoppingList();
    } catch (error) {
      console.error("Error updating item:", error);
      setError("Failed to update item");
      toast.error("Failed to update item");
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      console.log("Removing item:", itemId);
      await removeFromShoppingList(itemId);
      fetchShoppingList();
      toast.success("Item removed from shopping list");
    } catch (error) {
      console.error("Error removing item:", error);
      setError("Failed to remove item");
      toast.error("Failed to remove item");
    }
  };

  const handleRemoveRecipe = async (recipeId, recipeName) => {
    try {
      setDeletingRecipe(recipeId);
      console.log("Removing all items for recipe:", recipeId);

      const response = await removeRecipeFromShoppingList(recipeId);
      console.log("Remove recipe response:", response.data);

      toast.success(`Removed all ingredients from ${recipeName}`);
      fetchShoppingList();
    } catch (error) {
      console.error("Error removing recipe items:", error);
      setError("Failed to remove recipe items");
      toast.error("Failed to remove recipe items");
    } finally {
      setDeletingRecipe(null);
    }
  };

  if (loading) {
    return (
      <div className="shopping-list-container">
        <div className="loading-state">
          <Loader2 className="animate-spin mr-2" size={20} />
          Loading shopping list...
        </div>
      </div>
    );
  }

  return (
    <div className="shopping-list-container">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Shopping List
          </h2>
          <button
            onClick={fetchShoppingList}
            className="refresh-btn"
            disabled={refreshing}
            aria-label="Refresh shopping list"
          >
            {refreshing ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <RefreshCw size={16} />
            )}
          </button>
        </div>
        {error && <div className="error-message mt-2">{error}</div>}
      </div>

      {shoppingList.length === 0 ? (
        <div className="empty-state">
          <p>Your shopping list is empty.</p>
          <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
            Add ingredients from recipes to get started.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto flex-1">
          {shoppingList.map((recipe) => (
            <div
              key={recipe.recipeId || recipe.recipeName}
              className="recipe-items p-4"
            >
              <div className="recipe-header">
                <h3 className="font-medium">{recipe.recipeName}</h3>
                <div className="recipe-actions">
                  <button
                    onClick={() =>
                      handleRemoveRecipe(recipe.recipeId, recipe.recipeName)
                    }
                    disabled={deletingRecipe === recipe.recipeId}
                    className="delete-recipe-btn"
                    aria-label={`Remove all items from ${recipe.recipeName}`}
                    title="Remove all items from this recipe"
                  >
                    {deletingRecipe === recipe.recipeId ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <Trash size={16} />
                    )}
                  </button>
                </div>
              </div>
              <ul className="space-y-2 mt-3">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient._id} className="ingredient-item">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleToggleItem(ingredient._id, ingredient.added)
                          }
                          className={`checkbox-custom ${
                            ingredient.added ? "checked" : ""
                          }`}
                          aria-label={`Mark ${ingredient.name} as ${
                            ingredient.added ? "not bought" : "bought"
                          }`}
                        >
                          <Check
                            size={14}
                            className={`${
                              ingredient.added ? "text-white" : "hidden"
                            }`}
                          />
                        </button>
                        <span
                          className={`text-sm ${
                            ingredient.added
                              ? "line-through text-gray-400 dark:text-gray-500"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {ingredient.name}{" "}
                          {ingredient.quantity !== "1"
                            ? `- ${ingredient.quantity}`
                            : ""}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(ingredient._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${ingredient.name} from shopping list`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
