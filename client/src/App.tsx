import React from 'react';
import ReactDOM from 'react-dom';

import {
  useQuery,
  useMutation,
  useQueryCache,
  QueryCache,
  ReactQueryCacheProvider,
} from 'react-query';

import { Router, Link } from '@reach/router';

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <Login path="/" />
        <Dashboard path="dashboard" />
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
