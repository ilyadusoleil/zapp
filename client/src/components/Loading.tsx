import React from 'react';

import Zapp from '../assets/zappcopy.png';

const Loading = () => {
  return (
    <div className="flex flex-col items-center mt-5">
      <div className="rounded-full bg-teal-500">
        <img className="h-24 m-auto animate-pulse" alt="logo" src={Zapp}></img>
      </div>
      <div>Loading...</div>
    </div>
  );
};

export default Loading;
