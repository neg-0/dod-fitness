import { useState, useCallback } from 'react';
import { LoginRequest } from '../api/types';
import { MockApi } from '../services/mockApi';
import { mockLogin, mockRefreshToken } from '../services/mockAuth';
import { mockStorage } from '../services/mockStorage';
import { supabase } from '../lib/supabase';
import openai from '../lib/openai';

const USE_MOCK_API = true;



export function useApi() {
  const [accessToken, setAccessToken] = useState<string | null>(mockStorage.getItem('accessToken'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!accessToken);

  const api = USE_MOCK_API ? new MockApi() : null; // Replace with real API when available

  const login = useCallback(async (username: string, password: string) => {
    try {
      const loginRequest: LoginRequest = { username, password };
      const authResponse = await mockLogin(loginRequest);
      setAccessToken(authResponse.access_token);
      setIsAuthenticated(true);
      if (api) {
        api.setAccessToken(authResponse.access_token);
      }
      mockStorage.setItem('accessToken', authResponse.access_token);
      mockStorage.setItem('refreshToken', authResponse.refresh_token);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }, [api]);

  const logout = useCallback(() => {
    setAccessToken(null);
    setIsAuthenticated(false);
    mockStorage.removeItem('accessToken');
    mockStorage.removeItem('refreshToken');
  }, []);

  const refreshToken = useCallback(async () => {
    const refreshToken = mockStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const authResponse = await mockRefreshToken();
      setAccessToken(authResponse.access_token);
      setIsAuthenticated(true);
      if (api) {
        api.setAccessToken(authResponse.access_token);
      }
      mockStorage.setItem('accessToken', authResponse.access_token);
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return false;
    }
  }, [api, logout]);

  const createNutritionPlan = async (profileData: Record<string, any>) => {
    try {
      // Dynamically map all profile fields into a prompt
      const profileFields = Object.entries(profileData)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
  
      // Call OpenAI API to generate the nutrition plan
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a professional nutritionist." },
          {
            role: "user",
            content: `Create a nutrition plan based on the following profile information:\n${profileFields}`
          }
        ]
      });
  
      const generatedPlan = response.choices[0].message.content;
  
      // Save the generated plan to Supabase (with actual user ID)
      const { error } = await supabase
        .from('nutrition_plans')
        .insert({
          user_id: profileData.user_id,  // Replace with actual user ID from profile data
          plan: generatedPlan,
          ...profileData,  // Save the profile data along with the plan
        });
  
      if (error) throw error;
  
      return { plan: generatedPlan };  // Return the generated plan
    } catch (error) {
      console.error('Error creating nutrition plan:', error);
      throw error;
    }
  };


  const createWorkoutPlan = async (profileData: Record<string, any>) => {
    try {
      // Dynamically map all profile fields into a prompt
      const profileFields = Object.entries(profileData)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
  
      // Call OpenAI API to generate the workout plan
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a professional fitness trainer." },
          {
            role: "user",
            content: `Create a workout plan based on the following profile information:\n${profileFields}`
          }
        ]
      });
  
      const generatedPlan = response.choices[0].message.content;
  
      // Save the generated plan to Supabase (with actual user ID)
      const { error } = await supabase
        .from('workout_plans')
        .insert({
          user_id: profileData.user_id,  // Replace with actual user ID from profile data
          plan: generatedPlan,
          ...profileData,  // Save the profile data along with the plan
        });
  
      if (error) throw error;
  
      return { plan: generatedPlan };  // Return the generated plan
    } catch (error) {
      console.error('Error creating workout plan:', error);
      throw error;
    }
  };
  
  return {
    api,
    login,
    logout,
    refreshToken,
    isAuthenticated,
    setIsAuthenticated,
    createWorkoutPlan,
    createNutritionPlan,
  };
}
