// withAuth.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const withAuth = (Component) => (props) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the component if authenticated
  return <Component {...props} />;
};

export default withAuth;
