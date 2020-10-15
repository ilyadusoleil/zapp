import React, { useState, useContext, useEffect } from 'react';
import { Collapse } from 'react-collapse';
import { navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding as icon,
  faPlus as plus,
  faChevronDown as down,
  faChevronUp as up,
} from '@fortawesome/free-solid-svg-icons';

import Context from '../Context';

import useProjects from '../hooks/useProjects';

const ProjectHeader = ({projectId} : {projectId: number}) => {
  const ctx = useContext(Context);
  const [isOpened, setIsOpened] = useState(false);
  const { data } = useProjects(ctx.state.userId);

  const getIndexFromId = (id: number) => {
    if (!data) return 0;
    const res = data.findIndex((project) => project.id === id);
    if (res === -1) return 0;
    return res;
  };

  if (!data) return <h1>Oh no</h1>;

  return (
    <>
      <div
        onClick={() => setIsOpened(!isOpened)}
        className="bg-gray-100 p-5 flex justify-items cursor-pointer"
      >
        <div className="text-lg">
          {data[getIndexFromId(projectId)].name}
        </div>
        <FontAwesomeIcon
          icon={isOpened ? up : down}
          size={'lg'}
          className="ml-3"
        />
      </div>

      <Collapse isOpened={isOpened}>
        {data.map(
          (project) =>
            project.id != projectId && (
              <div
                key={project.id}
                className="h-10 flex items-center"
                onClick={() => {
                  navigate(`/dashboard/${project.id}`)
                }}
              >
                <FontAwesomeIcon icon={icon} size={'lg'} className="m-3" />
                <p>{project.name}</p>
              </div>
            )
        )}
        <div
          className="h-10 flex items-center"
          onClick={() => {
            navigate(`/newProject`, {
              state: { oldLocation: JSON.parse(JSON.stringify(location)) },
            });
          }}
        >
          <FontAwesomeIcon icon={plus} size={'lg'} className="m-3" />
          <p>New Project</p>
        </div>
      </Collapse>
    </>
  );
};

export default ProjectHeader;
