// TODO fix babel so it'll parse emotion correctly and then can remove some of these eslint
/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react'; // eslint-disable-line @typescript-eslint/no-unused-vars

import { navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types'; // eslint-disable-line import/no-unresolved
import {
  faHome,
  faPlus,
  faListAlt,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

import { css } from '@emotion/core';

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
  return (
    <div
      className="bottom-0 left-0 bg-indigo-200 w-14 fixed flex flex-col"
      css={css`
        top: 3rem;
      `}
    >
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
