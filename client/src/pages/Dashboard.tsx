import React, { useState, useContext } from 'react';
import { Link, navigate, RouteComponentProps } from '@reach/router';
import Modal from 'react-modal';

import { Bug } from '../types/Bug';
import useBugs from '../hooks/useBugs';
import useProjects from '../hooks/useProjects';

import Bugitem from '../components/Bugitem';
import Sidebar from '../components/Sidebar';

import BugEditForm from '../components/BugEditForm';

import ProjectHeader from '../components/ProjectHeader';

import Context from '../Context';

const Dashboard = (_props: RouteComponentProps) => {
  const ctx = useContext(Context);
  // const [projectId, setProjectId] = useState('0');
  const { isLoading, isError, data } = useBugs(ctx.state.currentProjectId); //TODO: change hard coding of projectId
  // const [modalIsOpen, setModalIsOpen] = useState(false)

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError || !data) {
    return <span>Error: </span>;
  }

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };


  return (
    <>
    
      <Sidebar />
      <Modal isOpen={ctx.state.isModalOpen} style={customStyles}>
          <BugEditForm/>
      </Modal >
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
