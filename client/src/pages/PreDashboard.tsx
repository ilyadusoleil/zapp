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
      ctx.dispatch({
        type: 'updateCurrentProject',
        payload: projectsData[0].id,
      });
      navigate('/dashboard');
    }
  }, [projectsData]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError || !projectsData) {
    return <span>Predashboard Error: </span>;
  }

  return (
    <div className="m-20">
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
            : 'Create your first project'
        }
        submitRoute="/dashboard"
      />
    </div>
  );
};

export default PreDashboard;
