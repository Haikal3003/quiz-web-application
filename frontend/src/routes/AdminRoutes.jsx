import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Admin/Dashboard';
import AdminSidebar from '../components/Sidebar/AdminSidebar';
import ManageQuiz from '../pages/Admin/ManageQuiz';
import MemberList from '../pages/Admin/MemberList';
import QuizReport from '../pages/Admin/QuizReport';

const AdminRoutes = () => {
  return (
    <>
      <AdminSidebar />
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="manage-quiz" element={<ManageQuiz />} />
        <Route path="member-list" element={<MemberList />} />
        <Route path="quiz-report" element={<QuizReport />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
