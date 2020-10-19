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
        <div className='inline-block relative w-64 mt-4'>
        <select className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
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
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
</div>
        
        </div>
        <div className='flex flex-wrap lg:justify-around xl:justify-between'>
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
