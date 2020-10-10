import React from 'react';
import { MutateFunction } from 'react-query';
import { BugInput, Bug } from '../types/Bug';

const defaultFormValues = {
  title: '',
  description: '',
  priority: 'medium',
};

const PostForm = ({
  onSubmit,
  submitText,
  initialValues = defaultFormValues,
}: {
  onSubmit: MutateFunction<Bug, unknown, { bug: BugInput }, unknown>;
  submitText: string;
  initialValues: BugInput;
}) => {
  const [values, setValues] = React.useState(initialValues);

  const setValue = (field: string, value: string) =>
    setValues((old) => ({ ...old, [field]: value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setValues(defaultFormValues);
    e.preventDefault();
    onSubmit({ bug: values });
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

export default PostForm;
