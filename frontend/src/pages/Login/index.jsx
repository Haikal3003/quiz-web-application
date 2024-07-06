import React, { useState } from 'react';
import LoginForm from './LoginForm';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';

const LoginPage = ({ setCurrentUser, setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email) {
      setError('Harap isi email !!!');
      return;
    }

    if (!password) {
      setError('Harap isi password !!!');
      return;
    }

    setLoading(true);
    setError('');

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
      setError('Login failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError('');
  };

  return (
    <div
      id="container"
      className="relative w-full h-[100vh] flex"
      style={{
        backgroundImage: 'url(src/assets/background-pattern.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative w-full h-full flex justify-center items-center flex-col text-black">
        <div id="login-modal" className="relative w-[40%] h-auto p-12 py-20 flex flex-col justify-start items-center bg-white rounded-xl gap-10">
          <h1 className="text-[22px] font-bold">Quizkannn.</h1>
          {error && <div className="text-red-500">{error}</div>}
          <LoginForm email={email} setEmail={handleInputChange(setEmail)} password={password} setPassword={handleInputChange(setPassword)} handleLogin={handleLogin} />
        </div>
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default LoginPage;
