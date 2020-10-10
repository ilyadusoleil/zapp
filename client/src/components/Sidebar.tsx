import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {
  faHome,
  faPlus,
  faListAlt,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

const SidebarButton = ({ icon }: { icon: IconDefinition }) => {
  return (
    <div className="self-stretch hover:bg-white cursor-pointer flex flex-col items-center">
      <FontAwesomeIcon icon={icon} size={'2x'} className="m-3" />
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="inset-y-0 left-0 bg-blue-300 h-screen w-14 fixed flex flex-col">
      <SidebarButton icon={faBars} />
      <SidebarButton icon={faHome} />
      <SidebarButton icon={faPlus} />
      <SidebarButton icon={faListAlt} />
    </div>
  );
};

export default Sidebar;
