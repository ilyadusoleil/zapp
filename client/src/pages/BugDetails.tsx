import React from 'react';

import { Link,  RouteComponentProps } from '@reach/router';

import getBug from '../hooks/useBug';

interface BugDetailsProps extends RouteComponentProps
{
	id?: string;
}

const BugDetails = (props: BugDetailsProps) => {
  if (!props.id) return (<h1>No ID</h1>)

  const { isLoading , isError, data } = getBug(props.id);

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError || !data) {
    return <span>Error: </span>
  }

  return (
    <>
      <h1>Edit</h1>
      <p>{data.title}</p>
      <p>{data.description}</p>
      <p>{data.priority}</p>
      <Link to="/dashboard">Home</Link>
    </>
  );
};

export default BugDetails;
