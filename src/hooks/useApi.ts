import { useState, useCallback, useEffect } from 'react';
import { LoginRequest, AuthResponse } from '../api/types';
import { MockApi } from '../services/mockApi';
import { mockLogin, mockRefreshToken } from '../services/mockAuth';
import { mockStorage } from '../services/mockStorage';

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

  return {
    api,
    login,
    logout,
    refreshToken,
    isAuthenticated,
    setIsAuthenticated,
  };
}