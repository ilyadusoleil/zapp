import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';

import { QueryCache } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

import { Router, Location, WindowLocation, RouterProps, LocationContext } from '@reach/router';
import { Dialog } from '@reach/dialog';

import Context, { reducer } from './Context';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BugCreate from './pages/BugCreate';
import ProjectCreate from './pages/ProjectCreate';
import BugEdit from './pages/BugEdit';

import '@reach/dialog/styles.css';

function Routes(props : RouterProps) {
  return (
    <Router {...props}>
      <Login path="/" />
      <Dashboard path="/dashboard" />
      <BugCreate path="/new" />
      <ProjectCreate path="/newProject" />

      <BugEdit path="/edit/:id" />
    </Router>
  );
}

const App = () => {
  const initialState = {
    currentProjectId: 0,
    userId: '3', // TODO: no longer hard code this one user authenitcation is working
    isBugModalOpen: false,
    isProjectOpen: false,
    bugModalId: 0,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <React.StrictMode>
        <Context.Provider value={{ state, dispatch }}>
          <Location>
            {({ location, navigate }: LocationContext) => {
              const { oldLocation } = location.state || {};
              return (
                <>
                  <Routes
                    location={oldLocation != null ? oldLocation : location}
                  />
                  <Dialog
                    aria-label="Dialog"
                    isOpen={oldLocation != null}
                    onDismiss={() => {
                      navigate(oldLocation.pathname);
                    }}
                  >
                    <Routes location={location} />
                  </Dialog>
                </>
              );
            }}
          </Location>
        </Context.Provider>
      </React.StrictMode>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
