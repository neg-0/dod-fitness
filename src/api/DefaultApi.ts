import axios, { AxiosInstance } from 'axios';
import { LoginRequest, AuthResponse, Profile, WorkoutPlanRequest, WorkoutPlan, NutritionPlanRequest, NutritionPlan, AxiosResponse } from './types';

export class DefaultApi {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string, accessToken?: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    });
  }

  setAccessToken(accessToken: string) {
    this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }

  async authLoginPost(loginRequest: LoginRequest): Promise<AxiosResponse<AuthResponse>> {
    return this.axiosInstance.post<AuthResponse>('/auth/login', loginRequest);
  }

  async authRefreshPost(): Promise<AxiosResponse<AuthResponse>> {
    return this.axiosInstance.post<AuthResponse>('/auth/refresh');
  }

  async profileGet(): Promise<AxiosResponse<Profile>> {
    return this.axiosInstance.get<Profile>('/profile');
  }

  async profilePut(profile: Profile): Promise<AxiosResponse<Profile>> {
    return this.axiosInstance.put<Profile>('/profile', profile);
  }

  async workoutPlanPost(request: WorkoutPlanRequest): Promise<AxiosResponse<WorkoutPlan>> {
    return this.axiosInstance.post<WorkoutPlan>('/workout-plan', request);
  }

  async nutritionPlanPost(request: NutritionPlanRequest): Promise<AxiosResponse<NutritionPlan>> {
    return this.axiosInstance.post<NutritionPlan>('/nutrition-plan', request);
  }
}