import React, { useState, useContext, useEffect } from 'react';
import { Collapse } from 'react-collapse';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {
  faBuilding as icon,
  faPlus as plus,
} from '@fortawesome/free-solid-svg-icons';

import Context from '../Context';

import useProjects from '../hooks/useProjects';

const ProjectHeader = () => {
  const USER_ID = 1;
  const ctx = useContext(Context);
  const [isOpened, setIsOpened] = useState(false);
  const { isLoading, isError, data } = useProjects(USER_ID);

  const getIndexFromId = (id: number) => {
    if (!data) return 0;
    const res = data.findIndex((project) => project.id === id);
    if (res === -1) return 0;
    return res;
  };

  useEffect(() => {
    if (data && ctx.state.currentProjectId == 0) {
      ctx.dispatch({
        type: 'updateCurrentProject',
        payload: data[0].id,
      });
    }
  }, [data]);

  if (!data) return <h1>Oh no</h1>;

  return (
    <>
      <div
        onClick={() => setIsOpened(!isOpened)}
        className="bg-gray-100 p-5 flex justify-items cursor-pointer"
      >
        <div className="text-lg">
          {data[getIndexFromId(ctx.state.currentProjectId)].title}
        </div>
      </div>

      <Collapse isOpened={isOpened}>
        {data
          .map(
            (project) =>
              project.id != ctx.state.currentProjectId && (
                <div
                  key={project.id}
                  className="h-10 flex items-center"
                  onClick={() => {
                    ctx.dispatch({
                      type: 'updateCurrentProject',
                      payload: project.id,
                    });
                    setIsOpened(false);
                  }}
                >
                  <FontAwesomeIcon icon={icon} size={'lg'} className="m-3" />
                  <p>{project.title}</p>
                </div>
              )
          )}
        <div className="h-10 flex items-center">
          <FontAwesomeIcon icon={plus} size={'lg'} className="m-3" />
          <p>New Project</p>
        </div>
      </Collapse>
    </>
  );
};

export default ProjectHeader;
