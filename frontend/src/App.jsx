import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Container from './components/Container';
import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/Registration';
import AuthService from './services/AuthService';
import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';

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

          <Route path="/user/*" element={isAuthenticated && currentUser?.role === 'user' ? <UserRoutes /> : <Navigate to="/login" />} />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
