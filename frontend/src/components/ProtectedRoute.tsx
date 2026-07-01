import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>; // Or a more sophisticated spinner/skeleton
  }

  if (!token) {
    navigate('/login', { replace: true });
    return null;
  }

  return children;
};

export default ProtectedRoute;