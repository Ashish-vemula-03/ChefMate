import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaSearch, FaSave } from 'react-icons/fa';
import './CustomMealPlan.css';

const CustomMealPlan = ({ selectedTemplate, onSavePlan }) => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedMeal, setSelectedMeal] = useState('Breakfast');
  const [foodItems, setFoodItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFoodSearch, setShowFoodSearch] = useState(false);
  const [planName, setPlanName] = useState('');

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  useEffect(() => {
    if (selectedTemplate) {
      setPlanName(`${selectedTemplate.name} - Custom Plan`);
      // You can pre-populate food items based on the template here
    }
  }, [selectedTemplate]);

  const handleAddFood = (food) => {
    setFoodItems([...foodItems, { ...food, quantity: 100 }]);
    setShowFoodSearch(false);
    setSearchQuery('');
  };

  const handleQuantityChange = (index, value) => {
    const updatedItems = [...foodItems];
    updatedItems[index].quantity = value;
    setFoodItems(updatedItems);
  };

  const handleRemoveFood = (index) => {
    const updatedItems = foodItems.filter((_, i) => i !== index);
    setFoodItems(updatedItems);
  };

  const calculateTotalMacros = () => {
    return foodItems.reduce(
      (acc, item) => ({
        calories: acc.calories + (item.calories * item.quantity) / 100,
        protein: acc.protein + (item.protein * item.quantity) / 100,
        carbs: acc.carbs + (item.carbs * item.quantity) / 100,
        fats: acc.fats + (item.fats * item.quantity) / 100,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  };

  const handleSavePlan = () => {
    const totalMacros = calculateTotalMacros();
    const plan = {
      name: planName,
      calories: `${totalMacros.calories.toFixed(0)} cal`,
      macros: {
        protein: `${totalMacros.protein.toFixed(1)}g`,
        carbs: `${totalMacros.carbs.toFixed(1)}g`,
        fats: `${totalMacros.fats.toFixed(1)}g`,
      },
      foodItems,
      days: days.map((day) => ({
        day,
        meals: meals.map((meal) => ({
          meal,
          items: foodItems,
        })),
      })),
    };
    onSavePlan(plan);
  };

  return (
    <div className="custom-meal-plan">
      <div className="plan-header">
        <input
          type="text"
          className="plan-name-input"
          placeholder="Enter plan name..."
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
        />
        <button className="save-plan-btn" onClick={handleSavePlan}>
          <FaSave /> Save Plan
        </button>
      </div>

      <div className="plan-controls">
        <div className="day-selector">
          {days.map((day) => (
            <button
              key={day}
              className={`day-btn ${selectedDay === day ? 'active' : ''}`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="meal-selector">
          {meals.map((meal) => (
            <button
              key={meal}
              className={`meal-btn ${selectedMeal === meal ? 'active' : ''}`}
              onClick={() => setSelectedMeal(meal)}
            >
              {meal}
            </button>
          ))}
        </div>
      </div>

      <div className="meal-content">
        <div className="meal-header">
          <h3>
            {selectedMeal} for {selectedDay}
          </h3>
          <button
            className="add-food-btn"
            onClick={() => setShowFoodSearch(true)}
          >
            <FaPlus /> Add Food
          </button>
        </div>

        {showFoodSearch && (
          <div className="food-search">
            <div className="search-bar">
              <FaSearch />
              <input
                type="text"
                placeholder="Search for food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="search-results">
              {/* Food search results will be populated here */}
              <div
                className="food-item"
                onClick={() =>
                  handleAddFood({
                    name: 'Sample Food',
                    calories: 100,
                    protein: 10,
                    carbs: 20,
                    fats: 5,
                  })
                }
              >
                <span>Sample Food</span>
                <span>100 cal</span>
              </div>
            </div>
          </div>
        )}

        <div className="food-items">
          {foodItems.map((item, index) => (
            <div key={index} className="food-item-card">
              <div className="food-info">
                <h4>{item.name}</h4>
                <div className="food-macros">
                  <span>{item.calories} cal</span>
                  <span>P: {item.protein}g</span>
                  <span>C: {item.carbs}g</span>
                  <span>F: {item.fats}g</span>
                </div>
              </div>
              <div className="food-controls">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(index, parseInt(e.target.value))
                  }
                  className="quantity-slider"
                />
                <span className="quantity-value">{item.quantity}g</span>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveFood(index)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="meal-summary">
          <h4>Meal Summary</h4>
          <div className="summary-macros">
            <div className="macro-item">
              <span>Calories:</span>
              <span>{calculateTotalMacros().calories.toFixed(0)} cal</span>
            </div>
            <div className="macro-item">
              <span>Protein:</span>
              <span>{calculateTotalMacros().protein.toFixed(1)}g</span>
            </div>
            <div className="macro-item">
              <span>Carbs:</span>
              <span>{calculateTotalMacros().carbs.toFixed(1)}g</span>
            </div>
            <div className="macro-item">
              <span>Fats:</span>
              <span>{calculateTotalMacros().fats.toFixed(1)}g</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomMealPlan;
