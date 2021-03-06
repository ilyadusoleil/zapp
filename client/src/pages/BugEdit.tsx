import React from 'react';

import { RouteComponentProps } from '@reach/router';

import useBug from '../hooks/useBug';

import useEditBug from '../hooks/useEditBug';

import BugForm from '../components/BugForm';
import Loading from '../components/Loading';
import ErrorComponent from '../components/ErrorComponent';

interface BugEditProps extends RouteComponentProps {
  id?: string;
}

const BugEdit = ({ id }: BugEditProps) => {
  if (!id) id = '0';

  const { isLoading, isError, data } = useBug(parseInt(id));

  const [editBug, { status: editBugStatus }] = useEditBug();

  if (isLoading) return <Loading />;

  if (isError || !data) return <ErrorComponent />;

  return (
    <>
      <BugForm
        onSubmit={editBug}
        headerText="Edit"
        submitRoute={`/details/${id}`}
        submitText={
          editBugStatus === 'loading'
            ? 'Saving...'
            : editBugStatus === 'error'
            ? 'Error!'
            : editBugStatus === 'success'
            ? 'Saved!'
            : 'Edit Issue'
        }
        initialValues={data}
      />
    </>
  );
};

export default BugEdit;
