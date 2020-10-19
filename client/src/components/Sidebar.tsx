import React, { useState, useContext, useRef } from 'react';

import { navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types'; // eslint-disable-line import/no-unresolved
import {
  faHome,
  faPlus,
  faListAlt,
  faBars,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

import { SERVER } from '../constants';

import useOnclickOutside from "react-cool-onclickoutside";

import Context from '../Context';

const SidebarButton = ({
  icon,
  isActive,
  route,
}: {
  icon: IconDefinition;
  isActive: boolean;
  route?: string;
}) => {
  const handleClick = () => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <div
      className={`self-stretch hover:bg-white cursor-pointer flex flex-col items-center ${
        isActive && 'bg-white'
      }`}
      onClick={handleClick}
      onKeyDown={handleClick}
      role="button"
      tabIndex={0}
    >
      <FontAwesomeIcon icon={icon} size={'lg'} className="m-3" />
    </div>
  );
};

type sidebarDataType = {
  icon: IconDefinition;
  path?: string;
};

const sidebarData: sidebarDataType[] = [
  {
    icon: faBars,
  },
  {
    icon: faHome,
    path: '/preDashboard',
  },
  {
    icon: faPlus,
    path: '/new',
  },
  {
    icon: faListAlt,
  },
];

const Sidebar = ({ currentPath }: { currentPath?: string }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const ctx = useContext(Context);


  const ref = useOnclickOutside(() => {
    setIsUserMenuOpen(false);
  });

  const toggleUserMenuOpen = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const logout = () => {
    ctx.dispatch({ type: 'logout' });
    window.open(`${SERVER}/auth/logout`, '_self');
  };

  return (
    <div className="bottom-0 left-0 bg-indigo-200 w-14 fixed flex flex-col top-0">
      {sidebarData.map((sidebarItem, idx) => (
        <SidebarButton
          key={idx}
          icon={sidebarItem.icon}
          route={sidebarItem.path}
          isActive={currentPath ? currentPath === sidebarItem.path : false} // Ternary operator to prevent highlighting of unmapped paths when currentPath isn't defined
        />
      ))}

      {ctx.state.user && ctx.state.user.image && (
        <div
          className="mt-auto mb-3 h-8 self-center ignore-onclickoutside"
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
        <div ref={ref} className="absolute left-0 bottom-0 ml-12 h-12 z-10 shadow-md bg-white flex flex-col cursor-pointer">
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

export default Sidebar;
