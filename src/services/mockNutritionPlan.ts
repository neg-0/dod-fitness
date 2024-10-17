import { NutritionPlan, NutritionPlanRequest } from '../api';

export const generateMockNutritionPlan = (request: NutritionPlanRequest): NutritionPlan => {
  const dailyCalories = getDailyCalories(request.goal);

  return {
    id: '1',
    dailyCalories,
    macronutrients: calculateMacronutrients(dailyCalories, request.goal),
    meals: generateMeals(dailyCalories, request.dietaryRestrictions),
  };
};

const getDailyCalories = (goal: string): number => {
  switch (goal) {
    case 'weight_loss':
      return 1800;
    case 'muscle_gain':
      return 2800;
    case 'maintenance':
    default:
      return 2300;
  }
};

const calculateMacronutrients = (calories: number, goal: string) => {
  let proteinPercentage, carbPercentage, fatPercentage;

  switch (goal) {
    case 'weight_loss':
      proteinPercentage = 0.35;
      carbPercentage = 0.40;
      fatPercentage = 0.25;
      break;
    case 'muscle_gain':
      proteinPercentage = 0.30;
      carbPercentage = 0.50;
      fatPercentage = 0.20;
      break;
    case 'maintenance':
    default:
      proteinPercentage = 0.30;
      carbPercentage = 0.45;
      fatPercentage = 0.25;
  }

  return {
    protein: Math.round((calories * proteinPercentage) / 4),
    carbohydrates: Math.round((calories * carbPercentage) / 4),
    fat: Math.round((calories * fatPercentage) / 9),
  };
};

const generateMeals = (dailyCalories: number, dietaryRestrictions: string[]): NutritionPlan['meals'] => {
  const mealNames = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  const meals = [];

  for (const mealName of mealNames) {
    const mealCalories = Math.round(dailyCalories * (mealName === 'Snack' ? 0.1 : 0.3));
    meals.push({
      name: mealName,
      foods: generateFoods(mealCalories, dietaryRestrictions),
    });
  }

  return meals;
};

const generateFoods = (mealCalories: number, dietaryRestrictions: string[]): NutritionPlan['meals'][0]['foods'] => {
  const foods = [];
  let remainingCalories = mealCalories;

  while (remainingCalories > 50) {
    const food = getRandomFood(dietaryRestrictions);
    const calories = Math.min(remainingCalories, Math.floor(Math.random() * 200) + 50);
    foods.push({
      name: food,
      amount: `${Math.floor(calories / 10)}0g`,
      calories,
    });
    remainingCalories -= calories;
  }

  return foods;
};

const getRandomFood = (dietaryRestrictions: string[]): string => {
  const foods = [
    'Chicken Breast', 'Salmon', 'Brown Rice', 'Quinoa', 'Sweet Potato',
    'Broccoli', 'Spinach', 'Almonds', 'Greek Yogurt', 'Banana',
    'Oatmeal', 'Egg Whites', 'Avocado', 'Whole Wheat Bread', 'Apple',
  ];

  const filteredFoods = foods.filter(food => !dietaryRestrictions.some(restriction => 
    food.toLowerCase().includes(restriction.toLowerCase())
  ));

  return filteredFoods[Math.floor(Math.random() * filteredFoods.length)];
};