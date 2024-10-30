import { AuthResponse, LoginRequest } from '../api/types';
import { UserRole } from '../contexts/AuthContext';

interface MockUser {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  name?: string;
  age?: number;
  branch?: string;
}

const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    email: 'admin@atlas.mil',
    password: 'admin123',
    role: 'SystemAdministrator',
  },
  {
    id: '2',
    email: 'leader@atlas.mil',
    password: 'leader123',
    role: 'UnitLeadership',
  },
  {
    id: '3',
    email: 'fitness@atlas.mil',
    password: 'fitness123',
    role: 'FitnessSpecialist',
  },
  {
    id: '4',
    email: 'nutrition@atlas.mil',
    password: 'nutrition123',
    role: 'NutritionSpecialist',
  },
  {
    id: '5',
    email: 'member@atlas.mil',
    password: 'member123',
    role: 'BaseMember',
  },
];

// Add registration function
export const mockRegister = async (userData: {
  email: string;
  password: string;
  name: string;
  age: number;
  branch: string;
}): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Check if email already exists
      const existingUser = MOCK_USERS.find(
        (user) => user.email === userData.email
      );
      if (existingUser) {
        resolve(false);
        return;
      }

      // Create new user
      const newUser: MockUser = {
        id: (MOCK_USERS.length + 1).toString(),
        email: userData.email,
        password: userData.password,
        role: 'BaseMember', // New registrations are always base members
        name: userData.name,
        age: userData.age,
        branch: userData.branch,
      };

      MOCK_USERS.push(newUser);
      resolve(true);
    }, 500);
  });
};

export const mockLogin = (
  loginRequest: LoginRequest
): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = MOCK_USERS.find(
        (u) =>
          u.email === loginRequest.email && u.password === loginRequest.password
      );
      if (user) {
        const authResponse: AuthResponse = {
          access_token: `mock_access_token_${user.id}`,
          refresh_token: `mock_refresh_token_${user.id}`,
          expires_in: 3600,
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
            age: user.age,
            branch: user.branch,
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
          email: 'refreshed_user',
          role: 'BaseMember',
        },
      };
      resolve(authResponse);
    }, 500);
  });
};
