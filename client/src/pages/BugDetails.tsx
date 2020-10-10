import React from 'react';

import { Link, RouteComponentProps } from '@reach/router';

import useBug from '../hooks/useBug';
import useEditBug from '../hooks/useEditBug';

import BugEditForm from '../components/BugEditForm';

interface BugDetailsProps extends RouteComponentProps {
  id?: string;
}

const BugDetails = (props: BugDetailsProps) => {
  if (!props.id) return <h1>No ID</h1>;

  const { isLoading, isError, data } = useBug(props.id);

  const [editBug, { status: editBugStatus }] = useEditBug();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError || !data) {
    return <span>Error: </span>;
  }

  return (
    <>
      <h1>Edit</h1>
      <BugEditForm
        onSubmit={editBug}
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
      <Link to="/dashboard">Home</Link>
    </>
  );
};

export default BugDetails;
