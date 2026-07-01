import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element | null => {
  const { token, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !token) {
      navigate('/login', { replace: true });
    }
  }, [isLoading, token, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (token) {
    return children;
  }

  return null;
};

export default ProtectedRoute;