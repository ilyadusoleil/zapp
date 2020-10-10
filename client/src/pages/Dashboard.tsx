import React from 'react';

import { Link, RouteComponentProps } from '@reach/router';

import { Bug } from '../types/Bug';
import useBugs from '../hooks/useBugs';

const Dashboard = (_props: RouteComponentProps) => {
  const { isLoading, isError, data } = useBugs();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: </span>;
  }

  return (
    <>
      <h1>Dashboard</h1>
      <ul>
        {data.map((bug: Bug) => (
          <li key={bug.id}>{bug.title}</li>
        ))}
      </ul>
      <Link to="/new">New Issue</Link>
    </>
  );
};

export default Dashboard;
