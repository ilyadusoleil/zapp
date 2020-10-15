import React from 'react';
import { navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {
  faHome,
  faPlus,
  faListAlt,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

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
  return (
    <div className="inset-y-0 left-0 bg-indigo-200 h-screen w-14 fixed flex flex-col">
      {sidebarData.map((sidebarItem, idx) => (
        <SidebarButton
          key={idx}
          icon={sidebarItem.icon}
          route={sidebarItem.path}
          isActive={currentPath ? currentPath === sidebarItem.path : false} // Ternary operator to prevent highlighting of unmapped paths when currentPath isn't defined
        />
      ))}
    </div>
  );
};

export default Sidebar;
