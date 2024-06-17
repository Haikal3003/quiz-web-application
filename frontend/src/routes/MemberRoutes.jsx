import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserPage from '../pages/Member/index';

const MemberRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<UserPage />} />
    </Routes>
  );
};

export default MemberRoutes;
