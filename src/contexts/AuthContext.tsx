import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';

export type UserRole = 'SystemAdministrator' | 'UnitLeadership' | 'FitnessSpecialist' | 'NutritionSpecialist' | 'BaseMember';

interface AuthContextType {
  isAuthenticated: boolean;
  user: {
    id: string;
    username: string;
    role: UserRole;
  } | null;
  login: (username: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { login: apiLogin, logout: apiLogout, checkAuthStatus: apiCheckAuthStatus, isAuthenticated, user } = useApi();
  const [authUser, setAuthUser] = useState(user);

  useEffect(() => {
    apiCheckAuthStatus();
  }, [apiCheckAuthStatus]);

  useEffect(() => {
    setAuthUser(user);
  }, [user]);

  const login = async (username: string, password: string, role: UserRole) => {
    const success = await apiLogin(username, password, role);
    if (success) {
      setAuthUser(user);
    }
    return success;
  };

  const logout = () => {
    apiLogout();
    setAuthUser(null);
  };

  const value = {
    isAuthenticated,
    user: authUser,
    login,
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