// src/data/foodItems.js
export const foodItems = [
  // Breakfast Items
  {
    id: 1,
    name: 'Oatmeal with Banana',
    category: 'Breakfast',
    calories: 400,
    protein: 15,
    carbs: 70,
    fats: 8,
    image: '/images/food/oatmeal.jpg',
    description: 'Healthy oatmeal topped with fresh banana slices',
  },
  {
    id: 2,
    name: 'Greek Yogurt with Berries',
    category: 'Breakfast',
    calories: 250,
    protein: 20,
    carbs: 25,
    fats: 5,
    image: '/images/food/greek-yogurt.jpg',
    description: 'Creamy Greek yogurt with mixed berries',
  },
  {
    id: 3,
    name: 'Protein Shake',
    category: 'Breakfast',
    calories: 200,
    protein: 30,
    carbs: 10,
    fats: 2,
    image: '/images/food/protein-shake.jpg',
    description: 'Nutritious protein shake with fruits',
  },

  // Lunch Items
  {
    id: 4,
    name: 'Chicken Rice Bowl',
    category: 'Lunch',
    calories: 600,
    protein: 40,
    carbs: 80,
    fats: 15,
    image: '/images/food/chicken-rice.jpg',
    description: 'Grilled chicken with brown rice and vegetables',
  },
  {
    id: 5,
    name: 'Grilled Chicken Salad',
    category: 'Lunch',
    calories: 400,
    protein: 35,
    carbs: 20,
    fats: 15,
    image: '/images/food/chicken-salad.jpg',
    description: 'Fresh salad with grilled chicken breast',
  },
  {
    id: 6,
    name: 'Quinoa Bowl',
    category: 'Lunch',
    calories: 450,
    protein: 15,
    carbs: 70,
    fats: 12,
    image: '/images/food/quinoa-bowl.jpg',
    description: 'Protein-rich quinoa with vegetables',
  },

  // Dinner Items
  {
    id: 7,
    name: 'Salmon with Sweet Potato',
    category: 'Dinner',
    calories: 700,
    protein: 45,
    carbs: 60,
    fats: 25,
    image: '/images/food/salmon.jpg',
    description: 'Baked salmon with roasted sweet potato',
  },
  {
    id: 8,
    name: 'Baked Fish with Vegetables',
    category: 'Dinner',
    calories: 450,
    protein: 40,
    carbs: 30,
    fats: 15,
    image: '/images/food/baked-fish.jpg',
    description: 'Healthy baked fish with seasonal vegetables',
  },
  {
    id: 9,
    name: 'Vegetable Stir Fry',
    category: 'Dinner',
    calories: 400,
    protein: 15,
    carbs: 50,
    fats: 18,
    image: '/images/food/stir-fry.jpg',
    description: 'Colorful vegetable stir fry with tofu',
  },

  // Snacks
  {
    id: 10,
    name: 'Mixed Nuts',
    category: 'Snacks',
    calories: 300,
    protein: 10,
    carbs: 15,
    fats: 25,
    image: '/images/food/mixed-nuts.jpg',
    description: 'Healthy mix of nuts and seeds',
  },
  {
    id: 11,
    name: 'Protein Bar',
    category: 'Snacks',
    calories: 250,
    protein: 20,
    carbs: 25,
    fats: 8,
    image: '/images/food/protein-bar.jpg',
    description: 'High-protein energy bar',
  },
  {
    id: 12,
    name: 'Fruit Smoothie',
    category: 'Snacks',
    calories: 200,
    protein: 5,
    carbs: 40,
    fats: 2,
    image: '/images/food/smoothie.jpg',
    description: 'Refreshing fruit smoothie',
  },
];

export const getFoodItemsByCategory = (category) => {
  return foodItems.filter((item) => item.category === category);
};

export const getFoodItemsByCalories = (minCalories, maxCalories) => {
  return foodItems.filter(
    (item) => item.calories >= minCalories && item.calories <= maxCalories
  );
};

export const getFoodItemsByMacros = (minProtein, minCarbs, minFats) => {
  return foodItems.filter(
    (item) =>
      item.protein >= minProtein &&
      item.carbs >= minCarbs &&
      item.fats >= minFats
  );
};
