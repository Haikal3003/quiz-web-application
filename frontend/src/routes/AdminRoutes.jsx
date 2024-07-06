import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from '../pages/Admin/Dashboard';
import AdminSidebar from '../components/Admin/Sidebar/AdminSidebar';
import QuizManagementPage from '../pages/Admin/Quizzes';
import CreateQuizPage from '../pages/Admin/Quizzes/CreateQuiz';
import EditQuizPage from '../pages/Admin/Quizzes/EditQuiz';
import MemberListPage from '../pages/Admin/MemberList';
import QuizReportPage from '../pages/Admin/QuizReport';
import PreviewQuizPage from '../pages/Admin/Quizzes/PreviewQuiz';

const AdminRoutes = () => {
  const location = useLocation();

  const paths = ['/admin/dashboard', '/admin/quiz-management', '/admin/member-list', '/admin/quiz-report'];

  const showSidebar = paths.some((path) => location.pathname.startsWith(path));

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) {
      document.querySelector('body').className = 'bg-darkTheme-primary';
    }
  }, []);

  return (
    <>
      {showSidebar && <AdminSidebar />}
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="quiz-management">
          <Route index element={<QuizManagementPage />} />
          <Route path="create-quiz" element={<CreateQuizPage />} />
          <Route path="edit-quiz/:quizId" element={<EditQuizPage />} />
          <Route path="preview-quiz/:quizId" element={<PreviewQuizPage />} />
        </Route>
        <Route path="member-list" element={<MemberListPage />} />
        <Route path="quiz-report" element={<QuizReportPage />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
