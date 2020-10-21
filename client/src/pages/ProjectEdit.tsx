import React from 'react';

import { RouteComponentProps } from '@reach/router';

import useProject from '../hooks/useProject';
import useEditProject from '../hooks/useEditProject'; // TODO write this

import ProjectEditForm from '../components/ProjectEditForm';
import Loading from '../components/Loading';
import ErrorComponent from '../components/ErrorComponent';

interface ProjectEditProps extends RouteComponentProps {
  id?: string;
}

const ProjectEdit = ({ id }: ProjectEditProps) => {
  if (!id) id = '0';

  const { isLoading, isError, data } = useProject(parseInt(id));

  const [editProject, { status: editProjectStatus }] = useEditProject();

  if (isLoading) return <Loading />;

  if (isError || !data) return <ErrorComponent />;

  return (
    <>
      <ProjectEditForm
        onSubmit={editProject}
        submitRoute={`/dashboard/${id}`}
        submitText={
          editProjectStatus === 'loading'
            ? 'Saving...'
            : editProjectStatus === 'error'
            ? 'Error!'
            : editProjectStatus === 'success'
            ? 'Saved!'
            : 'Edit Project'
        }
        initialValues={data}
      />
    </>
  );
};

export default ProjectEdit;
