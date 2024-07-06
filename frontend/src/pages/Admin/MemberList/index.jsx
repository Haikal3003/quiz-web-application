import React, { useEffect, useState } from 'react';
import UserService from '../../../services/UserService';
import DeleteModal from './DeleteModal';
import { IoPencilOutline, IoTrashOutline } from 'react-icons/io5';

const MemberListPage = () => {
  const [members, setMembers] = useState([]);
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
      <div className="w-full mt-10">
        <div className="w-full flex items-center gap-3 mb-5 text-[14px] rounded-xl bg-darkTheme-gray">
          <input type="text" placeholder="Search member..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div id="member-list-container" className="grid grid-cols-2 gap-5">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <div key={member.id} className="w-full border-[1px] border-darkTheme-gray border-gray p-3 rounded-md flex items-center justify-between relative">
              <div className="flex items-center gap-6 w-full">
                <div id="profile-image" className="w-[60px] h-[50px] rounded-full bg-darkTheme-gray"></div>
                <div className="flex justify-between items-center w-full">
                  <div>
                    <h2 className="text-[15px] font-bold">{member.username}</h2>
                    <span className="text-[13px]">{member.role}</span>
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <div id="edit-user-button" className="w-[50px] h-[50px] border-[1px] border-darkTheme-gray rounded-full text-[13px] text-white flex justify-center items-center cursor-pointer hover:bg-darkTheme-gray">
                      <IoPencilOutline />
                    </div>
                    <div
                      id="delete-user-button"
                      className="w-[50px] h-[50px] border-[1px] border-darkTheme-gray rounded-full text-[13px] text-white flex justify-center items-center hover:bg-red-500 cursor-pointer"
                      onClick={() => handleDeleteClick(member)}
                    >
                      <IoTrashOutline />
                    </div>
                  </div>
                </div>
              </div>
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

export default MemberListPage;
