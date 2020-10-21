import React from 'react';

import nothinghere from '../assets/NothingHere.png';

const NothingHere = () => {
  return (
    <div className="flex flex-col items-center mt-4">
      <div>
        <img
          className="h-24 m-auto"
          alt="Nothing Here"
          src={nothinghere}
        ></img>
      </div>
      <div className="font-bold my-4">Nothing here currently...</div>
      <div>Create an issue above!</div>
    </div>
  );
};

export default NothingHere;
