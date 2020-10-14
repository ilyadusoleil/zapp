import React, { useContext } from 'react';
import { MutateFunction } from 'react-query';
import { Bug } from '../types/Bug';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import Context from '../Context';

const defaultFormValues = {
  id: 0,
  project_Id: 0, // TOOD: get correct type
  title: '',
  description: '',
  priority: 1,
  state: 0,
  created_At: new Date(),
};

const BugEditForm = ({
  onSubmit,
  submitText,
  initialValues = defaultFormValues,
}: {
  onSubmit: MutateFunction<Bug, unknown, Bug, unknown>;
  submitText: string;
  initialValues: Bug;
}) => {
  const ctx = useContext(Context);
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
      created_At: values.created_At,
      project_Id: values.project_Id,
      // user_Id: values.,
      id: values.id,
    };

    onSubmit(processedValues);
    ctx.dispatch({ type: 'closeBugModal' });
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
        <input
          type="text"
          name="priority"
          value={values.priority}
          onChange={(e) => setValue('priority', e.target.value)}
          required
        />
        <br />
        <button type="submit" className="self-start">
          {submitText}
        </button>
      </form>
      <FontAwesomeIcon
        onClick={() => ctx.dispatch({ type: 'closeBugModal' })}
        icon={faTimesCircle}
        size={'lg'}
        className="mr-10 text-gray-900"
      />
    </div>
  );
};

export default BugEditForm;
