import React, { createContext, useState, useEffect, useCallback } from 'react';
import { login as authServiceLogin } from '../services/authService';

interface AuthContextType {
  user: { email: string; role: string } | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const decodeToken = useCallback((jwtToken: string) => {
    try {
      const base64Url = jwtToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const payload = JSON.parse(jsonPayload);
      return { email: payload.email, role: payload.role };
    } catch (error) {
      console.error("Failed to decode JWT token:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      const decodedUser = decodeToken(storedToken);
      if (decodedUser) {
        setUser(decodedUser);
      } else {
        // If token is invalid, clear it
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    }
  }, [decodeToken]);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authServiceLogin({ email, password });
      localStorage.setItem('token', response.token);
      setToken(response.token);
      const decodedUser = decodeToken(response.token);
      if (decodedUser) {
        setUser(decodedUser);
      } else {
        // This case should ideally not happen if the backend sends a valid token
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        throw new Error("Failed to decode token received from server.");
      }
    } catch (error) {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      throw error; // Re-throw the error for the component to handle
    } finally {
      setIsLoading(false);
    }
  }, [decodeToken]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }, []);

  const contextValue = {
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