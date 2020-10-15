import React, { useEffect, useContext } from 'react';

import { RouteComponentProps, navigate } from '@reach/router';

import useProjects from '../hooks/useProjects';
import useCreateProject from '../hooks/useCreateProject';

import ProjectForm from '../components/ProjectForm';

import Context from '../Context';

const PreDashboard = (_props: RouteComponentProps) => {
  const ctx = useContext(Context);
  const { isLoading, isError, data: projectsData } = useProjects(
    ctx.state.userId
  );

  const [createProject, { status: createProjectStatus }] = useCreateProject();

  useEffect(() => {
    if (projectsData && projectsData.length > 0) {
      navigate('/dashboard');
    }
  }, []);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError || !projectsData) {
    return <span>Predashboard Error: </span>;
  }

  return (
    <>
      <div>Welcome to Zap!</div>
      <div>Create your first project below</div>
      <ProjectForm
        onSubmit={createProject}
        submitText={
          createProjectStatus === 'loading'
            ? 'Saving...'
            : createProjectStatus === 'error'
            ? 'Error!'
            : createProjectStatus === 'success'
            ? 'Saved!'
            : 'New Project'
        }
        submitRoute="/dashboard"
      />
    </>
  );
};

export default PreDashboard;