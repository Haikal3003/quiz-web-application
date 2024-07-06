import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { toastSuccess } from '../../utils/Toast';
import Loader from '../../components/Loader';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username) {
      setError('Harap isi username !!!');
      return;
    }

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
      const res = await AuthService.register(username, email, password);

      if (res) {
        setUsername('');
        setEmail('');
        setPassword('');

        setTimeout(() => {
          navigate('/login');
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setError('Error to register: ' + error.message);
    } finally {
      setLoading(false);
      toastSuccess('Register successfully');
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
          <RegisterForm
            username={username}
            setUsername={handleInputChange(setUsername)}
            email={email}
            setEmail={handleInputChange(setEmail)}
            password={password}
            setPassword={handleInputChange(setPassword)}
            handleRegister={handleRegister}
          />
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default RegisterPage;
