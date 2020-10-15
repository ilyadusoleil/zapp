import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';

import { QueryCache } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

import {
  Router,
  Location,
  WindowLocation,
  RouterProps,
  LocationContext,
} from '@reach/router';
import { Dialog } from '@reach/dialog';

import Context, { reducer } from './Context';

import Login from './pages/Login';
import Landing from './pages/Landing';
import PreDashboard from './pages/PreDashboard';
import Dashboard from './pages/Dashboard';
import BugCreate from './pages/BugCreate';
import ProjectCreate from './pages/ProjectCreate';
import BugDetails from './pages/BugDetails';
import BugEdit from './pages/BugEdit';

import '@reach/dialog/styles.css';

function Routes(props: RouterProps) {
  return (
    <Router {...props}>
      <Login path="/" />
      <Landing path="/landing" />
      <PreDashboard path="/preDashboard" />
      <Dashboard path="/dashboard" />
      <BugCreate path="/new" />
      <ProjectCreate path="/newProject" />

      <BugDetails path="/details/:id" />
      <BugEdit path="/details/edit/:id" />
    </Router>
  );
}

const App = () => {
  const initialState = {
    currentProjectId: 0,
    isBugModalOpen: false,
    isProjectOpen: false,
    bugModalId: 0,

    userId: '3', // TODO: no longer hard code this one user authenitcation is working
    // user: {},
    isAuthenticated: false,
    authError: '',
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
