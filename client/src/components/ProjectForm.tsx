import React, { useState, useEffect, useContext } from 'react';
import { MutateFunction } from 'react-query';
import { ProjectInput, Project } from '../types/Project';
import Context from '../Context';
import { navigate } from '@reach/router';

const defaultFormValues = {
  name: '',
  description: '',
  userId: 'nouser',
};

const ProjectForm = ({
  onSubmit,
  submitText,
  submitRoute,
  initialValues = defaultFormValues,
}: {
  onSubmit: MutateFunction<Project, unknown, ProjectInput, unknown>;
  submitText: string;
  submitRoute?: string;
  initialValues?: ProjectInput;
}) => {
  const [values, setValues] = useState(initialValues);
  const ctx = useContext(Context);

  const setValue = (field: string, value: string) =>
    setValues((old) => ({ ...old, [field]: value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setValues(defaultFormValues);
    e.preventDefault();
    const valuesCopy = Object.assign({}, values, { userId: ctx.state.userId });
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
