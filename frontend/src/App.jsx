import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Container from './components/Container';
import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/Registration';
import AdminPage from './pages/Admin';
import UserPage from './pages/User';
import AuthService from './services/AuthService';

function App() {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState(!!currentUser);

  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  useEffect(() => {
    setIsAuthenticated(!!currentUser);
  }, [currentUser]);

  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/admin/*" element={isAuthenticated && currentUser?.role === 'admin' ? <AdminRoutes /> : <Navigate to="/login" />} />

          <Route path="/user/dashboard" element={isAuthenticated && currentUser?.role === 'user' ? <UserPage /> : <Navigate to="/login" />} />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminPage />} />
      <Route path="add-quiz" element={<div>Add Quiz Page</div>} />
      <Route path="another-dashboard" element={<div>Another Dashboard</div>} />
    </Routes>
  );
}

export default App;
