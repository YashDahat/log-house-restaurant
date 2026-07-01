import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as authService from '../services/authService';

// Type Definitions
export interface AuthContextType {
  user: { email: string; role: string } | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

// Public Variables
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to decode JWT token payload
const decodeJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to decode JWT token:", error);
    return null;
  }
};

// Public Functions
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): React.ReactElement => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decoded = decodeJwt(storedToken);
      if (decoded && decoded.email && decoded.role) {
        setToken(storedToken);
        setUser({ email: decoded.email, role: decoded.role });
      } else {
        // Token found but invalid, clear it
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      localStorage.setItem('token', response.token);
      setToken(response.token);

      const decoded = decodeJwt(response.token);
      if (decoded && decoded.email && decoded.role) {
        setUser({ email: decoded.email, role: decoded.role });
      } else {
        console.error("Login successful but token payload is invalid or missing required fields.");
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        throw new Error("Invalid token received from server.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const contextValue: AuthContextType = {
    user,
    token,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};