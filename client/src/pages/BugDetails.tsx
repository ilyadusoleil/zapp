import React, { useContext } from 'react';

import { Link, navigate, RouteComponentProps } from '@reach/router';

import useBug from '../hooks/useBug';
import useCreateComment from '../hooks/useCreateComment';

import Sidebar from '../components/Sidebar';
import CommentForm from '../components/CommentForm';

import Context from '../Context';

interface BugDetailsProps extends RouteComponentProps {
  id?: string;
}

const BugDetails = (props: BugDetailsProps) => {
  if (!props.id) return <h1>Hmm no id</h1>;
  const { isLoading, isError, data } = useBug(parseInt(props.id)););
  const [createComment, { status: createCommentStatus }] = useCreateComment();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError || !data) {
    return <span>Error: </span>;
  }
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

        {data.comments && data.comments.map(el => (<div key={el.id}>{el.content}</div>))}
        <CommentForm onSubmit={createComment} bugId={parseInt(props.id)}/>
      </div>
    </>
  );
};

export default BugDetails;
