// src/components/DashboardSidebar/MealPlanner.jsx
import React, { useState } from 'react';
import { FaCalendarAlt, FaPlus, FaUtensils, FaCog } from 'react-icons/fa';
import CustomMealPlan from './CustomMealPlan';
import './MealPlanner.css';

const MealPlanner = () => {
  const [activeTab, setActiveTab] = useState('templates');

  const dietTemplates = [
    {
      id: 1,
      name: 'Weight Gain Plan',
      description: 'High-calorie, nutrient-rich meals for muscle building',
      image: '/images/weight-gain.jpg',
      calories: '3000-3500',
      macros: { protein: '30%', carbs: '45%', fats: '25%' },
    },
    {
      id: 2,
      name: 'Weight Loss Plan',
      description: 'Calorie-controlled meals for healthy weight loss',
      image: '/images/weight-loss.jpg',
      calories: '1800-2200',
      macros: { protein: '35%', carbs: '40%', fats: '25%' },
    },
    {
      id: 3,
      name: 'Keto Plan',
      description: 'High-fat, low-carb meals for ketosis',
      image: '/images/keto.jpg',
      calories: '2000-2500',
      macros: { protein: '20%', carbs: '5%', fats: '75%' },
    },
    {
      id: 4,
      name: 'Gym Plan',
      description: 'Performance-focused nutrition for athletes',
      image: '/images/gym.jpg',
      calories: '2500-3000',
      macros: { protein: '30%', carbs: '50%', fats: '20%' },
    },
    {
      id: 5,
      name: 'Muscle Gain Plan',
      description: 'Protein-rich meals for muscle growth',
      image: '/images/muscle-gain.jpg',
      calories: '2800-3200',
      macros: { protein: '35%', carbs: '45%', fats: '20%' },
    },
    {
      id: 6,
      name: 'Vegetarian Plan',
      description: 'Plant-based meals with complete nutrition',
      image: '/images/vegetarian.jpg',
      calories: '2000-2500',
      macros: { protein: '25%', carbs: '55%', fats: '20%' },
    },
    {
      id: 7,
      name: 'Non-Vegetarian Plan',
      description: 'Balanced meals with animal protein',
      image: '/images/non-veg.jpg',
      calories: '2200-2700',
      macros: { protein: '30%', carbs: '45%', fats: '25%' },
    },
    {
      id: 8,
      name: 'Balanced Diet Plan',
      description: 'Well-rounded meals for overall health',
      image: '/images/balanced.jpg',
      calories: '2000-2500',
      macros: { protein: '25%', carbs: '50%', fats: '25%' },
    },
  ];

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
                      <div className="macro-item">
                        <span>Calories:</span>
                        <span>{template.calories}</span>
                      </div>
                      <div className="macro-item">
                        <span>Protein:</span>
                        <span>{template.macros.protein}</span>
                      </div>
                      <div className="macro-item">
                        <span>Carbs:</span>
                        <span>{template.macros.carbs}</span>
                      </div>
                      <div className="macro-item">
                        <span>Fats:</span>
                        <span>{template.macros.fats}</span>
                      </div>
                    </div>
                    <button className="use-plan-btn">Use This Plan</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'my-plans' && (
          <div className="my-plans-section">
            <h2>My Meal Plans</h2>
            <div className="empty-state">
              <p>You haven't created any meal plans yet.</p>
              <p>Start by selecting a template or creating a custom plan!</p>
            </div>
          </div>
        )}

        {activeTab === 'custom' && (
          <div className="custom-plan-section">
            <h2>Create Custom Meal Plan</h2>
            <CustomMealPlan />
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
    </div>
  );
};

export default MealPlanner;
