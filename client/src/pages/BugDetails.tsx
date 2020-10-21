import React from 'react';

import { navigate, RouteComponentProps } from '@reach/router';

import useBug from '../hooks/useBug';
import useEditBug from '../hooks/useEditBug';
import useCreateComment from '../hooks/useCreateComment';

import TopBar from '../components/TopBar';
import CommentForm from '../components/CommentForm';
import CommentComponent from '../components/CommentComponent';
import Loading from '../components/Loading';
import { PriorityTag } from '../components/Priority';
import UserChip from '../components/UserChip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faArrowLeft,
  faBug,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons';

import { BUTTON_STYLE } from '../constants';
import ErrorComponent from '../components/ErrorComponent';

interface BugDetailsProps extends RouteComponentProps {
  id?: string;
}

const bugCategoryIcons = [faBug, faLightbulb];

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

  if (isLoading) return <Loading />;

  if (isError || !data) return <ErrorComponent />;

  return (
    <>
      <div>
        <TopBar text="Details" />
        <div className="flex flex-col mt-12 mb-4">
          <div className="flex">
            <div className="flex justify-center align-center w-48">
              <FontAwesomeIcon
                icon={faArrowLeft}
                size={'2x'}
                className="cursor-pointer"
                onClick={() => navigate(`/dashboard/${data.projectId}`)}
              />
            </div>
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
            <div className="flex justify-center align-center w-48">
              <div className="flex items-center justify-center bg-gradient-to-r from-indigo-800 to-purple-500 rounded-full w-20 h-20">
                <FontAwesomeIcon
                  className="text-center text-gray-100"
                  size={'3x'}
                  icon={bugCategoryIcons[data.category]}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-48">{data.description}</div>
        <div className="flex my-10 mx-48">
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

        <div className="mx-48">
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
