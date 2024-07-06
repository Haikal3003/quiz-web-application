import React from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = ({ username, setUsername, email, setEmail, password, setPassword, handleRegister }) => {
  return (
    <form id="register-form" className="relative max-w-[75%] w-full h-full flex flex-col justify-center">
      <div className="input-container relative">
        <label>Username:</label>
        <div id="input-div" className="max-w-full w-full bg-slate-100 flex  ">
          <input id="username-input" type="text" placeholder="Enter Username..." name="username" value={username} onChange={setUsername} required />
        </div>
      </div>
      <div className="input-container">
        <label>Email:</label>
        <div id="input-div" className="max-w-full w-full bg-slate-100">
          <input id="email-input" type="email" placeholder="Enter username..." name="email" value={email} onChange={setEmail} required />
        </div>
      </div>

      <div className="input-container relative">
        <label>Password:</label>
        <div id="input-div" className="max-w-full w-full bg-slate-100 flex ">
          <input id="password-input" type="password" placeholder="Enter password..." name="password" value={password} onChange={setPassword} required />
        </div>
      </div>

      <button id="login-button" className="max-w-full w-full bg-black text-white p-4 font-semibold tracking-wide text-[9px] " type="button" onClick={handleRegister}>
        Register
      </button>

      <div className="flex justify-center items-center mt-12 text-[12px]   ">
        <span>
          Do you have account?
          <Link to={'/login'} className="cursor-pointer text-blue-400 pl-2">
            login
          </Link>
        </span>
      </div>
    </form>
  );
};

export default RegisterForm;
