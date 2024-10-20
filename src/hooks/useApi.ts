import { useState, useCallback, useEffect } from 'react';
import { LoginRequest, AuthResponse } from '../api/types';
import { MockApi } from '../services/mockApi';
import { mockLogin, mockRefreshToken } from '../services/mockAuth';
import { mockStorage } from '../services/mockStorage';
import { UserRole } from '../contexts/AuthContext';

const USE_MOCK_API = true;

interface User {
  id: string;
  username: string;
  role: UserRole;
}

export function useApi() {
  const [accessToken, setAccessToken] = useState<string | null>(mockStorage.getItem('accessToken'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!accessToken);
  const [user, setUser] = useState<User | null>(null);
  const [api, setApi] = useState<MockApi | null>(null);

  useEffect(() => {
    if (USE_MOCK_API) {
      const mockApi = new MockApi();
      if (accessToken) {
        mockApi.setAccessToken(accessToken);
      }
      setApi(mockApi);
    }
  }, [isAuthenticated, accessToken]);

  const login = useCallback(async (username: string, password: string, role: UserRole) => {
    try {
      const loginRequest: LoginRequest = { username, password, role };
      const authResponse = await mockLogin(loginRequest);
      setAccessToken(authResponse.access_token);
      setIsAuthenticated(true);
      mockStorage.setItem('accessToken', authResponse.access_token);
      mockStorage.setItem('refreshToken', authResponse.refresh_token);
      setUser(authResponse.user);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }, []);

  const register = useCallback(async (userData: { username: string; password: string; name: string; age: number; branch: string }) => {
    if (!api) return false;
    try {
      await api.register(userData);
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  }, [api]);

  const logout = useCallback(() => {
    setAccessToken(null);
    setIsAuthenticated(false);
    setUser(null);
    setApi(null);
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
      mockStorage.setItem('accessToken', authResponse.access_token);
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return false;
    }
  }, [logout]);

  const checkAuthStatus = useCallback(() => {
    const storedToken = mockStorage.getItem('accessToken');
    if (storedToken && !isAuthenticated) {
      setAccessToken(storedToken);
      setIsAuthenticated(true);
      // Fetch user data here if needed
    }
  }, [isAuthenticated]);

  return {
    api,
    login,
    register,
    logout,
    refreshToken,
    isAuthenticated,
    user,
    checkAuthStatus,
  };
}