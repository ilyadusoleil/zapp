import React, { useState, useContext } from 'react';
import { navigate } from '@reach/router';

import Zapp from '../assets/zappcopy.png';

import useOnclickOutside from 'react-cool-onclickoutside';

import Context from '../Context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { SERVER } from '../constants';

const TopBar = ({ text }: { text: string }) => {
  const ctx = useContext(Context);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const ref = useOnclickOutside(() => {
    setIsUserMenuOpen(false);
  });

  const navigateHome = () => {
    navigate('/preDashboard');
  };

  const toggleUserMenuOpen = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const logout = () => {
    ctx.dispatch({ type: 'logout' });
    window.open(`${SERVER}/auth/logout`, '_self');
  };

  return (
    <div className="bg-gradient-to-r from-teal-700 to-teal-400 flex p-3">
      <div
        onClick={navigateHome}
        onKeyDown={navigateHome}
        role="button"
        tabIndex={0}
        className="mr-8 focus:outline-none"
      >
        <img className="h-12 cursor-pointer" alt="logo" src={Zapp} />
      </div>
      <h1 className="font-display font-bold text-4xl text-gray-100">{text}</h1>
      {ctx.state.user && ctx.state.user.image && (
        <div
          className="ml-auto mr-3 h-8 self-center ignore-onclickoutside"
          onClick={toggleUserMenuOpen}
          onKeyDown={toggleUserMenuOpen}
          role="button"
          tabIndex={0}
        >
          <img
            className="h-8 rounded-full cursor-pointer"
            alt="user profile"
            src={ctx.state.user.image}
          />
        </div>
      )}

      {isUserMenuOpen && (
        <div
          ref={ref}
          className="absolute right-0 top-0 mt-20 h-12 z-10 shadow-md bg-white flex flex-col cursor-pointer"
        >
          <div
            className="flex self-center hover:bg-gray-200"
            onClick={logout}
            onKeyDown={logout}
            role="button"
            tabIndex={0}
          >
            <FontAwesomeIcon icon={faSignOutAlt} size={'lg'} className="m-3 focus:outline-none" />
            <div className="self-center mr-4">Logout</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
