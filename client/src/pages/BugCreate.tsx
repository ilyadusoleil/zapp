import React from 'react';

import { Link, RouteComponentProps } from '@reach/router';

import useCreateBug from '../hooks/useCreateBug';

import BugForm from '../components/BugForm';
import Sidebar from '../components/Sidebar';

const BugCreate = (_props: RouteComponentProps) => {
  const [createBug, { status: createBugStatus }] = useCreateBug();

  return (
    <>
      <Sidebar currentPath="/new" />
      <div className="ml-16">
        <BugForm
          onSubmit={createBug}
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
        <Link to="/dashboard">Home</Link>
      </div>
    </>
  );
};

export default BugCreate;
