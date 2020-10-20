import React, { useState, useContext } from 'react';
import { navigate } from '@reach/router';

import Zapp from '../assets/zappcopy.png';

import useOnclickOutside from 'react-cool-onclickoutside';

import Context from '../Context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { SERVER } from '../constants';

const TopBar = () => {
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
    <div className="bg-teal-500 flex p-2">
      <img
        onClick={navigateHome}
        onKeyDown={navigateHome}
        role="button"
        tabIndex={0}
        className="h-12 mr-8 cursor-pointer"
        alt="logo"
        src={Zapp}
      ></img>
      <h1 className="font-display text-3xl text-gray-100">Dashboard</h1>

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
          className="absolute right-0 top-0 mt-h-12 z-10 shadow-md bg-white flex flex-col cursor-pointer"
        >
          <div
            className="flex self-center hover:bg-gray-200"
            onClick={logout}
            onKeyDown={logout}
            role="button"
            tabIndex={0}
          >
            <FontAwesomeIcon icon={faSignOutAlt} size={'lg'} className="m-3" />
            <div className="self-center mr-4">Logout</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
