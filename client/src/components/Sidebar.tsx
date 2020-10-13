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
  route,
}: {
  icon: IconDefinition;
  route?: string;
}) => {
  const handleClick = () => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <div
      className="self-stretch hover:bg-white cursor-pointer flex flex-col items-center"
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={icon} size={'lg'} className="m-3" />
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="inset-y-0 left-0 bg-indigo-200 h-screen w-14 fixed flex flex-col">
      <SidebarButton icon={faBars} />
      <SidebarButton icon={faHome} route="/dashboard" />
      <SidebarButton icon={faPlus} route="/new" />
      <SidebarButton icon={faListAlt} />
    </div>
  );
};

export default Sidebar;
