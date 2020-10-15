import React, { useContext, useState, useEffect } from 'react';
import { MutateFunction } from 'react-query';
import { BugInput, Bug } from '../types/Bug';
import Context from '../Context';
import { navigate } from '@reach/router';

const defaultFormValues = {
  title: '',
  projectId: -1,
  description: '',
  priority: 2,
  state: 0,
};

const BugForm = ({
  onSubmit,
  submitText,
  submitRoute,
  initialValues = defaultFormValues,
}: {
  onSubmit: MutateFunction<Bug, unknown, BugInput, unknown>;
  submitText: string;
  submitRoute?: string;
  initialValues?: BugInput;
}) => {
  const ctx = useContext(Context);
  const [values, setValues] = useState(initialValues);

  const setValue = (field: string, value: string) =>
    setValues((old) => ({ ...old, [field]: value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setValues(defaultFormValues);
    e.preventDefault();
    const valuesCopy = Object.assign({}, values, {
      projectId: ctx.state.currentProjectId,
    });
    onSubmit(valuesCopy);
    if (submitRoute) {
      navigate(submitRoute);
    }
  };

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  return (
    <form
      className="m-10 ml-0 border-2 border-indigo-200 rounded-lg bg-gray-100 p-10 "
      onSubmit={handleSubmit}
    >
      <label
        className="mt-8 pb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold"
        htmlFor="title"
      >
        Title
      </label>
      <div>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="title"
          value={values.title}
          onChange={(e) => setValue('title', e.target.value)}
          required
        />
      </div>
      <br />
      <label
        className="mt-10 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="description"
      >
        Description
      </label>
      <div>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="description"
          value={values.description}
          onChange={(e) => setValue('description', e.target.value)}
          required
        />
      </div>

      <label
        className="mt-10 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="priority"
      >
        Priority
      </label>
      <div className="inline-block relative w-32">
        <select
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          name="priority"
          value={values.priority}
          onChange={(e) => setValue('priority', e.target.value)}
          required
        >
          <option></option>
          <option value={1}>High</option>
          <option value={2}>Medium</option>
          <option value={3}>Low</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <br />
      <div className="flex">
        <button
          className="mt-10 ml-auto shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
};

export default BugForm;
