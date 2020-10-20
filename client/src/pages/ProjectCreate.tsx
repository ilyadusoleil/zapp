import React from 'react';

import { RouteComponentProps } from '@reach/router';

import useCreateProject from '../hooks/useCreateProject';

import ProjectForm from '../components/ProjectForm';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProjectCreate = (_props: RouteComponentProps) => {
  const [createProject, { status: createProjectStatus }] = useCreateProject();

  return (
    <>
      <h1 className='text-center font-display text-3xl mt-4'>Add new project...</h1>
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
    </>
  );
};

export default ProjectCreate;
