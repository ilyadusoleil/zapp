import React from 'react';

import { RouteComponentProps } from '@reach/router';

import useCreateProject from '../hooks/useCreateProject';

import ProjectForm from '../components/ProjectForm';

const ProjectCreate = (_props: RouteComponentProps) => { // eslint-disable-line @typescript-eslint/no-unused-vars
  const [createProject, { status: createProjectStatus }] = useCreateProject();

  return (
    <>
      <h1>New Project</h1>
      <ProjectForm
        onSubmit={createProject}
        submitRoute="/preDashboard"
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
