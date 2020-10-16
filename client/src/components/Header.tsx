import React, { useContext, useState } from 'react';
import Logo from '../assets/zapp.png';

import Context from '../Context';

const Header = () => {
  const ctx = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="inset-x-0 top-0 bg-gray-200 h-12 flex">
        <img src={Logo} className="h-12 ml-1 self-center"></img>
        {ctx.state.user && ctx.state.user.image && (
          <img
            className="ml-auto mr-3 h-8 self-center rounded-full"
            alt="user profile"
            src={ctx.state.user.image}
            onClick={() => {
              console.log('click');
              setIsOpen(!isOpen);
            }}
          />
        )}
      </div>
      {isOpen && (
        <div className="absolute right-0 mr-2 h-12 w-20 z-10 shadow-md bg-white flex flex-col">
          <div>
            <div>Logout</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
