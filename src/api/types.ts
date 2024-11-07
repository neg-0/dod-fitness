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
  name: string;
  age: number;
  gender: "Male" | "Female" | "Prefer Not To Say";
  height: number;
  currentWeight: number;
  branch: string;
  currentInstallation: string;
  activityLevel: string;
  dietaryRestrictions: string[];
  allergies: string[];
  nutritionGoals: string;
  fitnessGoals: string;
  fitnessWaivers: string;
  fitnessPreferences: string;
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
  name: string;
  goal: string;
  startDate: string;
  endDate: string;
  workouts: DailyWorkout[];
};

export type NutritionPlanRequest = {
  personalInfo: {
    age: number;
    gender: string;
    height: number;
    currentWeight: number;
    targetWeight: number;
    activityLevel: string;
    ptTestDate?: string;
  };
  fitnessGoals: {
    primary: string;
    targetWeight: number;
    weeklyWorkouts: number;
  };
  dietaryInfo: {
    restrictions: string[];
    allergies: string[];
    mealsPerDay: number;
    diningFacilityAccess: boolean;
  };
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
  userId: string;
  goal: string;
  startDate: string;
  endDate: string;
  dailyCalories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  meals: Meal[];
};
