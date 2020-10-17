import React from 'react';

import { navigate, RouteComponentProps } from '@reach/router';

import useBug from '../hooks/useBug';
import useEditBug from '../hooks/useEditBug';
import useCreateComment from '../hooks/useCreateComment';

import Sidebar from '../components/Sidebar';
import CommentForm from '../components/CommentForm';
import CommentComponent from '../components/CommentComponent';

import { PriorityTag } from '../components/Priority';
import UserChip from '../components/UserChip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { BugDetails } from '../types/Bug';

import { BUTTON_STYLE } from '../constants';

interface BugDetailsProps extends RouteComponentProps {
  id?: string;
}

const BugDetails = ({ id }: BugDetailsProps) => {
  if (!id) id = '0';
  const { isLoading, isError, data } = useBug(parseInt(id));
  const [createComment] = useCreateComment();

  const [editBug] = useEditBug();

  const completeBug = () => {
    const editedBugs = Object.assign({}, data, {state: 1})
    editBug(editedBugs);
    navigate('/preDashboard');
  };

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
              navigate(`/details/edit/${id}`, {
                state: { oldLocation: JSON.parse(JSON.stringify(location)) },
              });
            }}
          />
        </div>
        <div className="mb-10">{data.description}</div>
        <div className="flex mb-10">
          <div className="mr-5 flex-grow divide-y divide-gray-400">
            <div className="p-5"></div>
            <div className="flex pt-3">
              <div className="mr-20">Priority</div>
              <PriorityTag priority={data.priority} />
            </div>
          </div>
          <div className="ml-5 flex-grow divide-y divide-gray-400">
            <div className="p-5"></div>
            <div className="flex pt-3">
              <div className="mr-20">Assignee</div>
              <UserChip userId={data.userId} />
            </div>
          </div>
        </div>

        <button className={`${BUTTON_STYLE} mb-3`} onClick={completeBug}>
          Mark as Complete
        </button>

        {data.comments &&
          data.comments.map((el) => (
            <CommentComponent key={el.id} comment={el} />
          ))}
        <CommentForm onSubmit={createComment} bugId={parseInt(id)} />
      </div>
    </>
  );
};

export default BugDetails;
