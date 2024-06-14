import React from 'react';

const Container = ({ children }) => {
  return (
    <div id="container" className="relative w-full h-full">
      {children}
    </div>
  );
};

export default Container;
