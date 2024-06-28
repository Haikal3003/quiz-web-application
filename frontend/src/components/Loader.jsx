import React from 'react';

const Loader = () => {
  return (
    <div className="absolute w-full h-screen bg-white flex justify-center items-center">
      <div className="loader"></div>
      <span className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-[60%]">Loading...</span>
    </div>
  );
};

export default Loader;
