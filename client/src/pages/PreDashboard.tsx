/*
  Will always redirect to this page, and if there are open projects, 
  it will automatically redirect to Dashboard.tsx
*/

import React, { useEffect,useState, useContext } from 'react';

import { RouteComponentProps, navigate } from '@reach/router';

import useProjects from '../hooks/useProjects';
import useCreateProject from '../hooks/useCreateProject';

import ProjectForm from '../components/ProjectForm';
import Loading from '../components/Loading';

import Context from '../Context';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PreDashboard = (_props: RouteComponentProps) => {
  const ctx = useContext(Context);
  const { isLoading, isError, data: projectsData } = useProjects(
    ctx.state.userId
  );
  const [isEffect, setIsEffect] = useState(false); // for if the componentDidMount useEffect hook has completed

  const [createProject, { status: createProjectStatus }] = useCreateProject();

  useEffect(() => {
    if (projectsData && projectsData.filter((el) => el.state != 1).length > 0) {
      //navigate to the currently active project if it exists
      //First check global context, but if that isn't set, get from database
      if (
        projectsData.filter((el) => el.id == ctx.state.currentProjectId)
          .length > 0
      ) {
        navigate(`/dashboard/${ctx.state.currentProjectId}`);
      } else if (
        ctx.state.user &&
        projectsData.filter((el) => el.id == ctx.state.user?.recentProject)
          .length > 0
      ) {
        ctx.dispatch({
          type: 'setCurrentProjectId',
          payload: ctx.state.user?.recentProject,
        });
        navigate(`/dashboard/${ctx.state.user.recentProject}`);
      } else {
        ctx.dispatch({
          type: 'setCurrentProjectId',
          payload: projectsData[0].id,
        });
        navigate(`/dashboard/${projectsData[0].id}`); //TODO: don't just go to the first created project, but the most recently used project?
      }
      setIsEffect(true)
    }
  }, [projectsData]);

  if (isLoading || !isEffect) {
    return <Loading/>;
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
