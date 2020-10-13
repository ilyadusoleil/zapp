import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';

import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

import { Router } from '@reach/router';

import Context, { reducer } from './Context';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BugCreate from './pages/BugCreate';
import ProjectCreate from './pages/ProjectCreate';

const queryCache = new QueryCache();

const App = () => {
  const initialState = {
    currentProjectId: 0,
    userId: '1',
    isBugModalOpen: false,
    isProjectOpen: false,
    bugModalId: 0,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <React.StrictMode>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <Context.Provider value={{ state, dispatch }}>
          <Router>
            <Login path="/" />
            <Dashboard path="/dashboard" />
            <BugCreate path="/new" />
            <ProjectCreate path="/newProject" />
          </Router>
        </Context.Provider>
      </ReactQueryCacheProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
