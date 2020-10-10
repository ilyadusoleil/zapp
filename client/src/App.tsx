import React from 'react';
import ReactDOM from 'react-dom';

import { QueryCache, ReactQueryCacheProvider } from 'react-query';

import { Router } from '@reach/router';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BugCreate from './pages/BugCreate';

const queryCache = new QueryCache();

const App = () => {
  return (
    <React.StrictMode>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <Router>
          <Login path="/" />
          <Dashboard path="/dashboard" />
          <BugCreate path="/new" />
        </Router>
      </ReactQueryCacheProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
