import React from 'react';
import { TbSmartHome, TbReportAnalytics } from 'react-icons/tb';
import { MdOutlineQuiz } from 'react-icons/md';
import { PiUsers } from 'react-icons/pi';
import logo from '../../../assets/logo.png';

import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { to: '/admin/dashboard', icon: <TbSmartHome />, text: 'Dashboard' },
    { to: '/admin/quiz-management', icon: <MdOutlineQuiz />, text: 'Quiz Management' },
    { to: '/admin/member-list', icon: <PiUsers />, text: 'Member List' },
    { to: '/admin/quiz-report', icon: <TbReportAnalytics />, text: 'Quiz Report' },
  ];
  return (
    <div id="sidebar" className="fixed max-w-[7%] w-full h-screen border-r-[1px] border-r-darkTheme-gray left-0 top-0">
      <div className="flex flex-col items-center py-12">
        <div id="logo" className="w-[40px] h-[40px] mb-20">
          <img src={logo} className="w-full h-full object-cover" />
        </div>

        <ul id="menu-list" className="flex flex-col gap-8">
          {menuItems.map((item, i) => {
            const isActive = location.pathname.startsWith(item.to);
            return (
              <Link key={i} to={item.to}>
                <li>
                  <span id="menu-icon" className={`w-[42px] h-[42px] flex justify-center items-center rounded-[15px] ${isActive ? 'bg-darkTheme-gray' : 'hover:bg-darkTheme-gray'}  text-[17px]`}>
                    {item.icon}
                  </span>
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
