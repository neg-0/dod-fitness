export type AxiosResponse<T = any> = import('axios').AxiosResponse<T>;

export type LoginRequest = {
  username: string;
  password: string;
};

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export type Profile = {
  id: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  branch: 'Army' | 'Navy' | 'Air Force' | 'Marines' | 'Coast Guard' | 'Space Force';
  fitnessWaivers: string;
  dietaryRestrictions: string;
};

export type WorkoutPlanRequest = {
  goal: 'strength' | 'endurance' | 'weight_loss' | 'general_fitness';
  duration: number;
  branch: string;
};

export type Exercise = {
  name: string;
  sets?: number;
  reps?: number;
  duration?: number;
  completed?: boolean;
  difficulty?: 'easy' | 'just-right' | 'hard';
};

export type DailyWorkout = {
  day: string;
  summary: string;
  duration: number;
  caloriesBurned: number;
  exercises: Exercise[];
  workoutType: 'cardio' | 'strength' | 'yoga' | 'hiit' | 'rest';
};

export type WorkoutPlan = {
  id: string;
  startDate: string;
  endDate: string;
  weeklyPlan: DailyWorkout[];
};

export type NutritionPlanRequest = {
  goal: 'weight_loss' | 'muscle_gain' | 'maintenance';
  dietaryRestrictions: string[];
};

export type Macronutrients = {
  protein: number;
  carbohydrates: number;
  fat: number;
};

export type Food = {
  name: string;
  amount: string;
  calories: number;
};

export type Meal = {
  name: string;
  foods: Food[];
};

export type NutritionPlan = {
  id: string;
  dailyCalories: number;
  macronutrients: Macronutrients;
  meals: Meal[];
};