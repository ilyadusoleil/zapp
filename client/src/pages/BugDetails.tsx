import React, {useContext} from 'react';

import { Link, RouteComponentProps } from '@reach/router';

import useBug from '../hooks/useBug';
import useEditBug from '../hooks/useEditBug';

import BugEditForm from '../components/BugEditForm';

import Context from '../Context'

const BugDetails = () => {
  const ctx = useContext(Context);
  const { isLoading, isError, data } = useBug(ctx.state.bugModalId);

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
