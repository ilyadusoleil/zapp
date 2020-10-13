import React, { useContext } from 'react';
import { Link, navigate, RouteComponentProps } from '@reach/router';
import Modal from 'react-modal';

import { Bug } from '../types/Bug';
import useBugs from '../hooks/useBugs';

import Bugitem from '../components/Bugitem';
import Sidebar from '../components/Sidebar';

import BugDetails from '../pages/BugDetails';

import ProjectHeader from '../components/ProjectHeader';

import Context from '../Context';

const Dashboard = (_props: RouteComponentProps) => {
  const ctx = useContext(Context);
  const { isLoading, isError, data } = useBugs(ctx.state.currentProjectId); //TODO: change hard coding of projectId

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError || !data) {
    return <span>Error: </span>;
  }

  const customStyles = {
    content: {
      position: 'absolute',
      top: '5%',
      left: '5%',
      right: '5%',
      bottom: '5%',
    },
  };

  Modal.setAppElement('body'); // Prevents React: App element is not defined warning

  return (
    <>
      <Sidebar currentPath="/dashboard" />
      <Modal isOpen={ctx.state.isModalOpen} style={customStyles}>
        <BugDetails />
      </Modal>
      <div className="mx-16">
        <ProjectHeader />
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
