import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPage from '../pages/Admin/index';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminPage />} />
    </Routes>
  );
};

export default AdminRoutes;
