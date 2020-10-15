import React, { useContext } from 'react';

import { Link, navigate, RouteComponentProps } from '@reach/router';

import useBug from '../hooks/useBug';
import useCreateComment from '../hooks/useCreateComment';

import Sidebar from '../components/Sidebar';
import CommentForm from '../components/CommentForm';
import CommentComponent from '../components/CommentComponent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

interface BugDetailsProps extends RouteComponentProps {
  id?: string;
}

const BugDetails = (props: BugDetailsProps) => {
  if (!props.id) return <h1>Hmm no id</h1>;
  const { isLoading, isError, data } = useBug(parseInt(props.id));
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
      <div className="ml-20 m-5">
        <div className="flex justify-between">
          <div className="text-lg font-bold mb-4">{data.title}</div>
          <FontAwesomeIcon
            icon={faEdit}
            size={'lg'}
            className="m-3 cursor-pointer transition duration-200  transform hover:scale-125"
            onClick={() => {
              navigate(`/details/edit/${props.id}`, {
                state: { oldLocation: JSON.parse(JSON.stringify(location)) },
              });
            }}
          />
        </div>
        <div className="mb-20">{data.description}</div>
        {data.comments &&
          data.comments.map((el) => (
            <CommentComponent key={el.id} comment={el} />
          ))}
        <CommentForm onSubmit={createComment} bugId={parseInt(props.id)} />
      </div>
    </>
  );
};

export default BugDetails;
