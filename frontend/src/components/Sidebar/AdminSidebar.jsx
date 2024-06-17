import React from 'react';
import { BiSolidDashboard } from 'react-icons/bi';
import { FaSquarePlus } from 'react-icons/fa6';
import { MdPeopleAlt } from 'react-icons/md';
import { BiSolidReport } from 'react-icons/bi';

import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  const menuItems = [
    { to: '/admin/dashboard', icon: <BiSolidDashboard />, text: 'Dashboard' },
    { to: '/admin/manage-quiz', icon: <FaSquarePlus />, text: 'Manage Quiz' },
    { to: '/admin/member-list', icon: <MdPeopleAlt />, text: 'Member List' },
    { to: '/admin/quiz-report', icon: <BiSolidReport />, text: 'Report' },
  ];
  return (
    <div id="admin-sidebar" className="fixed w-[5%] h-auto top-1/2 left-[40px] -translate-y-1/2  rounded-xl text-white">
      <div className="wrapper flex justify-center items-center h-full ">
        <ul className="menu-list flex flex-col gap-10">
          {menuItems.map((item, index) => {
            return (
              <Link to={item.to}>
                <li key={index} className="relative w-full border-[2px] border-lightGreen p-6 text-[13px] rounded-xl hover:bg-lightGreen hover:text-black ">
                  {item.icon}
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
