import React from 'react';

import UseUser from '../hooks/useUser';
import { Comment } from '../types/Comment';

const convertDateToString = (input: Date): string => {
  const splitIsoString = new Date(input).toISOString().split('T')
  return (splitIsoString[0]) + ' ' + (splitIsoString[1].split('.')[0])
}

const CommentComponent = ({ comment }: { comment: Comment }) => {
  const { data } = UseUser(parseInt(comment.userId));
  return (
    <div className="flex mt-3 mb-5 p-3 bg-gray-100 rounded">
      <img className="h-12 mr-4" style={{borderRadius:'1.5rem'}}alt="user profile" src={data?.image} />
      <div className="flex flex-col">
        <div className="">{data?.displayName}</div>
        <div className="text-xs mb-3">{convertDateToString(comment.createdAt)}</div>
        <div>{comment.content}</div>
      </div>
    </div>
  );
};

export default CommentComponent;
