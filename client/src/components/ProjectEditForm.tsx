import React, { useState, useEffect, useContext } from 'react';
import { MutateFunction } from 'react-query';
import { ProjectInput, Project } from '../types/Project';
import Context from '../Context';
import { navigate } from '@reach/router';

import EmailChips from './EmailChips';

const initialProjectUser: (string | number)[] = [];

const ProjectEditForm = ({
  onSubmit,
  submitText,
  submitRoute,
  initialValues,
}: {
  onSubmit: MutateFunction<Project, unknown, ProjectInput, unknown>;
  submitText: string;
  submitRoute?: string;
  initialValues?: Omit<ProjectInput, 'projectUsers'>;
}) => {
  const [values, setValues] = useState(initialValues);
  const [projectUsers, setProjectUsers] = useState(initialProjectUser);
  const ctx = useContext(Context);

  // const setValue = (field: string, value: string | (string | number)[]) =>
  const setValue = (field: string, value: string) =>
    setValues((old) => ({ ...old, [field]: value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valuesCopy = Object.assign({}, values, { projectUsers });
    onSubmit(valuesCopy);
    if (submitRoute) {
      navigate(submitRoute);
    }
  };

  useEffect(() => {
    console.log(initialValues);
    setValues(initialValues);
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <div>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="name"
          value={values.name}
          onChange={(e) => setValue('name', e.target.value)}
          required
        />
      </div>
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

export default ProjectEditForm;
