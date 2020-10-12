import React, { useState } from 'react';
import { Collapse } from 'react-collapse';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {
  faBuilding as icon,
  faPlus as plus
} from '@fortawesome/free-solid-svg-icons';


// import { queryCache } from 'react-query';
// import {Project} from '../types/Project';
import useProjects from '../hooks/useProjects';

const ProjectHeader = () => {
  const USER_ID = 1;
  const [isOpened, setIsOpened] = useState(false);
  const { isLoading, isError, data } = useProjects(USER_ID);
  // const data: Project[] | undefined = queryCache.getQueryData(['project', '1']);

  if (!data) return <h1>Oh no</h1>;

  return (
    <>
      <div
        onClick={() => setIsOpened(!isOpened)}
        className="bg-gray-100 p-5 flex justify-items cursor-pointer"
      >
        <div className="text-lg">{data[0].title}</div>
      </div>

      <Collapse isOpened={isOpened}>
        {data.filter((project) => project.id != USER_ID).map((project) => (
          <div key={project.id} className="h-10 flex items-center">
            <FontAwesomeIcon icon={icon} size={'lg'} className="m-3"/>
            <p>{project.title}</p>
          </div>
        ))}
        <div className="h-10 flex items-center">
            <FontAwesomeIcon icon={plus} size={'lg'} className="m-3"/>
            <p>New Project</p>
          </div>
      </Collapse>
    </>
  );
};

export default ProjectHeader;
