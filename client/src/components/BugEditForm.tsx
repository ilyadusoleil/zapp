import React from 'react';
import { MutateFunction } from 'react-query';
import { Bug } from '../types/Bug';
import { PrioritySelect } from './Priority';

import { navigate } from '@reach/router';

import { BUTTON_STYLE } from '../constants';

const defaultFormValues = {
  id: 0,
  projectId: 0, // TODO: get correct type
  title: '',
  description: '',
  priority: 1,
  state: 0,
  createdAt: new Date(),
};

const BugEditForm = ({
  onSubmit,
  submitText,
  submitRoute,
  initialValues = defaultFormValues,
}: {
  onSubmit: MutateFunction<Bug, unknown, Bug, unknown>;
  submitText: string;
  submitRoute?: string;
  initialValues: Bug;
}) => {
  const [values, setValues] = React.useState(initialValues);

  const setValue = (field: string, value: string) =>
    setValues((old) => ({ ...old, [field]: value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setValues(defaultFormValues);
    e.preventDefault();

    const processedValues = {
      title: values.title,
      description: values.description,
      state: values.state,
      priority: values.priority,
      createdAt: values.createdAt,
      projectId: values.projectId,
      id: values.id,
    };

    onSubmit(processedValues);
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
        <button type="submit" className={`${BUTTON_STYLE} self-start`}>
          {submitText}
        </button>
      </form>
    </div>
  );
};

export default BugEditForm;
