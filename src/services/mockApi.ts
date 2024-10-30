import {
  Profile,
  WorkoutPlan,
  NutritionPlan,
  WorkoutPlanRequest,
  NutritionPlanRequest,
} from '../api/types';
import { DefaultApi } from '../api/DefaultApi';
import { mockStorage } from './mockStorage';
import { generateMockWorkoutPlan } from './mockWorkoutPlan';
import { generateMockNutritionPlan } from './mockNutritionPlan';
import { generateMockProfile } from './mockProfile';

export class MockApi extends DefaultApi {
  constructor() {
    super('');
  }

  async profileGet() {
    const profile = mockStorage.getItem('profile') || generateMockProfile();
    return { data: profile };
  }

  async profilePut(profile: Profile) {
    mockStorage.setItem('profile', profile);
    return { data: profile };
  }

  async workoutPlanPost(request: WorkoutPlanRequest) {
    const mockPlan = generateMockWorkoutPlan(request);
    mockStorage.setItem('workoutPlan', mockPlan);
    return { data: mockPlan };
  }

  async nutritionPlanPost(request: NutritionPlanRequest) {
    const mockPlan = generateMockNutritionPlan(request);
    mockStorage.setItem('nutritionPlan', mockPlan);
    return { data: mockPlan };
  }

  async register(userData: {
    email: string;
    password: string;
    name: string;
    age: number;
    branch: string;
  }) {
    // In a real API, you would create a new user account here
    // For this mock version, we'll just create a profile
    const newProfile: Profile = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name,
      age: userData.age,
      height: 0, // You might want to add these to the registration form
      weight: 0,
      branch: userData.branch,
      fitnessWaivers: '',
      dietaryRestrictions: '',
    };
    mockStorage.setItem('profile', newProfile);
    return { data: newProfile };
  }
}
