import React from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = ({ username, setUsername, email, setEmail, password, setPassword, handleRegister }) => {
  return (
    <form id="register-form" className="relative max-w-[75%] w-full h-full flex flex-col justify-center">
      <div className="input-container relative">
        <label>Username:</label>
        <div id="input-div" className="max-w-full w-full bg-slate-100 flex  ">
          <input id="register-input" type="text" placeholder="Enter Username..." name="username" value={username} onChange={setUsername} />
        </div>
      </div>
      <div className="input-container">
        <label>Email:</label>
        <div id="input-div" className="max-w-full w-full bg-slate-100">
          <input id="register-input" type="email" placeholder="Enter username..." name="email" value={email} onChange={setEmail} />
        </div>
      </div>

      <div className="input-container relative">
        <label>Password:</label>
        <div id="input-div" className="max-w-full w-full bg-slate-100 flex  ">
          <input id="register-input" type="password" placeholder="Enter password..." name="password" value={password} onChange={setPassword} />
        </div>
      </div>

      <button id="login-button" className="max-w-full w-full bg-black text-white p-4 font-semibold tracking-wide " type="button" onClick={handleRegister}>
        Register
      </button>

      <div className="absolute  bottom-[80px] left-1/2 -translate-x-1/2 text-[11px]   ">
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
