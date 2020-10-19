import React, { useState, useEffect } from 'react';
import { MutateFunction } from 'react-query';
import { ProjectInput, Project } from '../types/Project';
import { navigate } from '@reach/router';

import EmailChips from './EmailChips';
import { BUTTON_STYLE } from '../constants';

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

  // const setValue = (field: string, value: string | number) =>
  const setValue = (field: string, value: string | number) =>
    setValues((old) => ({ ...old, [field]: value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valuesCopy = Object.assign({}, values, {
      projectUsers,
    });
    onSubmit(valuesCopy);
    if (submitRoute) {
      navigate(submitRoute);
    }
  };

  const archiveProject = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await setValue('state', 1);
    const form = document.getElementById('edit-project-form');
    if (form) {
      form.requestSubmit();
    }
  };

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  return (
    <form id="edit-project-form" onSubmit={handleSubmit}>
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
      <label htmlFor="description">Description</label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name="description"
        value={values.description}
        onChange={(e) => setValue('description', e.target.value)}
      ></input>
      <br />
      <EmailChips
        projectUsers={projectUsers}
        setProjectUsers={setProjectUsers}
      />
      <br />
      <div className="flex justify-between">
        <button className={`${BUTTON_STYLE}`} name="edit" type="submit">
          {submitText}
        </button>
        <button
          name="archive"
          className="mt-5 shadow bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={archiveProject}
        >
          Archive Project
        </button>
      </div>
    </form>
  );
};

export default ProjectEditForm;
