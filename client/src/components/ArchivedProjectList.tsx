import React from 'react';
import dayjs from 'dayjs';

import { Project } from '../types/Project';
import { BUTTON_STYLE } from '../constants';

import useEditProject from '../hooks/useEditProject';

const ArchivedProjectList = ({
  archivedProjects,
}: {
  archivedProjects: Project[];
}) => {
  const [editProject, { status: editProjectStatus }] = useEditProject();

  const unarchiveProject = (project: Project) => {
    const updatedProject = {
      ...project,
      state: 0,
    };

    editProject(updatedProject);
  };

  return archivedProjects.map((project) => (
    <div
      key={project.id}
      className={`w-full my-10 flex-grow bg-gray-100 shadow-xl focus:outline-none`}
    >
      <div className="p-1 flex justify-items">
        <div className="flex ml-auto">
          <div className="p-2"></div>
        </div>
      </div>

      <div className="p-3 divide-y divide-gray-400 text-gray-800">
        <div className="flex align-middle justify-between text-base font-bold font-display capitalize mb-4">
          <span className="capitalize">{project.name}</span>
          <button
            className={`${BUTTON_STYLE}`}
            onClick={() => unarchiveProject(project)}
          >
            Unarchive
          </button>
        </div>
        <div className="">
          <h1 className="text-base font-bold font-display mt-4">Description</h1>
          <p className="py-2 tracking-wider font-body h-16 overflow-y-auto">
            {project.description}
          </p>
        </div>
      </div>
      <div className="flex p-1 mb-1">
        <div className="flex mt-2">
          <h1 className="font-bold font-body ml-2 text-center">
            Date created:
          </h1>
          <p className="ml-2 font-body space">
            {dayjs(project.createdAt).format('DD/MM/YYYY')}
          </p>
        </div>
        <div className="ml-auto mb-1 p-1 bg-gradient-to-r from-gray-200  to-gray-300 rounded-full"></div>
      </div>
    </div>
  ));
};

export default ArchivedProjectList;
