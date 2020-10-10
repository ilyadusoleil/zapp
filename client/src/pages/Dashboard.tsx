import React, { useState} from 'react';
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
import Bugitem from '../components/Bugitem'

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
      data.map((bug, index) => ( 
            <Bugitem key={index} bug={bug} index={index}/>
        )
        

};

export default Dashboard;
