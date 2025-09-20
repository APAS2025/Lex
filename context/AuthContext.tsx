import React, { createContext, useState, useContext, useMemo } from 'react';
import type { User } from '../types';
import { users, currentUser as defaultUser } from '../data/mockData';

interface AuthContextType {
  currentUser: User;
  login: (userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);

  const login = (userId: string) => {
    const userToLogin = users.find(u => u.id === userId);
    if (userToLogin) {
      setCurrentUser(userToLogin);
    }
  };

  const logout = () => {
    setCurrentUser(defaultUser);
  };

  const value = useMemo(() => ({
    currentUser,
    login,
    logout
  }), [currentUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
