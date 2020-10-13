import React from 'react';

import { Link, RouteComponentProps } from '@reach/router';

import useCreateProject from '../hooks/useCreateProject';

import ProjectForm from '../components/ProjectForm';

const ProjectCreate = (_props: RouteComponentProps) => {
  const [createProject, { status: createProjectStatus }] = useCreateProject();

  return (
    <>
      <h1>New Project</h1>
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
      />
      <Link to="/dashboard">Home</Link>
    </>
  );
};

export default ProjectCreate;
