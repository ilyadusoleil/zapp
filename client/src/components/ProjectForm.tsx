import React, { useState, useEffect, useContext } from 'react';
import { MutateFunction } from 'react-query';
import { ProjectInput, Project } from '../types/Project';
import Context from '../Context';
import { navigate } from '@reach/router';

import ProjectDetailsSubForm from './ProjectDetailsSubForm';
import EmailChips from './EmailChips';
import { BUTTON_STYLE } from '../constants';

const defaultFormValues = {
  name: '',
  description: '',
  userId: 0,
  state: 0,
  projectUsers: []
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
  submitRoute?: string;
  initialValues?: Omit<ProjectInput, 'projectUsers'>;
}) => {
  const [values, setValues] = useState(initialValues);
  const [projectUsers, setProjectUsers] = useState(initialProjectUser);
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
    onSubmit(valuesCopy);
    if (submitRoute) {
      navigate(submitRoute);
    }
  };

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit}>
      <ProjectDetailsSubForm values={values} setValue={setValue}/>
      <br />
      <EmailChips
        projectUsers={projectUsers}
        setProjectUsers={setProjectUsers}
      />
      <br />
      <button
        className={`${BUTTON_STYLE}`}
      >
        {submitText}
      </button>
    </form>
  );
};

export default ProjectForm;
