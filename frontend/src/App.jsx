import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Container from './components/Container';
import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/Registration';
import AdminPage from './pages/Admin';
import UserPage from './pages/User';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/admin/*"
            element={
              currentUser?.role === 'admin' ? (
                <Routes>
                  <Route path="dashboard" element={<AdminPage />} />
                  <Route path="add-quiz" element={<div>Add Quiz Page</div>} />
                  <Route path="dashboard" element={<div>Another Dashboard</div>} />
                </Routes>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="/user/dashboard" element={currentUser?.role === 'user' ? <UserPage /> : <Navigate to="/login" />} />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Container>

      <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 2500, style: { transitionDuration: '1s' } }} />
    </BrowserRouter>
  );
}

export default App;
