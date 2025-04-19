import React, { useState } from "react";
import { Input, Button } from "antd"; // For simplicity, we will use Ant Design for UI components
import { PlusCircle, Trash2 } from "lucide-react"; // Icon for adding and removing ingredients
import "../../styles/WhatsInMyKitchen.css";

const WhatsInMyKitchen = () => {
  const [ingredient, setIngredient] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);

  // Function to handle adding ingredients
  const addIngredient = () => {
    if (ingredient.trim() !== "") {
      setIngredientsList([...ingredientsList, ingredient]);
      setIngredient(""); // Clear input after adding
    }
  };

  // Function to handle removing an ingredient
  const removeIngredient = (index) => {
    const updatedList = ingredientsList.filter((_, i) => i !== index);
    setIngredientsList(updatedList);
  };

  // Handle Enter key press for adding ingredient
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addIngredient();
    }
  };

  return (
    <div className="whats-in-my-kitchen">
      <h2>What's In My Kitchen</h2>

      {/* Ingredient Input Section */}
      <div className="ingredient-input">
        <Input
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add an ingredient"
          className="ingredient-input-field"
        />
        <Button
          onClick={addIngredient}
          icon={<PlusCircle size={20} />}
          className="add-ingredient-btn"
        >
          Add
        </Button>
      </div>

      {/* Ingredients List Section */}
      <div className="ingredient-list">
        <h3>Pantry Ingredients:</h3>
        <ul>
          {ingredientsList.map((ingredient, index) => (
            <li key={index} className="ingredient-item">
              <span>{ingredient}</span>
              <Button
                onClick={() => removeIngredient(index)}
                icon={<Trash2 size={16} />}
                className="remove-ingredient-btn"
                danger
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WhatsInMyKitchen;