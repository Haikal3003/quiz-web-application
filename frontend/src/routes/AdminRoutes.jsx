import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from '../pages/Admin/Dashboard';
import AdminSidebar from '../components/Sidebar/AdminSidebar';
import ManageQuiz from '../pages/Admin/ManageQuiz';
import MemberList from '../pages/Admin/MemberList';
import QuizReport from '../pages/Admin/QuizReport';
import CreateQuizPage from '../pages/Admin/ManageQuiz/CreateQuizPage';
import EditQuizPage from '../pages/Admin/ManageQuiz/EditQuizPage';
import ViewQuizPage from '../pages/Admin/ManageQuiz/ViewQuizPage';

const AdminRoutes = () => {
  const location = useLocation();

  const paths = ['/admin/dashboard', '/admin/manage-quiz', '/admin/member-list', '/admin/quiz-report', '/admin/manage-quiz/add-quiz', '/admin/manage-quiz/update-quiz/:quizId'];

  const showSidebar = paths.some((path) => location.pathname.startsWith(path));

  return (
    <>
      {showSidebar && <AdminSidebar />}
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="manage-quiz" element={<ManageQuiz />} />
        <Route path="member-list" element={<MemberList />} />
        <Route path="quiz-report" element={<QuizReport />} />
        <Route path="manage-quiz/add-quiz" element={<CreateQuizPage />} />
        <Route path="manage-quiz/edit-quiz/:quizId" element={<EditQuizPage />} />
        <Route path="/view-quiz/:quizId" element={<ViewQuizPage />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
