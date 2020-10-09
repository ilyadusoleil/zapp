import React from 'react';
import data from '../../db.json';

import { RouteComponentProps } from '@reach/router';

import {
  useQuery,
  useMutation,
  useQueryCache,
  QueryCache,
  ReactQueryCacheProvider,
} from 'react-query';

import { getBugs } from '../services/ProjectService';

import Bug from '../types/Bug';

const Dashboard = (_props: RouteComponentProps) => {
  const cache = useQueryCache();

  // Queries
  const { isLoading, isError, data, error } = useQuery('bugs', getBugs);
  // const bugsQuery = useQuery('bugs', getBugs);

  // Mutations
  // const [addTodo] = useMutation(postBug, {
  //   onSuccess: () => {
  //     // Query Invalidations
  //     cache.invalidateQueries('bugs')
  //   },
  // })

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: </span>;
  }

  return (
    <>
      <h1>Dashboard</h1>
      <ul>
        {data.map((bug: Bug) => (
          <li className="m-6" key={bug.id}>
            {bug.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Dashboard;
