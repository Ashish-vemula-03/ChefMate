// src/components/DashboardSidebar/MealPlanner.jsx
import React, { useState } from 'react';
import {
  FaCalendarAlt,
  FaPlus,
  FaUtensils,
  FaCog,
  FaTrash,
  FaInfoCircle,
} from 'react-icons/fa';
import CustomMealPlan from './CustomMealPlan';
import { getFoodItemsByCategory } from '../../data/foodItems';
import './MealPlanner.css';

const FoodItemModal = ({ item, position }) => {
  if (!item) return null;

  return (
    <div
      className="food-item-modal"
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      <div className="modal-header">
        <h4>{item.name}</h4>
        <p>{item.description}</p>
      </div>
      <div className="modal-content">
        <div className="nutrition-info">
          <h5>Nutrition Facts</h5>
          <div className="nutrition-grid">
            <div className="nutrition-item">
              <span>Calories</span>
              <span>{item.calories}</span>
            </div>
            <div className="nutrition-item">
              <span>Protein</span>
              <span>{item.protein}g</span>
            </div>
            <div className="nutrition-item">
              <span>Carbs</span>
              <span>{item.carbs}g</span>
            </div>
            <div className="nutrition-item">
              <span>Fats</span>
              <span>{item.fats}g</span>
            </div>
          </div>
        </div>
        <div className="ingredients-list">
          <h5>Ingredients</h5>
          <ul>
            {item.ingredients?.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="additional-nutrition">
          <h5>Additional Nutrition</h5>
          <div className="nutrition-details">
            <div className="vitamins">
              <span>Vitamins:</span>
              <span>{item.nutrition?.vitamins.join(', ')}</span>
            </div>
            <div className="minerals">
              <span>Minerals:</span>
              <span>{item.nutrition?.minerals.join(', ')}</span>
            </div>
            <div className="fiber">
              <span>Fiber:</span>
              <span>{item.nutrition?.fiber}</span>
            </div>
            <div className="sugar">
              <span>Sugar:</span>
              <span>{item.nutrition?.sugar}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MealPlanner = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [savedPlans, setSavedPlans] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const dietTemplates = [
    {
      id: 1,
      name: 'North Indian Plan',
      description:
        'Rich and flavorful North Indian cuisine with balanced nutrition',
      image:
        'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=60',
      calories: '2500-3000',
      macros: { protein: '25%', carbs: '55%', fats: '20%' },
      meals: {
        Breakfast: getFoodItemsByCategory('Breakfast').slice(0, 2),
        Lunch: getFoodItemsByCategory('Lunch').slice(0, 2),
        Dinner: getFoodItemsByCategory('Dinner').slice(0, 2),
        Snacks: getFoodItemsByCategory('Snacks').slice(0, 2),
      },
    },
    {
      id: 2,
      name: 'South Indian Plan',
      description:
        'Light and nutritious South Indian meals with rice and lentils',
      image:
        'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=60',
      calories: '2000-2500',
      macros: { protein: '20%', carbs: '60%', fats: '20%' },
      meals: {
        Breakfast: getFoodItemsByCategory('Breakfast').slice(1, 3),
        Lunch: getFoodItemsByCategory('Lunch').slice(1, 3),
        Dinner: getFoodItemsByCategory('Dinner').slice(1, 3),
        Snacks: getFoodItemsByCategory('Snacks').slice(1, 3),
      },
    },
    {
      id: 3,
      name: 'Vegetarian Plan',
      description: 'Complete vegetarian Indian meals with protein-rich options',
      image:
        'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=60',
      calories: '2200-2700',
      macros: { protein: '20%', carbs: '55%', fats: '25%' },
      meals: {
        Breakfast: getFoodItemsByCategory('Breakfast').slice(0, 2),
        Lunch: getFoodItemsByCategory('Lunch').slice(0, 2),
        Dinner: getFoodItemsByCategory('Dinner').slice(0, 2),
        Snacks: getFoodItemsByCategory('Snacks').slice(0, 2),
      },
    },
    {
      id: 4,
      name: 'Weight Loss Plan',
      description: 'Low-calorie Indian meals for healthy weight management',
      image:
        'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=60',
      calories: '1800-2200',
      macros: { protein: '30%', carbs: '45%', fats: '25%' },
      meals: {
        Breakfast: getFoodItemsByCategory('Breakfast').slice(1, 3),
        Lunch: getFoodItemsByCategory('Lunch').slice(1, 3),
        Dinner: getFoodItemsByCategory('Dinner').slice(1, 3),
        Snacks: getFoodItemsByCategory('Snacks').slice(1, 3),
      },
    },
    {
      id: 5,
      name: 'Muscle Gain Plan',
      description: 'Protein-rich Indian meals for muscle building',
      image:
        'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=60',
      calories: '2800-3200',
      macros: { protein: '35%', carbs: '45%', fats: '20%' },
      meals: {
        Breakfast: getFoodItemsByCategory('Breakfast').slice(0, 2),
        Lunch: getFoodItemsByCategory('Lunch').slice(0, 2),
        Dinner: getFoodItemsByCategory('Dinner').slice(0, 2),
        Snacks: getFoodItemsByCategory('Snacks').slice(0, 2),
      },
    },
    {
      id: 6,
      name: 'Balanced Diet Plan',
      description: 'Well-rounded Indian meals for overall health',
      image:
        'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=60',
      calories: '2000-2500',
      macros: { protein: '25%', carbs: '50%', fats: '25%' },
      meals: {
        Breakfast: getFoodItemsByCategory('Breakfast').slice(0, 2),
        Lunch: getFoodItemsByCategory('Lunch').slice(0, 2),
        Dinner: getFoodItemsByCategory('Dinner').slice(0, 2),
        Snacks: getFoodItemsByCategory('Snacks').slice(0, 2),
      },
    },
  ];

  const handleItemHover = (item, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoveredItem(item);
    setModalPosition({
      x: rect.right + 10,
      y: rect.top,
    });
  };

  const handleItemLeave = () => {
    setHoveredItem(null);
  };

  const handleUsePlan = (template) => {
    const newPlan = {
      id: Date.now(),
      name: template.name,
      description: template.description,
      calories: template.calories,
      macros: template.macros,
      meals: template.meals,
      isTemplate: true,
    };
    setSavedPlans([...savedPlans, newPlan]);
    setActiveTab('my-plans');
  };

  const handleDeletePlan = (planId) => {
    setSavedPlans(savedPlans.filter((plan) => plan.id !== planId));
  };

    return (
    <div className="meal-planner-container">
      {/* Navigation Bar */}
      <nav className="meal-planner-nav">
        <button
          className={`nav-item ${activeTab === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveTab('templates')}
        >
          <FaUtensils /> Templates
        </button>
        <button
          className={`nav-item ${activeTab === 'my-plans' ? 'active' : ''}`}
          onClick={() => setActiveTab('my-plans')}
        >
          <FaCalendarAlt /> My Plans
        </button>
        <button
          className={`nav-item ${activeTab === 'custom' ? 'active' : ''}`}
          onClick={() => setActiveTab('custom')}
        >
          <FaPlus /> Custom Plan
        </button>
        <button
          className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <FaCog /> Settings
        </button>
      </nav>

      {/* Main Content Area */}
      <div className="meal-planner-content">
        {activeTab === 'templates' && (
          <div className="templates-section">
            <h2>Diet Plan Templates</h2>
            <div className="templates-grid">
              {dietTemplates.map((template) => (
                <div key={template.id} className="template-card">
                  <div className="template-image">
                    <img src={template.image} alt={template.name} />
                  </div>
                  <div className="template-content">
                    <h3>{template.name}</h3>
                    <p>{template.description}</p>
                    <div className="template-macros">
                      <div className="macro">
                        <span>Calories</span>
                        <span>{template.calories}</span>
                      </div>
                      <div className="macro">
                        <span>Protein</span>
                        <span>{template.macros.protein}</span>
                      </div>
                      <div className="macro">
                        <span>Carbs</span>
                        <span>{template.macros.carbs}</span>
                      </div>
                      <div className="macro">
                        <span>Fats</span>
                        <span>{template.macros.fats}</span>
                      </div>
                    </div>
                    <div className="template-meals">
                      <h4>Sample Meals</h4>
                      {Object.entries(template.meals).map(
                        ([mealType, items]) => (
                          <div key={mealType} className="meal-items">
                            <h5>{mealType}</h5>
                            <ul>
                              {items.map((item, index) => (
                                <li
                                  key={index}
                                  className="meal-item"
                                  onMouseEnter={(e) => handleItemHover(item, e)}
                                  onMouseLeave={handleItemLeave}
                                >
                                  <div className="meal-item-image">
                                    <img src={item.image} alt={item.name} />
                                  </div>
                                  <div className="meal-item-info">
                                    <span className="meal-item-name">
                                      {item.name}
                                    </span>
                                    <span className="meal-item-calories">
                                      {item.calories} cal
                                    </span>
                                  </div>
                                  <FaInfoCircle className="info-icon" />
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      )}
                    </div>
                    <button
                      className="use-template-btn"
                      onClick={() => handleUsePlan(template)}
                    >
                      Use This Template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'my-plans' && (
          <div className="my-plans-section">
            <h2>My Meal Plans</h2>
            {savedPlans.length > 0 ? (
              <div className="saved-plans-grid">
                {savedPlans.map((plan) => (
                  <div key={plan.id} className="saved-plan-card">
                    <div className="plan-header">
                      <h3>{plan.name}</h3>
                      <button
                        className="delete-plan-btn"
                        onClick={() => handleDeletePlan(plan.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <p className="plan-description">{plan.description}</p>
                    <div className="plan-macros">
                      <div className="macro-item">
                        <span>Calories:</span>
                        <span>{plan.calories}</span>
                      </div>
                      <div className="macro-item">
                        <span>Protein:</span>
                        <span>{plan.macros.protein}</span>
                      </div>
                      <div className="macro-item">
                        <span>Carbs:</span>
                        <span>{plan.macros.carbs}</span>
                      </div>
                      <div className="macro-item">
                        <span>Fats:</span>
                        <span>{plan.macros.fats}</span>
                      </div>
                    </div>
                    <div className="plan-meals">
                      {Object.entries(plan.meals).map(([mealType, foods]) => (
                        <div key={mealType} className="meal-group">
                          <h4>{mealType}</h4>
                          <ul>
                            {foods.map((food, index) => (
                              <li key={index} className="meal-item">
                                <div className="meal-item-image">
                                  <img src={food.image} alt={food.name} />
                                </div>
                                <div className="meal-item-info">
                                  <span className="meal-item-name">
                                    {food.name}
                                  </span>
                                  <span className="meal-item-calories">
                                    {food.calories} cal
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>You haven't created any meal plans yet.</p>
                <p>Start by selecting a template or creating a custom plan!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'custom' && (
          <div className="custom-plan-section">
            <h2>Create Custom Meal Plan</h2>
            <CustomMealPlan
              selectedTemplate={selectedTemplate}
              onSavePlan={(plan) => {
                setSavedPlans([...savedPlans, { ...plan, id: Date.now() }]);
                setSelectedTemplate(null);
              }}
            />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-section">
            <h2>Meal Planner Settings</h2>
            <div className="settings-content">
              <div className="setting-group">
                <h3>Dietary Preferences</h3>
                <div className="setting-item">
                  <label>
                    <input type="checkbox" /> Vegetarian
                  </label>
                </div>
                <div className="setting-item">
                  <label>
                    <input type="checkbox" /> Vegan
                  </label>
                </div>
                <div className="setting-item">
                  <label>
                    <input type="checkbox" /> Gluten-Free
                  </label>
                </div>
              </div>

              <div className="setting-group">
                <h3>Daily Goals</h3>
                <div className="setting-item">
                  <label>Calories</label>
                  <input type="number" placeholder="e.g., 2000" />
                </div>
                <div className="setting-item">
                  <label>Protein (g)</label>
                  <input type="number" placeholder="e.g., 150" />
                </div>
                <div className="setting-item">
                  <label>Carbs (g)</label>
                  <input type="number" placeholder="e.g., 250" />
                </div>
                <div className="setting-item">
                  <label>Fats (g)</label>
                  <input type="number" placeholder="e.g., 70" />
                </div>
              </div>

              <div className="setting-group">
                <h3>Notifications</h3>
                <div className="setting-item">
                  <label>
                    <input type="checkbox" /> Meal Reminders
                  </label>
                </div>
                <div className="setting-item">
                  <label>
                    <input type="checkbox" /> Weekly Progress Reports
                  </label>
                </div>
              </div>

              <button className="save-settings-btn">Save Settings</button>
            </div>
          </div>
        )}
      </div>
      {hoveredItem && (
        <FoodItemModal item={hoveredItem} position={modalPosition} />
      )}
      </div>
    );
  };
  
  export default MealPlanner;
  