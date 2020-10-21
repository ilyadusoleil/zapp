import React from 'react';

import { RouteComponentProps } from '@reach/router';

import useCreateBug from '../hooks/useCreateBug';

import BugForm from '../components/BugForm';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BugCreate = (_props: RouteComponentProps) => {
  const [createBug, { status: createBugStatus }] = useCreateBug();

  return (
    <BugForm
      onSubmit={createBug}
      headerText="Add New Issue..."
      submitRoute="/preDashboard"
      submitText={
        createBugStatus === 'loading'
          ? 'Saving...'
          : createBugStatus === 'error'
          ? 'Error!'
          : createBugStatus === 'success'
          ? 'Saved!'
          : 'New Issue'
      }
    />
  );
};

export default BugCreate;
