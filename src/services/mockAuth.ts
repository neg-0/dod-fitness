import { AuthResponse, LoginRequest } from '../api/types';
import { UserRole } from '../contexts/AuthContext';

interface MockUser {
  id: string;
  username: string;
  password: string;
  role: UserRole;
}

const MOCK_USERS: MockUser[] = [
  { id: '1', username: 'admin', password: 'admin123', role: 'SystemAdministrator' },
  { id: '2', username: 'leader', password: 'leader123', role: 'UnitLeadership' },
  { id: '3', username: 'fitness', password: 'fitness123', role: 'FitnessSpecialist' },
  { id: '4', username: 'nutrition', password: 'nutrition123', role: 'NutritionSpecialist' },
  { id: '5', username: 'member', password: 'member123', role: 'BaseMember' },
];

export const mockLogin = (loginRequest: LoginRequest): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = MOCK_USERS.find(
        (u) => u.username === loginRequest.username && u.password === loginRequest.password
      );
      if (user) {
        const authResponse: AuthResponse = {
          access_token: `mock_access_token_${user.id}`,
          refresh_token: `mock_refresh_token_${user.id}`,
          expires_in: 3600,
          user: {
            id: user.id,
            username: user.username,
            role: user.role,
          },
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
        user: {
          id: '1',
          username: 'refreshed_user',
          role: 'BaseMember',
        },
      };
      resolve(authResponse);
    }, 500);
  });
};