import { AuthResponse, LoginRequest } from '../api/types';

const MOCK_USER = {
  username: 'testuser',
  password: 'password123',
};

export const mockLogin = (loginRequest: LoginRequest): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (loginRequest.username === MOCK_USER.username && loginRequest.password === MOCK_USER.password) {
        const authResponse: AuthResponse = {
          access_token: 'mock_access_token',
          refresh_token: 'mock_refresh_token',
          expires_in: 3600,
        };
        resolve(authResponse);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
};

export const mockRefreshToken = (): Promise<AuthResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const authResponse: AuthResponse = {
        access_token: 'mock_refreshed_access_token',
        refresh_token: 'mock_refreshed_refresh_token',
        expires_in: 3600,
      };
      resolve(authResponse);
    }, 500);
  });
};