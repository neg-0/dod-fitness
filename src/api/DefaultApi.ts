import axios, { AxiosInstance } from 'axios';
import {
  LoginRequest,
  AuthResponse,
  Profile,
  WorkoutPlanRequest,
  WorkoutPlan,
  NutritionPlanRequest,
  NutritionPlan,
  AxiosResponse,
} from './types';

export class DefaultApi {
  axiosInstance: AxiosInstance;

  constructor(baseURL: string, accessToken?: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    });
  }

  setAccessToken(accessToken: string) {
    this.axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${accessToken}`;
  }

  async authLoginPost(
    loginRequest: LoginRequest
  ): Promise<AxiosResponse<AuthResponse>> {
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

  async workoutPlanPost(
    request: WorkoutPlanRequest
  ): Promise<AxiosResponse<WorkoutPlan>> {
    return this.axiosInstance.post<WorkoutPlan>('/workout-plan', request);
  }

  async nutritionPlanPost(
    request: NutritionPlanRequest
  ): Promise<AxiosResponse<NutritionPlan>> {
    return this.axiosInstance.post<NutritionPlan>('/nutrition-plan', request);
  }

  async register(userData: {
    email: string;
    password: string;
    name: string;
    age: number;
    branch: string;
  }): Promise<AxiosResponse<Profile>> {
    return this.axiosInstance.post<Profile>('/auth/register', userData);
  }

  async chatPost(data: {
    id: string;
    userInput: string;
    specialist: string;
  }): Promise<AxiosResponse<{ response?: string; error?: string }>> {
    return this.axiosInstance.post('/chat', data);
  }
}
