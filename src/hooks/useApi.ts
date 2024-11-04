import { useState, useCallback, useEffect } from 'react';
import { LoginRequest, AuthResponse } from '../api/types';
import ApiFactory from '../services/apiConfig';
import {
  mockLogin,
  mockRegister,
  mockRefreshToken,
} from '../services/mockAuth';
import { mockStorage } from '../services/mockStorage';
import { UserRole } from '../contexts/AuthContext';

interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  age?: number;
  branch?: string;
}

export function useApi() {
  const [accessToken, setAccessToken] = useState<string | null>(
    mockStorage.getItem('accessToken')
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!accessToken
  );
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const api = ApiFactory.getApi();
    if (accessToken) {
      api.setAccessToken(accessToken);
      checkAuthStatus();
    }
  }, [accessToken]);

  const login = useCallback(
    async (email: string, password: string, role: UserRole) => {
      try {
        const loginRequest: LoginRequest = { email, password, role };
        let authResponse: AuthResponse;

        if (ApiFactory.getMode() === 'live') {
          const api = ApiFactory.getApi();
          const response = await api.authLoginPost(loginRequest);
          authResponse = response.data;
        } else {
          authResponse = await mockLogin(loginRequest);
        }

        console.log('logged in...', authResponse)

        setAccessToken(authResponse.access_token);
        setIsAuthenticated(true);
        mockStorage.setItem('accessToken', authResponse.access_token);
        mockStorage.setItem('refreshToken', authResponse.refresh_token);
        setUser(authResponse.user);
        return true;
      } catch (error) {
        console.error('Login failed:', error);
        ApiFactory.handleApiFailure();
        return false;
      }
    },
    []
  );

  const register = useCallback(
    async (userData: {
      email: string;
      password: string;
      name: string;
      age: number;
      branch: string;
    }) => {
      try {
        if (ApiFactory.getMode() === 'live') {
          const api = ApiFactory.getApi();
          await api.register(userData);
        } else {
          await mockRegister(userData);
        }
        return true;
      } catch (error) {
        console.error('Registration failed:', error);
        ApiFactory.handleApiFailure();
        return false;
      }
    },
    []
  );

  const logout = useCallback(() => {
    setAccessToken(null);
    setIsAuthenticated(false);
    setUser(null);
    mockStorage.removeItem('accessToken');
    mockStorage.removeItem('refreshToken');
  }, []);

  const refreshToken = useCallback(async () => {

    if (ApiFactory.getMode() === 'mock') {
      setIsAuthenticated(true);
      return true;
    }

    const refreshToken = mockStorage.getItem('refreshToken');

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      let authResponse: AuthResponse;

      if (ApiFactory.getMode() === 'live') {
        const api = ApiFactory.getApi();
        const response = await api.authRefreshPost();
        authResponse = response.data;
      } else {
        authResponse = await mockRefreshToken();
      }

      setAccessToken(authResponse.access_token);
      setIsAuthenticated(true);
      mockStorage.setItem('accessToken', authResponse.access_token);
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      ApiFactory.handleApiFailure();
      logout();
      return false;
    }
  }, [logout]);

  const checkAuthStatus = useCallback(async () => {

    const storedToken = mockStorage.getItem('accessToken');
    const refreshToken = mockStorage.getItem('refreshToken');

    let userData;
    if (storedToken) {
      setAccessToken(storedToken);
      setIsAuthenticated(true);
      try {
        const api = ApiFactory.getApi();
        const response = await api.authRefreshPost(refreshToken);
        console.log('checkAuthStatus', response)
        if (response.data?.user)
        userData = response.data.user;
        setUser(response.data.user);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setIsAuthenticated(false);
        setUser(null);
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }

    return storedToken ? userData : null;
  }, []);

  const generateWorkoutPlan = useCallback(async (startDate: Date, endDate: Date, userInput: string) => {
    try {
      const api = ApiFactory.getApi();
      const workoutPlan = await api.workoutPlanPost({
        startDate,
        endDate,
        userInput
      })
      return workoutPlan;
    } catch (error) {
      console.error("Failed to generate workout: ", error);
    }
  }, []);

  return {
    api: ApiFactory.getApi(),
    login,
    register,
    logout,
    refreshToken,
    isAuthenticated,
    user,
    checkAuthStatus,
  };
}
