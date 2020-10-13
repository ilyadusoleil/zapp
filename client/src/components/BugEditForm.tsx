import { navigate } from '@reach/router';
import React from 'react';
import { MutateFunction } from 'react-query';
import { Bug } from '../types/Bug';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

const defaultFormValues = {
  id: 0,
  title: '',
  description: '',
  priority: 'medium',
};

type Props = {
  setModalIsOpen: (isModalOpen: boolean) => void;
};

const BugEditForm = (
  { setModalIsOpen }: Props,
  {
    onSubmit,
    submitText,
    initialValues = defaultFormValues,
  }: {
    onSubmit: MutateFunction<Bug, unknown, Bug, unknown>;
    submitText: string;
    initialValues: Bug;
  }
) => {
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
    <div className="bg-gray-200 w-72 p-4" style={{'width': '20rem'}}>
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
      <FontAwesomeIcon onClick={() => setModalIsOpen(false)} icon={faTimesCircle} size={'lg'} className="mr-10 text-gray-900" />
    </div>
  );
};

export default BugEditForm;
