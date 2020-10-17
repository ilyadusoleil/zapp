import React, { useState, useContext } from 'react';
import { Collapse } from 'react-collapse';
import { navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding as icon,
  faPlus as plus,
  faChevronDown as down,
  faChevronUp as up,
  faEdit as edit,
} from '@fortawesome/free-solid-svg-icons';

import Context from '../Context';

import useProjects from '../hooks/useProjects';

const ProjectHeader = ({ projectId }: { projectId: number }) => {
  const ctx = useContext(Context);
  const [isOpened, setIsOpened] = useState(false);
  const { data } = useProjects(ctx.state.userId);

  const getIndexFromId = (id: number) => {
    if (!data) return 0;
    const res = data.findIndex((project) => project.id === id);
    if (res === -1) return 0;
    return res;
  };

  const openEditForm = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/project/edit/${projectId}`, {
      state: { oldLocation: JSON.parse(JSON.stringify(location)) },
    });
  };

  if (!data) return <h1>Oh no</h1>;

  return (
    <>
      <div
        onClick={() => setIsOpened(!isOpened)}
        onKeyDown={() => setIsOpened(!isOpened)}
        role="button"
        tabIndex={0}
        className="bg-gray-100 p-3 flex justify-items cursor-pointer"
      >
        <FontAwesomeIcon
          icon={edit}
          className="mx-3 mt-2"
          onClick={openEditForm}
        />
        <div className="text-lg">{data[getIndexFromId(projectId)].name}</div>
        <FontAwesomeIcon
          icon={isOpened ? up : down}
          size={'lg'}
          className="ml-3 mt-1"
        />
      </div>

      <Collapse isOpened={isOpened}>
        {data.map(
          (project) =>
            project.id != projectId && (
              <div
                key={project.id}
                className="h-10 flex items-center"
                onClick={() => navigate(`/dashboard/${project.id}`)}
                onKeyDown={() => navigate(`/dashboard/${project.id}`)}
                role="button"
                tabIndex={0}
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
          onKeyDown={() => {
            navigate(`/newProject`, {
              state: { oldLocation: JSON.parse(JSON.stringify(location)) },
            });
          }}
          role="button"
          tabIndex={0}
        >
          <FontAwesomeIcon icon={plus} size={'lg'} className="m-3" />
          <p>New Project</p>
        </div>
      </Collapse>
    </>
  );
};

export default ProjectHeader;
