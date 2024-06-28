import React, { useState } from 'react';
import LoginForm from './LoginForm';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';

const LoginPage = ({ setCurrentUser, setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const user = await AuthService.login(email, password);

      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        setTimeout(() => {
          navigate(user.role === 'admin' ? '/admin/dashboard' : '/member/dashboard');
        }, 2000);
      }
    } catch (error) {
      console.log("Can't not login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="container" className="relative w-full h-[100vh]  flex">
      <div className="relative w-[80%] h-full flex justify-center items-center flex-col">
        <h1 className="absolute top-[100px] text-[22px] font-bold">Quizkannn.</h1>
        <LoginForm email={email} setEmail={(e) => setEmail(e.target.value)} password={password} setPassword={(e) => setPassword(e.target.value)} handleLogin={handleLogin} />
      </div>
      <div className="max-w-full w-full h-full">
        <img src="src/assets/AuthPage.jpg" alt="" />
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default LoginPage;
