/*
  Will always redirect to this page, and if there are open projects, 
  it will automatically redirect to Dashboard.tsx
*/

import React, { useEffect, useContext } from 'react';

import { RouteComponentProps, navigate } from '@reach/router';

import useProjects from '../hooks/useProjects';
import useCreateProject from '../hooks/useCreateProject';

import ProjectForm from '../components/ProjectForm';

import Context from '../Context';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PreDashboard = (_props: RouteComponentProps) => {
  const ctx = useContext(Context);
  const { isLoading, isError, data: projectsData } = useProjects(
    ctx.state.userId
  );

  const [createProject, { status: createProjectStatus }] = useCreateProject();

  useEffect(() => {
    if (projectsData && projectsData.filter((el) => el.state != 1).length > 0) {
      //navigate to the currently active project if it exists
      //First check global context, but if that isn't set, get from database
      console.log('PREDASHBOARD PROJECTS ', projectsData)
      if (
        projectsData.filter((el) => el.id == ctx.state.currentProjectId)
          .length > 0
      ) {
        console.log('found matching project in context')
        navigate(`/dashboard/${ctx.state.currentProjectId}`);
        
      } else if (
        ctx.state.user &&
        projectsData.filter((el) => el.id == ctx.state.user?.recentProject)
          .length > 0
      ) {
        console.log('found matching project in db recent project')
        ctx.dispatch({
          type: 'setCurrentProjectId',
          payload: ctx.state.user?.recentProject,
        });
        navigate(`/dashboard/${ctx.state.user.recentProject}`);
      } else {
        console.log('unable to find project so will default to first')
        ctx.dispatch({
          type: 'setCurrentProjectId',
          payload: projectsData[0].id,
        });
        navigate(`/dashboard/${projectsData[0].id}`); //TODO: don't just go to the first created project, but the most recently used project?
      }
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
      />
    </div>
  );
};

export default PreDashboard;
