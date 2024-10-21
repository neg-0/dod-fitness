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
            content: `Create a nutrition plan based on the following profile information:\n${profileFields}.Please respond with only the JSON output. This is an example for how I'd like the JSON object structured:
                "dailyCalories": 2300,
                "macronutrients": {
                    "protein": 173,
                    "carbohydrates": 259,
                    "fat": 64
                },
                "meals": [
                    {
                        "name": "Breakfast",
                        "foods": [
                            {
                                "name": "Salmon",
                                "amount": "190g",
                                "calories": 199
                            },
                            {
                                "name": "Whole Wheat Bread",
                                "amount": "160g",
                                "calories": 168
                            },
                            {
                                "name": "Brown Rice",
                                "amount": "210g",
                                "calories": 214
                            },
                            {
                                "name": "Quinoa",
                                "amount": "100g",
                                "calories": 109
                            }
                        ]
                    },
                    {
                        "name": "Lunch",
                        "foods": [
                            {
                                "name": "Quinoa",
                                "amount": "220g",
                                "calories": 220
                            },
                            {
                                "name": "Banana",
                                "amount": "100g",
                                "calories": 104
                            },
                            {
                                "name": "Quinoa",
                                "amount": "110g",
                                "calories": 118
                            },
                            {
                                "name": "Avocado",
                                "amount": "180g",
                                "calories": 186
                            },
                            {
                                "name": "Egg Whites",
                                "amount": "60g",
                                "calories": 62
                            }
                        ]
                    },
                    {
                        "name": "Dinner",
                        "foods": [
                            {
                                "name": "Greek Yogurt",
                                "amount": "230g",
                                "calories": 231
                            },
                            {
                                "name": "Salmon",
                                "amount": "120g",
                                "calories": 127
                            },
                            {
                                "name": "Egg Whites",
                                "amount": "130g",
                                "calories": 136
                            },
                            {
                                "name": "Brown Rice",
                                "amount": "190g",
                                "calories": 196
                            }
                        ]
                    },
                    {
                        "name": "Snack",
                        "foods": [
                            {
                                "name": "Greek Yogurt",
                                "amount": "130g",
                                "calories": 139
                            },
                            {
                                "name": "Quinoa",
                                "amount": "90g",
                                "calories": 91
                            }
                        ]
                    }
                ]
            }`
          }
        ]
      });

      if (!response.choices.length) {
        throw new Error('No choices returned from OpenAI API');
      }
      const generatedPlan = response.choices[0].message.content;

      const { error } = await supabase
        .from('nutrition_plans')
        .insert({
          name: profileData.name,
          age: profileData.age,
          height: profileData.height,
          weight: profileData.weight,
          branch: profileData.branch,
          dietary_restrictions: profileData.dietary_restrictions,
          resting_heart_rate: profileData.resting_heart_rate,
          heart_rate_variability: profileData.heart_rate_variability,
          vo2_max: profileData.vo2_max,
          stress: profileData.stress,
          body_battery: profileData.body_battery,
          intensity: profileData.intensity,
          goals: profileData.goals,
          plan: generatedPlan,
          // Add any other relevant fields explicitly
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
            content: `Create a workout plan based on the following profile information:\n${profileFields}. Please respond with only the JSON output. This is an example for how I'd like the JSON object structured: 

              "startDate": "2024-10-20T21:22:41.187Z",
              "endDate": "2025-10-25T22:22:41.187Z",
              "weeklyPlan": [
                  {
                      "day": "2024-10-20",
                      "summary": "Rest Day",
                      "duration": 0,
                      "caloriesBurned": 0,
                      "workoutType": "rest",
                      "exercises": []
                  },
                  {
                      "day": "2024-10-21",
                      "summary": "Strength Training",
                      "duration": 89,
                      "caloriesBurned": 372,
                      "workoutType": "strength",
                      "exercises": [
                          {
                              "name": "Deadlifts",
                              "sets": 2,
                              "reps": 14
                          },
                          {
                              "name": "Push-ups",
                              "sets": 3,
                              "reps": 11
                          },
                          {
                              "name": "Squats",
                              "sets": 2,
                              "reps": 8
                          },
                          {
                              "name": "Squats",
                              "sets": 2,
                              "reps": 6
                          },
                          {
                              "name": "Squats",
                              "sets": 2,
                              "reps": 5
                          },
                          {
                              "name": "Deadlifts",
                              "sets": 3,
                              "reps": 13
                          }
                      ]
                  },
                  {
                      "day": "2024-10-22",
                      "summary": "Cardio Blast",
                      "duration": 40,
                      "caloriesBurned": 324,
                      "workoutType": "cardio",
                      "exercises": [
                          {
                              "name": "Running",
                              "duration": 5
                          },
                          {
                              "name": "Rowing",
                              "duration": 18
                          },
                          {
                              "name": "Cycling",
                              "duration": 12
                          }
                      ]
                  },
                  {
                      "day": "2024-10-23",
                      "summary": "Rest Day",
                      "duration": 0,
                      "caloriesBurned": 0,
                      "workoutType": "rest",
                      "exercises": []
                  },
                  {
                      "day": "2024-10-24",
                      "summary": "Yoga Flow",
                      "duration": 41,
                      "caloriesBurned": 255,
                      "workoutType": "yoga",
                      "exercises": [
                          {
                              "name": "Sun Salutation",
                              "duration": 8
                          },
                          {
                              "name": "Warrior Pose",
                              "duration": 13
                          },
                          {
                              "name": "Tree Pose",
                              "duration": 10
                          },
                          {
                              "name": "Downward Dog",
                              "duration": 7
                          },
                          {
                              "name": "Sun Salutation",
                              "duration": 14
                          },
                          {
                              "name": "Sun Salutation",
                              "duration": 8
                          }
                      ]
                  },
                  {
                      "day": "2024-10-25",
                      "summary": "High-Intensity Interval Training",
                      "duration": 40,
                      "caloriesBurned": 177,
                      "workoutType": "hiit",
                      "exercises": [
                          {
                              "name": "Burpees",
                              "duration": 12
                          },
                          {
                              "name": "Box Jumps",
                              "duration": 19
                          },
                          {
                              "name": "Box Jumps",
                              "duration": 6
                          }
                      ]
                  }
              ]
          }`
          }
        ]
      });
  
      if (!response.choices.length) {
        throw new Error('No choices returned from OpenAI API');
      }
      const generatedPlan = response.choices[0].message.content;
      
      const { error } = await supabase
        .from('workout_plans')
        .insert({
          name: profileData.name,
          age: profileData.age,
          height: profileData.height,
          weight: profileData.weight,
          branch: profileData.branch,
          dietary_restrictions: profileData.dietary_restrictions,
          resting_heart_rate: profileData.resting_heart_rate,
          heart_rate_variability: profileData.heart_rate_variability,
          vo2_max: profileData.vo2_max,
          stress: profileData.stress,
          body_battery: profileData.body_battery,
          intensity: profileData.intensity,
          goals: profileData.goals,
          plan: generatedPlan,
          // Add any other relevant fields explicitly
        });

  
      if (error) throw error;
  
      return { plan: generatedPlan };  // Return the generated plan
    } catch (error) {
      console.error('Error creating workout plan:', error);
      throw error;
    }
  };

  const fetchWorkoutData = async () => {
    try {
      // Fetch the most recent workout plan from Supabase
      const { data, error } = await supabase
        .from('workout_plans')
        .select('*') // Select all columns or specify the ones you need
        .order('created_at', { ascending: false }) // Order by created_at, descending
        .limit(1); // Limit to only 1 result
  
      if (error) throw error;
  
      return data.length > 0 ? data[0] : null; // Return the most recent plan or null if none exist
    } catch (error) {
      console.error('Error fetching the most recent workout plan:', error);
      throw error; // Rethrow the error to handle it elsewhere if needed
    }
  };

const fetchNutritionData = async () => {
  try {
    // Fetch the most recent workout plan from Supabase
    const { data, error } = await supabase
      .from('nutrition_plans')
      .select('*') // Select all columns or specify the ones you need
      .order('created_at', { ascending: false }) // Order by created_at, descending
      .limit(1); // Limit to only 1 result

    if (error) throw error;

    return data.length > 0 ? data[0] : null; // Return the most recent plan or null if none exist
  } catch (error) {
    console.error('Error fetching the most recent workout plan:', error);
    throw error; // Rethrow the error to handle it elsewhere if needed
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
    fetchWorkoutData,
    fetchNutritionData,
  };
}
