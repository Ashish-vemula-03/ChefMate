// src/data/foodItems.js
export const foodItems = [
  // Breakfast Items
  {
    id: 1,
    name: 'Masala Dosa',
    category: 'Breakfast',
    calories: 350,
    protein: 8,
    carbs: 65,
    fats: 5,
    image:
      'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=60',
    description: 'Crispy dosa with spiced potato filling and coconut chutney',
    ingredients: [
      'Rice flour',
      'Urad dal',
      'Potatoes',
      'Onions',
      'Spices',
      'Coconut chutney',
      'Sambar',
    ],
    nutrition: {
      vitamins: ['B1', 'B6', 'C'],
      minerals: ['Iron', 'Calcium', 'Potassium'],
      fiber: '3g',
      sugar: '2g',
    },
  },
  {
    id: 2,
    name: 'Poha',
    category: 'Breakfast',
    calories: 280,
    protein: 6,
    carbs: 55,
    fats: 4,
    image:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60',
    description: 'Flattened rice cooked with vegetables and mild spices',
    ingredients: [
      'Flattened rice',
      'Onions',
      'Peanuts',
      'Curry leaves',
      'Turmeric',
      'Mustard seeds',
      'Lemon juice',
    ],
    nutrition: {
      vitamins: ['B1', 'B3', 'B6'],
      minerals: ['Iron', 'Magnesium', 'Zinc'],
      fiber: '2g',
      sugar: '1g',
    },
  },
  {
    id: 3,
    name: 'Idli Sambar',
    category: 'Breakfast',
    calories: 250,
    protein: 10,
    carbs: 45,
    fats: 3,
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=60',
    description: 'Steamed rice cakes served with lentil soup',
  },

  // Lunch Items
  {
    id: 4,
    name: 'Butter Chicken',
    category: 'Lunch',
    calories: 650,
    protein: 35,
    carbs: 45,
    fats: 35,
    image:
      'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=60',
    description: 'Tender chicken in rich tomato and butter gravy',
  },
  {
    id: 5,
    name: 'Vegetable Biryani',
    category: 'Lunch',
    calories: 550,
    protein: 12,
    carbs: 95,
    fats: 15,
    image:
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60',
    description: 'Fragrant basmati rice with mixed vegetables and spices',
  },
  {
    id: 6,
    name: 'Rajma Chawal',
    category: 'Lunch',
    calories: 450,
    protein: 20,
    carbs: 75,
    fats: 8,
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=60',
    description: 'Red kidney beans curry with steamed rice',
  },

  // Dinner Items
  {
    id: 7,
    name: 'Palak Paneer',
    category: 'Dinner',
    calories: 400,
    protein: 25,
    carbs: 20,
    fats: 25,
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=60',
    description: 'Cottage cheese in spinach gravy',
  },
  {
    id: 8,
    name: 'Chole Bhature',
    category: 'Dinner',
    calories: 600,
    protein: 15,
    carbs: 85,
    fats: 25,
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=60',
    description: 'Spiced chickpeas with fried bread',
  },
  {
    id: 9,
    name: 'Dal Makhani',
    category: 'Dinner',
    calories: 350,
    protein: 18,
    carbs: 45,
    fats: 15,
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=60',
    description: 'Creamy black lentils with butter',
  },

  // Snacks
  {
    id: 10,
    name: 'Samosa',
    category: 'Snacks',
    calories: 250,
    protein: 5,
    carbs: 35,
    fats: 12,
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=60',
    description: 'Crispy pastry filled with spiced potatoes and peas',
  },
  {
    id: 11,
    name: 'Pakora',
    category: 'Snacks',
    calories: 200,
    protein: 8,
    carbs: 25,
    fats: 10,
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=60',
    description: 'Vegetable fritters in chickpea batter',
  },
  {
    id: 12,
    name: 'Dhokla',
    category: 'Snacks',
    calories: 180,
    protein: 12,
    carbs: 30,
    fats: 5,
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=60',
    description: 'Steamed savory cake made from fermented batter',
  },
];

// Additional food items for more variety
export const additionalFoodItems = [
  // Breakfast
  {
    id: 13,
    name: 'Upma',
    category: 'Breakfast',
    calories: 300,
    protein: 8,
    carbs: 50,
    fats: 8,
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=60',
    description: 'Semolina porridge with vegetables and spices',
  },
  {
    id: 14,
    name: 'Aloo Paratha',
    category: 'Breakfast',
    calories: 400,
    protein: 10,
    carbs: 60,
    fats: 15,
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=60',
    description: 'Stuffed flatbread with spiced potato filling',
  },

  // Lunch
  {
    id: 15,
    name: 'Paneer Butter Masala',
    category: 'Lunch',
    calories: 500,
    protein: 25,
    carbs: 35,
    fats: 30,
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=60',
    description: 'Cottage cheese in rich tomato and butter gravy',
  },
  {
    id: 16,
    name: 'Veg Pulao',
    category: 'Lunch',
    calories: 450,
    protein: 10,
    carbs: 80,
    fats: 12,
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=60',
    description: 'Fragrant rice with mixed vegetables and spices',
  },

  // Dinner
  {
    id: 17,
    name: 'Malai Kofta',
    category: 'Dinner',
    calories: 550,
    protein: 20,
    carbs: 45,
    fats: 35,
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=60',
    description: 'Vegetable dumplings in rich cream gravy',
  },
  {
    id: 18,
    name: 'Baingan Bharta',
    category: 'Dinner',
    calories: 300,
    protein: 8,
    carbs: 35,
    fats: 15,
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=60',
    description: 'Roasted eggplant curry with spices',
  },

  // Snacks
  {
    id: 19,
    name: 'Kachori',
    category: 'Snacks',
    calories: 280,
    protein: 6,
    carbs: 40,
    fats: 12,
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=60',
    description: 'Crispy pastry filled with spiced lentils',
  },
  {
    id: 20,
    name: 'Bhel Puri',
    category: 'Snacks',
    calories: 250,
    protein: 8,
    carbs: 45,
    fats: 8,
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=60',
    description: 'Puffed rice snack with vegetables and chutneys',
  },
];

export const getFoodItemsByCategory = (category) => {
  return [...foodItems, ...additionalFoodItems].filter(
    (item) => item.category === category
  );
};

export const getFoodItemsByCalories = (minCalories, maxCalories) => {
  return [...foodItems, ...additionalFoodItems].filter(
    (item) => item.calories >= minCalories && item.calories <= maxCalories
  );
};

export const getFoodItemsByMacros = (minProtein, minCarbs, minFats) => {
  return [...foodItems, ...additionalFoodItems].filter(
    (item) =>
      item.protein >= minProtein &&
      item.carbs >= minCarbs &&
      item.fats >= minFats
  );
};
