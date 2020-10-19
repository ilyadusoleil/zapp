import React, { useContext, useState, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';

import { Bug } from '../types/Bug';
import useBugs from '../hooks/useBugs';

import Bugitem from '../components/Bugitem';
import Sidebar from '../components/Sidebar';

import ProjectHeader from '../components/ProjectHeader';

import Context from '../Context';

interface DashboardProps extends RouteComponentProps {
  id?: string;
}

type selectInfo = {
  label: string;
  sortFunction: (a: Bug, b: Bug) => number;
};

const SELECT_INFO: selectInfo[] = [
  { label: 'High-Low', sortFunction: (a, b) => a.priority - b.priority },
  { label: 'Low-High', sortFunction: (a, b) => b.priority - a.priority },
  {
    label: 'First-Last',
    sortFunction: (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  },
  {
    label: 'Last-First',
    sortFunction: (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  },
];

const Dashboard = ({ id: projectId }: DashboardProps) => {
  if (!projectId) projectId = '0';

  const ctx = useContext(Context);
  const { isLoading, isError, data } = useBugs(parseInt(projectId));
  const [sortIdx, setSortIdx] = useState(0);

  useEffect(() => {
    ctx.dispatch({ type: 'setCurrentProjectId', payload: projectId });
  }, []);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError || !data) {
    return <span>Error: </span>;
  }

  return (
    <>
      <Sidebar currentPath="/dashboard" />

      <div className="mx-16">
      <h1>Bugs Dashboard</h1>
        <ProjectHeader projectId={parseInt(projectId)} />
        
        <select
          onBlur={(e) => {
            setSortIdx(parseInt(e.target.value));
          }}
        >
          {SELECT_INFO.map((el, i) => (
            <option value={i} key={i}>
              {el.label}
            </option>
          ))}
        </select>
        <div className='flex flex-wrap justify-between'>
        {[...data]
          .sort(SELECT_INFO[sortIdx].sortFunction)
          .map((bug: Bug, index) => (
            <Bugitem key={index} bug={bug} />
          ))}
          </div>
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
