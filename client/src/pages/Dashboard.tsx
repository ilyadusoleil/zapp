import React from 'react';
import { Link, navigate, RouteComponentProps } from '@reach/router';

import { Bug } from '../types/Bug';
import useBugs from '../hooks/useBugs';

import Bugitem from '../components/Bugitem';
import Sidebar from '../components/Sidebar';

const Dashboard = (_props: RouteComponentProps) => {
  const { isLoading, isError, data } = useBugs();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError || !data) {
    return <span>Error: </span>;
  }

  return (
    <>
      <Sidebar />
      <div className="mx-16">
        <h1>Dashboard</h1>

        {data.map((bug: Bug, index) => (
          <Bugitem key={index} bug={bug} />
        ))}
      </div>
    </>
  );
};

export default Dashboard;

// TODO: add back into Bug Item
{
  /* onClick={() => {
              navigate(`/details/${bug.id}`);
            }} */
}