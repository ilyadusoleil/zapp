import React, { useState, useContext } from 'react';

import { navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding as icon,
  faPlus as plus,
  faEdit as edit,
  faEllipsisH as menu,
} from '@fortawesome/free-solid-svg-icons';

import Context from '../Context';

import useProjects from '../hooks/useProjects';
import useUpdateUserRecentProject from '../hooks/useUpdateUserRecentProject';

import useOnclickOutside from 'react-cool-onclickoutside';

const ProjectHeader = ({ projectId }: { projectId: number }) => {
  const ctx = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useProjects(ctx.state.userId);

  const [updateUserRecentProject] = useUpdateUserRecentProject();

  const ref = useOnclickOutside(() => {
    setIsOpen(false);
  });

  const getIndexFromId = (id: number) => {
    if (!data) return 0;
    const res = data.findIndex((project) => project.id === id);
    if (res === -1) return 0;
    return res;
  };

  const openEditForm = () => {
    navigate(`/project/edit/${projectId}`, {
      state: { oldLocation: JSON.parse(JSON.stringify(location)) },
    });
  };

  const navigateToProject = (id: number) => {
    return () => {
      ctx.dispatch({ type: 'setCurrentProjectId', payload: id });
      updateUserRecentProject(
        Object.assign({}, ctx.state.user, { recentProject: id })
      );
      navigate(`/dashboard/${id}`);
    };
  };

  const toggleIsOpen = () => setIsOpen(!isOpen);

  const navigateToNewProject = () => {
    navigate(`/newProject`, {
      state: { oldLocation: JSON.parse(JSON.stringify(location)) },
    });
  };

  if (!data || !Array.isArray(data) || data.length < 1) return <h1>Oh no</h1>;

  return (
    <>
      <div className="bg-gray-100 p-3 flex justify-items">
        <div className="text-lg">{data[getIndexFromId(projectId)].name}</div>
        <FontAwesomeIcon
          onClick={toggleIsOpen}
          onKeyDown={toggleIsOpen}
          role="button"
          tabIndex={0}
          icon={menu}
          size={'lg'}
          className="mr-2 ml-auto ignore-onclickoutside duration-200 transition-transform transform hover:scale-125"
        />
      </div>

      {isOpen && (
        <div
          ref={ref}
          className={`absolute top-0 right-0 mt-20 mr-1 bg-white shadow-md`}
        >
          <div
            onClick={openEditForm}
            onKeyDown={openEditForm}
            role="button"
            tabIndex={0}
            className="hover:bg-gray-200 cursor-pointer py-3 pr-10"
          >
            <FontAwesomeIcon icon={edit} className="mx-3" size={'lg'} />
            Edit Project
          </div>

          <div className="mt-2 pt-1 ml-2 border-t-2">Switch Project</div>
          {[...data]
            .filter((el) => el.state != 1)
            .map(
            (project) =>
              project.id != projectId && (
                <div
                  key={project.id}
                  className="h-10 flex items-center hover:bg-gray-200 "
                  onClick={navigateToProject(project.id)}
                  onKeyDown={navigateToProject(project.id)}
                  role="button"
                  tabIndex={0}
                >
                  <FontAwesomeIcon icon={icon} size={'lg'} className="m-3" />
                  <p>{project.name}</p>
                </div>
              )
          )}
          <div
            className="h-10 flex items-center hover:bg-gray-200 "
            onClick={navigateToNewProject}
            onKeyDown={navigateToNewProject}
            role="button"
            tabIndex={0}
          >
            <FontAwesomeIcon icon={plus} size={'lg'} className="m-3" />
            <p>New Project</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectHeader;
