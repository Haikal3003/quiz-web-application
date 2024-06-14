import React, { useState } from 'react';
import LoginForm from './LoginForm';
import AuthService from '../../../services/AuthService';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setCurrentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await AuthService.login(email, password);

      if (res.ok) {
        setEmail('');
        setPassword('');

        const currentUser = await res.json();
        setCurrentUser(currentUser);

        setTimeout(() => {
          if (currentUser.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/user/dashboard');
          }
        }, 2000);

        window.location.reload();
      }
    } catch (error) {
      console.log(error);
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
    </div>
  );
};

export default LoginPage;
