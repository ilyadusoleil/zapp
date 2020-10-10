import { navigate } from '@reach/router';
import React from 'react';
import { MutateFunction } from 'react-query';
import { Bug } from '../types/Bug';

const defaultFormValues = {
  id: 0,
  title: '',
  description: '',
  priority: 'medium',
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
  const [values, setValues] = React.useState(initialValues);

  const setValue = (field: string, value: string) =>
    setValues((old) => ({ ...old, [field]: value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setValues(defaultFormValues);
    e.preventDefault();
    onSubmit(values);
    navigate('/dashboard');
  };

  React.useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <div>
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={(e) => setValue('title', e.target.value)}
          required
        />
      </div>
      <br />
      <label htmlFor="description">Content</label>
      <div>
        <textarea
          name="description"
          value={values.description}
          onChange={(e) => setValue('description', e.target.value)}
          required
        />
      </div>

      <label htmlFor="priority">Title</label>
      <div>
        <input
          type="text"
          name="priority"
          value={values.priority}
          onChange={(e) => setValue('priority', e.target.value)}
          required
        />
      </div>
      <br />
      <button type="submit">{submitText}</button>
    </form>
  );
};

export default BugEditForm;
