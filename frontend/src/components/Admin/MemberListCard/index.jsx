import React from 'react';
import { IoTrashOutline, IoPencilOutline } from 'react-icons/io5';
import UserService from '../../../services/UserService';

const MemberListCard = ({ member, onDeleteMember }) => {
  const deleteMember = async (id) => {
    try {
      const deleteMemberById = await UserService.deleteUserById(id);
      onDeleteMember(id);
      console.log('Delete member with id: ' + deleteMemberById + ' successfully');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div id="member-card" className="w-full h-auto p-6 border-[1px] border-darkTheme-gray rounded-xl">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-4">
          <div>
            <div id="circle" className="w-[45px] h-[45px] rounded-full bg-darkTheme-gray"></div>
          </div>
          <div>
            <h1 className="font-semibold text-[14px]">{member.username}</h1>
            <h2 className="text-[12px]">{member.role}</h2>
          </div>
        </div>

        <div className="flex items-center justify-center text-black gap-4">
          <button type="button" className="w-[35px] h-[35px] bg-green-300 rounded-full flex justify-center items-center text-[12px]">
            <IoPencilOutline />
          </button>
          <button type="button" className="w-[35px] h-[35px] bg-red-400 hover:bg-red-500 rounded-full flex justify-center items-center text-[12px]" onClick={() => deleteMember(member.id)}>
            <IoTrashOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberListCard;
