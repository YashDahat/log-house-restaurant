import React, { createContext, useState, useEffect, useMemo, ReactNode } from 'react';
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
  children: ReactNode;
}

const decodeJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to decode JWT", e);
    return null;
  }
};

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      const decoded = decodeJwt(storedToken);
      if (decoded && decoded.email && decoded.role) {
        setUser({ email: decoded.email, role: decoded.role });
      } else {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authServiceLogin({ email, password });
      localStorage.setItem('token', response.token);
      setToken(response.token);
      const decoded = decodeJwt(response.token);
      if (decoded && decoded.email && decoded.role) {
        setUser({ email: decoded.email, role: decoded.role });
      } else {
        // Should not happen with a valid token from authServiceLogin
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        throw new Error("Failed to decode user info from token.");
      }
    } catch (error) {
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

  const contextValue = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      isLoading,
    }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};