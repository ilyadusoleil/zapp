import React, { useState, useEffect, useContext } from 'react';
import { MutateFunction } from 'react-query';
import { Project } from '../types/Project';
import { navigate } from '@reach/router';
import Context from '../Context';

import ProjectDetailsSubForm from './ProjectDetailsSubForm';
import EmailChips from './EmailChips';
import { BUTTON_STYLE } from '../constants';

const initialProjectUser: (string | number)[] = [];

const ProjectEditForm = ({
  onSubmit,
  submitText,
  submitRoute,
  initialValues,
}: {
  onSubmit: MutateFunction<Project, unknown, Project, unknown>;
  submitText: string;
  submitRoute?: string;
  initialValues: Omit<Project, 'projectUsers'>;
}) => {
  const [values, setValues] = useState(initialValues);
  const [projectUsers, setProjectUsers] = useState(initialProjectUser);
  const ctx = useContext(Context);

  const setValue = (field: string, value: string | number) =>
    setValues((old) => ({ ...old, [field]: value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  const archiveProject = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await setValue('state', 1);
    const form = document.querySelector('form');
    if (form) {
      form.requestSubmit();
    }
  };

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  return (
      <div>
          <h1 className='text-center font-display text-2xl mt-4'>Edit your project...</h1>
    <form className='mt-8' id="edit-project-form" onSubmit={handleSubmit}>
      <ProjectDetailsSubForm values={values} setValue={setValue}/>
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
          className="shadow font-body bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={archiveProject}
        >
          Archive Project
        </button>
      </div>
    </form>
    </div>
  );
};

export default ProjectEditForm;
