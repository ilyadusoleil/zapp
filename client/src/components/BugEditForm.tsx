import React, { useState, useContext } from 'react';
import { MutateFunction } from 'react-query';
import { Bug } from '../types/Bug';
import { PrioritySelect } from './Priority';

import useUsers from '../hooks/useUsers';

import { navigate } from '@reach/router';

import { BUTTON_STYLE } from '../constants';

import Context from '../Context';

const BugEditForm = ({
  onSubmit,
  submitText,
  initialValues,
  submitRoute,
}: {
  onSubmit: MutateFunction<Bug, unknown, Bug, unknown>;
  submitText: string;
  initialValues: Bug;
  submitRoute?: string;
}) => {
  const [values, setValues] = useState(initialValues);
  const ctx = useContext(Context);
  const { data: userData } = useUsers(ctx.state.currentProjectId);

  const setValue = (field: string, value: string) =>
    setValues((old) => ({ ...old, [field]: value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // setValues(defaultFormValues);
    e.preventDefault();

    // const processedValues = {
    //   title: values.title,
    //   description: values.description,
    //   state: values.state,
    //   priority: values.priority,
    //   createdAt: values.createdAt,
    //   projectId: values.projectId,
    //   id: values.id,
    // };

    onSubmit(values);
    if (submitRoute) {
      navigate(submitRoute);
    }
  };

  React.useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  return (
    <div className="bg-gray-200 p-4">
      <form onSubmit={handleSubmit} className="flex flex-col align-stretch">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={(e) => setValue('title', e.target.value)}
          required
        />
        <br />
        <label htmlFor="description">Content</label>
        <textarea
          name="description"
          className="h-32 resize-none"
          value={values.description}
          onChange={(e) => setValue('description', e.target.value)}
          required
        />
        <br />
        <label htmlFor="priority">Priority</label>
        <PrioritySelect prioityValue={values.priority} setValue={setValue} />

        <label htmlFor="userId">Assigned User</label>
        <select
          name="userId"
          value={values.userId}
          onBlur={(e) => setValue('userId', e.target.value)}
          onChange={(e) => setValue('userId', e.target.value)}
        >
          <option value={undefined}>Assign User</option>
          {userData?.map((info, i) => (
            <option key={i} value={info.id}>
              {info.displayName || info.firstName || info.email}
            </option>
          ))}
        </select>
        <button type="submit" className={`${BUTTON_STYLE} self-start`}>
          {submitText}
        </button>
      </form>
    </div>
  );
};

export default BugEditForm;
