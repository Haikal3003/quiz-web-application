import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { toastSuccess } from '../../utils/Toast';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await AuthService.register(username, email, password);

      if (res) {
        setUsername('');
        setEmail('');
        setPassword('');

        toastSuccess('Register successfully');

        setTimeout(() => {
          navigate('/login');
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log('Error to register: ', error);
    }
  };

  return (
    <div id="container" className="relative w-full h-[100vh]  flex">
      <div className="relative w-[80%] h-full flex justify-center items-center flex-col">
        <h1 className="absolute top-[100px] text-[22px] font-bold">Quizkannn.</h1>
        <RegisterForm
          username={username}
          setUsername={(e) => setUsername(e.target.value)}
          email={email}
          setEmail={(e) => setEmail(e.target.value)}
          password={password}
          setPassword={(e) => setPassword(e.target.value)}
          handleRegister={handleRegister}
        />
      </div>
      <div className="max-w-full w-full h-full">
        <img src="src/assets/AuthPage.jpg" alt="" />
      </div>
    </div>
  );
};

export default RegisterPage;
