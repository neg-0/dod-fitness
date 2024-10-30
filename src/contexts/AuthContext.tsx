import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';

export type UserRole =
  | 'SystemAdministrator'
  | 'UnitLeadership'
  | 'FitnessSpecialist'
  | 'NutritionSpecialist'
  | 'BaseMember';

interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  age?: number;
  branch?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  register: (userData: {
    email: string;
    password: string;
    name: string;
    age: number;
    branch: string;
  }) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    login: apiLogin,
    register: apiRegister,
    logout: apiLogout,
    checkAuthStatus: apiCheckAuthStatus,
    isAuthenticated,
    user,
  } = useApi();
  const [authUser, setAuthUser] = useState(user);

  useEffect(() => {
    apiCheckAuthStatus();
  }, [apiCheckAuthStatus]);

  useEffect(() => {
    setAuthUser(user);
  }, [user]);

  const login = async (email: string, password: string, role: UserRole) => {
    const success = await apiLogin(email, password, role);
    if (success) {
      setAuthUser(user);
    }
    return success;
  };

  const register = async (userData: {
    email: string;
    password: string;
    name: string;
    age: number;
    branch: string;
  }) => {
    return await apiRegister(userData);
  };

  const logout = () => {
    apiLogout();
    setAuthUser(null);
  };

  const value = {
    isAuthenticated,
    user: authUser,
    login,
    register,
    logout,
    checkAuthStatus: apiCheckAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
