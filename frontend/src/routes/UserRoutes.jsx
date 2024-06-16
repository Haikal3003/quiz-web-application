import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserPage from '../pages/User/index';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<UserPage />} />
    </Routes>
  );
};

export default UserRoutes;
