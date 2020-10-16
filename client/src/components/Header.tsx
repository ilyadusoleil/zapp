import React, { useContext, useState } from 'react';
import Logo from '../assets/zapp.png';

import Context from '../Context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { SERVER } from '../constants';

const Header = () => {
  const ctx = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    ctx.dispatch({type: 'logout'});
    window.open(`${SERVER}/auth/logout`, '_self');
  }

  return (
    <div>
      <div className="inset-x-0 top-0 bg-gray-200 h-12 flex">
        <img src={Logo} className="h-12 ml-1 self-center"></img>
        {ctx.state.user && ctx.state.user.image && (
          <img
            className="ml-auto mr-3 h-8 self-center rounded-full cursor-pointer"
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
        <div
          className="absolute right-0 mr-2 h-12 z-10 shadow-md bg-white flex flex-col cursor-pointer"
        >
          <div className="flex self-center hover:bg-gray-200" onClick={logout}>
            <FontAwesomeIcon icon={faSignOutAlt} size={'lg'} className="m-3" />
            <div className="self-center mr-4">Logout</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
