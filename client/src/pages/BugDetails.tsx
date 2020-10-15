import React, { useContext } from 'react';

import { Link, navigate, RouteComponentProps } from '@reach/router';

import useBug from '../hooks/useBug';
import useEditBug from '../hooks/useEditBug';

import Sidebar from '../components/Sidebar';

import Context from '../Context';

interface BugDetailsProps extends RouteComponentProps {
  id?: string;
}

const BugDetails = (props: BugDetailsProps) => {
  if (!props.id) return <h1>Hmm no id</h1>;
  const { isLoading, isError, data } = useBug(parseInt(props.id));

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError || !data) {
    return <span>Error: </span>;
  }
  console.log(data);
  return (
    <>
      <Sidebar />
      <div className="m-20">
        <h1>Edit</h1>
        <button
          onClick={() => {
            navigate(`/details/edit/${props.id}`, {
              state: { oldLocation: JSON.parse(JSON.stringify(location)) },
            });
          }}
        >
          EDITBUTTON
        </button>
        <div>{data.title}</div>
        <div>{data.description}</div>
      </div>
    </>
  );
};

export default BugDetails;
