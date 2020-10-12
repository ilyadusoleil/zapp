import React, { useState} from 'react';
import { Link, navigate, RouteComponentProps } from '@reach/router';
import Modal from 'react-modal';

import { Bug } from '../types/Bug';
import useBugs from '../hooks/useBugs';

import Bugitem from '../components/Bugitem';
import Sidebar from '../components/Sidebar';
import BugEditForm from '../components/BugEditForm';

const Dashboard = (_props: RouteComponentProps) => {
  const { isLoading, isError, data } = useBugs();
  const [modalIsOpen, setModalIsOpen] = useState(false)

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
      <Modal isOpen={modalIsOpen} style={customStyles}>
          <BugEditForm setModalIsOpen={setModalIsOpen}/>
      </Modal >
      <div className="mx-16">
        <h1>Dashboard</h1
>
        {data.map((bug: Bug, index) => (
          <Bugitem setModalIsOpen={setModalIsOpen} key={index} bug={bug} />
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
