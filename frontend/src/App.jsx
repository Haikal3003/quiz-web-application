import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Container from './components/Container';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Registration';
import AuthService from './services/AuthService';
import AdminRoutes from './routes/AdminRoutes';
import MemberRoutes from './routes/MemberRoutes';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState(!!currentUser);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setCurrentUser(user);
    setIsAuthenticated(!!user);
  }, []);

  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/admin/*" element={<PrivateRoute roles={['admin']} />}>
            <Route path="*" element={<AdminRoutes />} />
          </Route>

          <Route path="/member/*" element={<PrivateRoute roles={['member', 'admin']} />}>
            <Route path="*" element={<MemberRoutes />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
