import React, { useContext, useState, useEffect } from 'react';
import { Link, navigate, RouteComponentProps } from '@reach/router';
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
  const [bugs, setBugs] = useState([] as Bug []);
  const [isSorted, setIsSorted] = useState(true)

  useEffect (() => {
      if(data) {
          const bugs= data.sort((a, b) => a.priority - b.priority)
          setBugs(bugs)
      }
  }, [data])
  
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

const sortBy = (bugs: any, isSorted: boolean) => {
    if(isSorted) {
     const sortA = [...bugs].sort((a: any, b: any) => b.priority  - a.priority)
    return setBugs(sortA), setIsSorted(false)
    } else  {
    const sortB = [...bugs].sort((a: any, b: any) => a.priority  - b.priority)
    return setBugs(sortB), setIsSorted(true);
    }
}



  Modal.setAppElement('body'); // Prevents React: App element is not defined warning

  return (
    <>
    
    <Sidebar />
    <Modal isOpen={ctx.state.isBugModalOpen} style={modalStyle} onRequestClose={() => {
        ctx.dispatch({ type: 'closeBugModal' });
        }}>
        <BugDetails/>
    </Modal >
    <Modal isOpen={ctx.state.isProjectOpen} style={modalStyle} onRequestClose={() => {
        ctx.dispatch({ type: 'closeProjectModal' });}}>
        <ProjectCreate/>
    </Modal >
    <Sidebar currentPath="/dashboard" />

    <div className="mx-16">
        <ProjectHeader />
        <h1>Dashboard</h1>
        <button onClick= {() => {sortBy(bugs, isSorted)}}>sort by priority</button>

        {bugs.map((bug: Bug, index) => (
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
