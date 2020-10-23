import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import useProjects from '../hooks/useProjects';
import Context from '../Context';
import { Project } from '../types/Project';

import ArchivedProjectList from '../components/ArchivedProjectList';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProjectArchive = (_props: RouteComponentProps) => {
  const [archivedProjects, setArchivedProjects] = useState([] as Project[]);
  const ctx = useContext(Context);
  const { data } = useProjects(ctx.state.userId);

  const handleData = (data: Project[] | undefined) => {
    if (data) {
      const archivedProjects = data?.filter((project) => project.state === 1);
      return archivedProjects;
    } else {
      return [];
    }
  };

  useEffect(() => {
    setArchivedProjects(handleData(data));
  }, [data]);

  return (
    <>
      <h1 className="text-center font-display text-3xl mt-4">
        Archived Projects
      </h1>
      <ArchivedProjectList archivedProjects={archivedProjects} />
    </>
  );
};

export default ProjectArchive;
