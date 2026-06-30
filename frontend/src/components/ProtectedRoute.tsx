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
    // User is not authenticated, redirect to login page
    navigate('/login', { replace: true });
    return null; // Do not render children while redirecting
  }

  // User is authenticated, render the children
  return children;
};

export default ProtectedRoute;