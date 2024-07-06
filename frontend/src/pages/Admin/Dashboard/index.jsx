import React, { useEffect, useState } from 'react';
import { RiNotification2Line } from 'react-icons/ri';
import { LuUser, LuBook } from 'react-icons/lu';
import AuthService from '../../../services/AuthService';
import UserService from '../../../services/UserService';
import QuizService from '../../../services/QuizService';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const currentUser = AuthService.getCurrentUser();

  const [isActiveAccountMenu, setIsActiveAccountMenu] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const allUser = await UserService.getAllUsers();
        setUsers(allUser);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const allQuiz = await QuizService.getAllQuizzes();
        setQuizzes(allQuiz);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuiz();
  }, []);

  const handleLogoutAccount = () => {
    AuthService.logout();
    navigate('/login');
    window.location.reload();
  };

  const member = users.filter((user) => user.role === 'member');

  return (
    <section id="admin-dashboard">
      <div id="dashboard-header" className="flex justify-between">
        <div>
          <h2 className="font-light text-[20px]">Welcome, {currentUser.username}</h2>
          <h1 className="font-bold text-[30px]">Dashboard</h1>
        </div>
        <div className="flex items-center gap-5">
          <div id="notification-icon" className="relative w-[45px] h-[45px] flex justify-center items-center rounded-full border-[1px] border-darkTheme-gray text-[14px] cursor-pointer hover:bg-darkTheme-gray transition">
            <span id="notification-count" className="absolute top-0 right-0 w-[18px] h-[18px] rounded-full bg-[#A686C4] text-[9px] flex justify-center items-center cursor-default ">
              1
            </span>
            <RiNotification2Line />
          </div>
          <div
            id="profile-icon"
            className="w-[45px] h-[45px] flex justify-center items-center rounded-full border-[1px] border-darkTheme-gray text-[13px] cursor-pointer hover:bg-darkTheme-gray transition"
            onClick={() => setIsActiveAccountMenu(!isActiveAccountMenu)}
          >
            <LuUser />
          </div>
        </div>

        {isActiveAccountMenu && (
          <div id="modal" className="absolute w-auto h-auto p-6 bg-darkTheme-primary z-30 border-[1px] border-darkTheme-gray  right-0 top-28 rounded-xl">
            <div className="flex flex-col gap-4">
              <Link className="w-[90px] h-[35px] border-[1px] border-darkTheme-gray text-white hover:bg-darkTheme-gray flex justify-center items-center cursor-pointer rounded-xl">Profile</Link>
              <button type="button" className="w-[90px] h-[35px] bg-red-500 hover:bg-red-600 text-white flex justify-center items-center cursor-pointer rounded-xl" onClick={handleLogoutAccount}>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      <div id="dashboard-content" className="my-16">
        <div id="info" className="relative w-full h-auto p-10  border-[1px] border-darkTheme-gray rounded-2xl  grid grid-cols-2 gap-10">
          <div id="total-users" className="w-full auto bg-pink-400 rounded-xl text-darkTheme-primary flex justify-center items-center flex-col gap-4">
            <LuUser className="text-[30px]" />
            <span className="text-[30px] font-bold">{member.length}</span>
            <h1 className="text-[13px] font-normal">Total Member</h1>
          </div>
          <div id="total-users" className="w-full auto bg-blue-400 py-10 rounded-xl text-darkTheme-primary flex justify-center items-center flex-col gap-4">
            <LuBook className="text-[30px]" />
            <span className="text-[30px] font-bold">{quizzes.length}</span>
            <h1 className="text-[13px] font-normal">Total Quiz</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
