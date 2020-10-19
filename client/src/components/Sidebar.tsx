import React, { useState, useContext } from 'react';

import { navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types'; // eslint-disable-line import/no-unresolved
import {
  faHome,
  faPlus,
  faListAlt,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

import Context from '../Context';
import { isJsxOpeningElement } from 'typescript';

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
          className="ml-auto mr-3 h-8 self-center"
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          onKeyDown={() => setIsUserMenuOpen(!isUserMenuOpen)}
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
    </div>
  );
};

export default Sidebar;
