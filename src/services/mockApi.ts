import { Profile, WorkoutPlan, NutritionPlan, WorkoutPlanRequest, NutritionPlanRequest } from '../api/types';
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
}