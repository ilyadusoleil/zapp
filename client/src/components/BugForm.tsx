import React, { useContext, useState, useEffect } from 'react';
import { MutateFunction } from 'react-query';
import { BugInput, Bug } from '../types/Bug';
import Context from '../Context';
import { navigate } from '@reach/router';
import { PrioritySelect } from './Priority';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';

const defaultFormValues = {
  title: '',
  projectId: -1,
  description: '',
  priority: 1,
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
    e.preventDefault();
    const valuesCopy = Object.assign({}, values, {
      projectId: ctx.state.currentProjectId,
    });
    onSubmit(valuesCopy);
    setValues(defaultFormValues);
    if (submitRoute) {
      navigate(submitRoute);
    }
  };

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  return (
    <div className="w-1/3 mt-16 font-display shadow-2xl rounded">
      <div className="flex mt-8">
        <FontAwesomeIcon
          icon={faBug}
          size={'3x'}
          className="text-gray-700 m-auto"
        />
      </div>
      <h1 className="text-center font-display text-2xl mt-6">Add new bug...</h1>
      <form
        className="m-6 border-2 border-purple-600 rounded-lg bg-gray-100 p-8"
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
            className="h-32 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        <div className="flex justify-between">
          <PrioritySelect prioityValue={values.priority} setValue={setValue} />
          <br />
          <div>
            <button
              className="shadow bg-purple-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              {submitText}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BugForm;
