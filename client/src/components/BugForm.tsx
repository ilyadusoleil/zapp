import React, { useContext, useState, useEffect } from 'react';
import { MutateFunction } from 'react-query';
import { BugInput, Bug } from '../types/Bug';
import Context from '../Context';
import { navigate } from '@reach/router';
import { PrioritySelect } from './Priority';

import useUsers from '../hooks/useUsers';
import { BUTTON_STYLE } from '../constants';

import Zapp from '../assets/zappcopy.png';

const defaultFormValues = {
  title: '',
  projectId: -1,
  description: '',
  priority: 1,
  category: 0,
  state: 0,
};

const issueCategories = ['Bug', 'Feature'];

const BugForm = ({
  onSubmit,
  headerText,
  submitText,
  submitRoute,
  initialValues = defaultFormValues,
}: {
  onSubmit: MutateFunction<Bug, unknown, any, unknown>;
  headerText: string;
  submitText: string;
  submitRoute: string;
  initialValues?: BugInput;
}) => {
  const ctx = useContext(Context);
  const [values, setValues] = useState(initialValues);

  const { data: userData } = useUsers(ctx.state.currentProjectId);

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
    <div className="font-display rounded">
      <div className="flex items-center justify-center">
        <div className="items-center rounded-full bg-gray-700">
          <img className="h-20 m-auto" alt="logo" src={Zapp}></img>
        </div>
      </div>
      <h1 className="text-center font-display text-2xl mt-4">{headerText}</h1>
      <form className="rounded-lg p-6 mt-2" onSubmit={handleSubmit}>
        <label
          className="mt-0 mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold"
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
          className="mt-0 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <div>
          <textarea
            className="h-24 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="description"
            value={values.description}
            onChange={(e) => setValue('description', e.target.value)}
            required
          />
        </div>
        <div className='flex flex-wrap justify-between'>
        <div >
        <label
          className="mt-8 pb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold"
          htmlFor="issueCategory"
        >
          Category
        </label>
        <div className="inline-block relative w-48">
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            name="issueCategory"
            value={values.category}
            onBlur={(e) => setValue('category', e.target.value)}
            onChange={(e) => setValue('category', e.target.value)}
          >
            {issueCategories.map((info, i) => (
              <option key={i} value={i}>
                {info}
              </option>
            ))}
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
        </div>

        <div>
        <label
          className="mt-8 pb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold"
          htmlFor="userId"
        >
          Assigned User
        </label>
        <div className="inline-block relative w-48">
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            name="userId"
            value={values.userId ? values.userId : -1}
            onBlur={(e) => setValue('userId', e.target.value)}
            onChange={(e) => setValue('userId', e.target.value)}
          >
            {/* Can't re-assign to Unassigned if already assigned */}
            {!values.userId && <option value={-1}>Unassigned</option>}{' '}
            {userData?.map((info, i) => (
              <option key={i} value={info.id}>
                {info.displayName || info.firstName || info.email}
              </option>
            ))}
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
        </div>
        
     

        <div>
        <label
          className="mt-8 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="priority"
        >
          Priority
        </label>
        <div>
          <PrioritySelect prioityValue={values.priority} setValue={setValue} />
        </div>
        </div>
        </div>
        <div className='flex'>
        <button className={`${BUTTON_STYLE} mt-6 ml-auto`} type="submit">
              {submitText}
            </button>
            </div>
      </form>
    </div>
    
  );
};

export default BugForm;
