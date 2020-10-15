import React, { useContext, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import Modal, { Styles } from 'react-modal';

import { Bug } from '../types/Bug';
import useBugs from '../hooks/useBugs';

import Bugitem from '../components/Bugitem';
import Sidebar from '../components/Sidebar';

import BugDetails from '../pages/BugDetails';
import ProjectCreate from '../pages/ProjectCreate';

import ProjectHeader from '../components/ProjectHeader';

import Context from '../Context';
import { setSyntheticTrailingComments } from 'typescript';

const Dashboard = (_props: RouteComponentProps) => {
const ctx = useContext(Context);
  const { isLoading, isError, data } = useBugs(ctx.state.currentProjectId); //TODO: change hard coding of projectId
const [sortIdx, setSortIdx] = useState(0);

if (isLoading) {
    return <span>Loading...</span>;
}

if (isError || !data) {
    return <span>Error: </span>;
}

const modalStyle: Styles = {
    content: {
    position: 'absolute',
    top: '5%',
    left: '5%',
    right: '5%',
    bottom: '5%',
    },
};

type selectInfo = {
    label: string;
    sortFunction: (a: Bug, b: Bug) => number;
};

const SELECT_INFO: selectInfo[] = [
    { label: 'high-low', sortFunction: (a, b) => a.priority - b.priority },
    { label: 'low-high', sortFunction: (a, b) => b.priority - a.priority },
    {
    label: 'first-last',
    sortFunction: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
    label: 'last-first',
    sortFunction: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
];

  Modal.setAppElement('body'); // Prevents React: App element is not defined warning

return (
    <>
      <Modal
        isOpen={ctx.state.isProjectOpen}
        style={modalStyle}
        onRequestClose={() => {
          ctx.dispatch({ type: 'closeProjectModal' });
        }}
      >
        <ProjectCreate />
      </Modal>
      <Sidebar currentPath="/dashboard" />

      <div className="mx-16">
        <ProjectHeader />
        <h1>Dashboard</h1>
        <select
        onChange={(e) => {
            setSortIdx(parseInt(e.target.value));
        }}
        >
        {SELECT_INFO.map((el, i) => (
            <option value={i} key={i}>
            {el.label}
            </option>
        ))}

        </select>

        {[...data]
        .sort(SELECT_INFO[sortIdx].sortFunction)
        .map((bug: Bug, index) => (
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
