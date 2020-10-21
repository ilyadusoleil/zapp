import React from 'react';

import { navigate, RouteComponentProps } from '@reach/router';

import useBug from '../hooks/useBug';
import useEditBug from '../hooks/useEditBug';
import useCreateComment from '../hooks/useCreateComment';

import TopBar from '../components/TopBar';
import CommentForm from '../components/CommentForm';
import CommentComponent from '../components/CommentComponent';

import { PriorityTag } from '../components/Priority';
import UserChip from '../components/UserChip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { BUTTON_STYLE } from '../constants';

interface BugDetailsProps extends RouteComponentProps {
  id?: string;
}

const BugDetails = ({ id }: BugDetailsProps) => {
  if (!id) id = '0';
  const { isLoading, isError, data } = useBug(parseInt(id));
  const [createComment] = useCreateComment();

  const [editBug] = useEditBug();

  const toggleBugState = () => {
    if (!data) return;

    let newState = 1;
    if (data.state == 1) {
      // Reopen bug
      newState = 0;
    }
    const editedBugs = Object.assign({}, data, { state: newState });
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
      <div>
        <TopBar text="Details" />
        <div className="flex flex-col my-4 mx-32">
          <div className="flex flex-grow justify-between">
            <div className="text-lg font-bold">{data.title}</div>
            <FontAwesomeIcon
              icon={faEdit}
              size={'lg'}
              className="m-3 cursor-pointer transition duration-200 transform hover:scale-125"
              onClick={() => {
                navigate(`/details/edit/${id}`, {
                  state: {
                    oldLocation: JSON.parse(JSON.stringify(location)),
                  },
                });
              }}
            />
          </div>
        </div>
        <div className="mx-32">{data.description}</div>
        <div className="flex my-10 mx-32">
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

        <div className="mx-32">
          <button className={`${BUTTON_STYLE} mb-3`} onClick={toggleBugState}>
            {data.state === 1 ? 'Reopen Bug' : 'Mark as Complete'}
          </button>

          {data.comments &&
            data.comments.map((el) => (
              <CommentComponent key={el.id} comment={el} />
            ))}
          <CommentForm onSubmit={createComment} bugId={parseInt(id)} />
        </div>
      </div>
    </>
  );
};

export default BugDetails;
