import React from 'react';

import { Link, RouteComponentProps } from '@reach/router';

import useCreateBug from '../hooks/useCreateBug';

import BugForm from '../components/BugForm';

const Dashboard = (_props: RouteComponentProps) => {
  const [createBug, { status: createBugStatus }] = useCreateBug();

  return (
    <>
      <h1>New Issue</h1>
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
        initialValues={{
          title: '',
          description: '',
          priority: 'medium',
        }}
      />
      <Link to="/dashboard">Home</Link>
    </>
  );
};

export default Dashboard;
