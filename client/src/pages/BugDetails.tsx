import React from 'react';

import { navigate, RouteComponentProps } from '@reach/router';

import useBug from '../hooks/useBug';
import useCreateComment from '../hooks/useCreateComment';

import Sidebar from '../components/Sidebar';
import CommentForm from '../components/CommentForm';
import CommentComponent from '../components/CommentComponent';
import AttributeBox from '../components/AttributeBox';
import { PriorityTag } from '../components/Priority';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

interface BugDetailsProps extends RouteComponentProps {
  id?: string;
}

const BugDetails = ({ id }: BugDetailsProps) => {
  if (!id) id = '0';
  const { isLoading, isError, data } = useBug(parseInt(id));
  const [createComment] = useCreateComment();

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
        <div className="flex">
          {/* <AttributeBox label="Priority" ValueComponent={<PriorityTag priority={data.priority}/>} /> */}
          <div className="flex-grow">
            <div className="p-5 divide-y divide-gray-400 text-gray-800"></div>
            <div className="flex">
              <div className="mr-20">Priority</div>
              <PriorityTag priority={data.priority}/>
            </div>
          </div>
          <div className="flex-grow">
            <div className="p-5 divide-y divide-gray-400 text-gray-800"></div>
            <div className="flex">
              <div className="mr-20">Assignee</div>
              {/* {<ValueComponent/>} */}
            </div>
          </div>
        </div>

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
