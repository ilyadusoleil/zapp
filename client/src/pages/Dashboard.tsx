import React, { useState } from 'react';
import { Link, navigate, RouteComponentProps } from '@reach/router';

import { Bug } from '../types/Bug';
import useBugs from '../hooks/useBugs';
import useProjects from '../hooks/useProjects';

import Bugitem from '../components/Bugitem';
import Sidebar from '../components/Sidebar';
import ProjectHeader from '../components/ProjectHeader';

const Dashboard = (_props: RouteComponentProps) => {
  const [projectId, setProjectId] = useState('1');
  const { isLoading, isError, data } = useBugs(projectId); //TODO: change hard coding of projectId

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
        <ProjectHeader />
        <h1>Dashboard</h1>

        {data.map((bug: Bug, index) => (
          <Bugitem key={index} bug={bug} />
        ))}

        <Link to="/new">New Issue</Link>
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
