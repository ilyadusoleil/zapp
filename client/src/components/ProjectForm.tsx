import React, { useState, useEffect, useContext } from 'react';
import { MutateFunction } from 'react-query';
import { ProjectInput, Project } from '../types/Project';
import Context from '../Context';
import { navigate } from '@reach/router';

import useUpdateUserRecentProject from '../hooks/useUpdateUserRecentProject';

import ProjectDetailsSubForm from './ProjectDetailsSubForm';
import EmailChips from './EmailChips';

const defaultFormValues = {
  name: '',
  description: '',
  userId: 0,
  state: 0,
  projectUsers: [],
};

const initialProjectUser: (string | number)[] = [];

const ProjectForm = ({
  onSubmit,
  submitText,
  submitRoute,
  initialValues = defaultFormValues,
}: {
  onSubmit: MutateFunction<Project, unknown, ProjectInput, unknown>;
  submitText: string;
  submitRoute: string;
  initialValues?: Omit<ProjectInput, 'projectUsers'>;
}) => {
  const [values, setValues] = useState(initialValues);
  const [projectUsers, setProjectUsers] = useState(initialProjectUser);
  const [updateUserRecentProject] = useUpdateUserRecentProject();
  const ctx = useContext(Context);

  const setValue = (field: string, value: string | number) =>
    setValues((old) => ({ ...old, [field]: value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setValues(defaultFormValues);
    e.preventDefault();
    const valuesCopy = Object.assign(
      {},
      values,
      { projectUsers },
      { userId: ctx.state.userId }
    );
    onSubmit(valuesCopy).then((project) => {
      console.log('Newly created project', project, submitRoute);

      if (project) {
        ctx.dispatch({ type: 'setCurrentProjectId', payload: project.id });
        if (ctx.state.user) {
          updateUserRecentProject(
            Object.assign({}, ctx.state.user, { recentProject: project.id })
          );
        }
        navigate(`/dashboard/${project?.id}`);
      } else {
        navigate('/predashboard');
      }
    });
  };

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit}>
      <ProjectDetailsSubForm values={values} setValue={setValue} />
      <br />
      <EmailChips
        projectUsers={projectUsers}
        setProjectUsers={setProjectUsers}
      />
      <br />
      <button
        className="mt-10 ml-auto shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        {submitText}
      </button>
    </form>
  );
};

export default ProjectForm;
