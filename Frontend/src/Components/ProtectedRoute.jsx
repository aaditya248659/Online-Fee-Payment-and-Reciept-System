import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // If no token, redirect to login
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    // Simple protection: only clear token when explicitly logging out
    // Don't interfere with navigation between protected routes
    
  }, [navigate]);

  return children;
};

export default ProtectedRoute;