export type AxiosResponse<T = any> = import('axios').AxiosResponse<T>;

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: {
    email: string;
    id: string;
    roles: [string];
  }
};

export type Profile = {
  id: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  branch:
    | 'Army'
    | 'Navy'
    | 'Air Force'
    | 'Marines'
    | 'Coast Guard'
    | 'Space Force';
  currentInstallation?: string;
  fitnessWaivers: string;
  dietaryRestrictions: string;
  fitnessGoals?: string;
  nutritionGoals?: string;
  fitnessPreferences?: string;
  diningFacilityUsage?: number;
  onBaseRestaurantUsage?: number;
  offBaseRestaurantUsage?: number;
  homeCookingFrequency?: number;
};

export type WorkoutPlanRequest = {
  startDate: Date;
  endDate: Date;
  userInput: string;
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
  workouts: DailyWorkout[];
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
