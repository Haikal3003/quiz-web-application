import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import AuthService from '../services/AuthService';

const PrivateRoute = ({ roles }) => {
  const location = useLocation();
  const currentUser = AuthService.getCurrentUser();
  const isAuthenticated = !!currentUser;
  const userRole = currentUser?.role;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
