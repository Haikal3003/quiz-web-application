import React from 'react';

const DeleteModal = ({ member, onCancel, onConfirm }) => {
  return (
    <div className="fixed w-[50%] h-[20%] bg-white rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md">
      <div className="flex flex-col items-center text-center p-3 ">
        <h2 className="text-[16px] mb-6">Delete member {member?.username}?</h2>
        <div className="flex justify-center items-center gap-5">
          <button id="cancel-button" className="w-[150px] h-[45px] flex justify-center items-center border-[1px] border-slate-200 rounded-xl" onClick={onCancel}>
            Cancel
          </button>
          <button id="confirm-button" className="w-[150px] h-[45px] flex justify-center items-center bg-red-400 hover:bg-red-500 text-white rounded-xl" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
