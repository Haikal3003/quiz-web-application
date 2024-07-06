import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

const MemberRoutes = () => {
  const location = useLocation();

  // const paths = ['/admin/dashboard', '/admin/quiz-management', '/admin/member-list', '/admin/quiz-report'];

  // const showSidebar = paths.some((path) => location.pathname.startsWith(path));

  // useEffect(() => {
  //   if (location.pathname.startsWith('/member')) {
  //     document.querySelector('body').className = 'bg-lightTheme-primary';
  //   }
  // }, []);

  return (
    <>
      {/* {showSidebar && <AdminSidebar />} */}
      <Routes></Routes>
    </>
  );
};

export default MemberRoutes;
