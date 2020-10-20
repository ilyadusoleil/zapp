import React from 'react';
import { ProjectInput } from '../types/Project';
import { BUTTON_STYLE, FORM_LABEL } from '../constants';

const ProjectDetailsSubForm = ({
  values,
  setValue,
}: {
  values: Omit<ProjectInput, 'projectUsers'>;
  setValue: (field: string, value: string | number) => void;
}) => {
  return (
    <>
      <label className={`${FORM_LABEL}`} htmlFor="name">Name</label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name="name"
        value={values.name}
        onChange={(e) => setValue('name', e.target.value)}
        required
      />
      <label className={`${FORM_LABEL}`} htmlFor="description">Description</label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name="description"
        value={values.description}
        onChange={(e) => setValue('description', e.target.value)}
      />
    </>
  );
};

export default ProjectDetailsSubForm;
