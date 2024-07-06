import React from 'react';

const DeleteModal = ({ member, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="border-[1px] border-darkTheme-gray bg-darkTheme-primary w-1/2 h-auto  text-center rounded-lg shadow-lg p-8">
        <h2 className="text-[20px] font-semibold my-20">Delete member {member?.username}?</h2>
        <div className="flex justify-center items-center gap-4 mb-20 ">
          <button className="px-20 py-6 bg-gray-200 text-gray-700 rounded hover:bg-gray-300" onClick={onCancel}>
            Cancel
          </button>
          <button className="px-20 py-6 bg-red-500 text-white rounded hover:bg-red-600" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
