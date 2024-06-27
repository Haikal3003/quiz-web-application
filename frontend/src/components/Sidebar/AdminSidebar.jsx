import React from 'react';
import { BiSolidDashboard } from 'react-icons/bi';
import { FaSquarePlus } from 'react-icons/fa6';
import { MdPeopleAlt } from 'react-icons/md';
import { BiSolidReport } from 'react-icons/bi';

import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { to: '/admin/dashboard', icon: <BiSolidDashboard />, text: 'Dashboard' },
    { to: '/admin/manage-quiz', icon: <FaSquarePlus />, text: 'Manage Quiz' },
    { to: '/admin/member-list', icon: <MdPeopleAlt />, text: 'Member List' },
    { to: '/admin/quiz-report', icon: <BiSolidReport />, text: 'Report' },
  ];
  return (
    <div id="admin-sidebar" className="fixed w-[18%] h-screen top-0 left-0 text-black bg-white px-8 py-16 border-r-[1px] border-r-gray">
      <div className="wrapper flex flex-col h-full ">
        <h1 id="logo-name" className="relative  flex items-center justify-center mb-8 text-[18px] font-bold">
          Quizkannn.
        </h1>

        <div id="line" className="w-full h-[1px] bg-gray"></div>

        <ul className="menu-list flex flex-col gap-2 mt-14">
          {menuItems.map((item, index) => {
            const isActive = location.pathname.startsWith(item.to);
            return (
              <Link to={item.to} key={index}>
                <li
                  className={`relative w-full h-[40px] flex items-center pl-6 gap-10 border-[1px] border-gray 
                  ${isActive ? 'bg-blue-300 text-white' : 'hover:bg-blue-300 hover:text-white transition'} rounded-md`}
                >
                  <span className="menu-icon text-[18px]">{item.icon}</span>
                  <span className="menu-text font-semibold flex-none">{item.text}</span>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
