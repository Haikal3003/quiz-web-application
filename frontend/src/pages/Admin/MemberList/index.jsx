import React, { useEffect, useState } from 'react';
import UserService from '../../../services/UserService';
import { BiDotsVertical, BiX } from 'react-icons/bi';
import DeleteModal from './DeleteModal';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [activeMemberId, setActiveMemberId] = useState(null);
  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [search, setSearch] = useState('');
  const [memberToDelete, setMemberToDelete] = useState(null);

  const filteredMembers = members.filter((member) => member.username.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const users = await UserService.getAllUsers();
        const members = users.filter((user) => user.role === 'member');
        setMembers(members);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMembers();
  }, []);

  const toggleMenu = (id) => {
    setActiveMemberId((prevId) => (prevId === id ? null : id));
  };

  const handleDeleteClick = (member) => {
    setMemberToDelete(member);
    setDeleteModalActive(true);
  };

  const handleCancelDelete = () => {
    setDeleteModalActive(false);
    setMemberToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await UserService.deleteUserById(memberToDelete.id);
      setMembers((prevMembers) => prevMembers.filter((member) => member.id !== memberToDelete.id));
      setDeleteModalActive(false);
      setMemberToDelete(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="admin-member-list" className="flex flex-col">
      <h1 id="heading">Member List</h1>
      <div className="w-full">
        <div className="w-full flex items-center gap-3 mb-5 ">
          <input type="text" placeholder="Search member..." className="bg-gray" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div id="member-list-container" className="flex flex-col gap-4">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <div key={member.id} className="w-full border-[1px] border-gray p-3 rounded-md flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div id="profile-image" className="w-[45px] h-[45px] rounded-full bg-slate-200"></div>
                <div>
                  <h2 className="text-[11px] font-bold">{member.username}</h2>
                  <span>{member.role}</span>
                </div>
              </div>
              <div className="w-[45px] h-[45px] text-[15px] border-[1px] border-slate-200 rounded-md flex justify-center items-center cursor-pointer" onClick={() => toggleMenu(member.id)}>
                {activeMemberId === member.id ? <BiX /> : <BiDotsVertical />}
              </div>

              {activeMemberId === member.id && (
                <div className="absolute right-[60px] rounded-md text-white">
                  <button id="view-profile-button" className="w-[140px] h-[45px] border-[1px] text-black border-slate-200 rounded-md mr-2">
                    Profile
                  </button>
                  <button id="delete-member-button" className="w-[140px] h-[45px] bg-red-400 hover:bg-red-500 transition rounded-md" onClick={() => handleDeleteClick(member)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-gray-500">No members found.</p>
        )}
      </div>

      {deleteModalActive && <DeleteModal member={memberToDelete} onCancel={handleCancelDelete} onConfirm={handleConfirmDelete} />}
    </section>
  );
};

export default MemberList;
