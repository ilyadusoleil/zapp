import React, { useContext, useState, useEffect } from 'react';
import { MutateFunction } from 'react-query';
import { CommentInput, Comment } from '../types/Comment';
import Context from '../Context';

import { BUTTON_STYLE } from '../constants';

const CommentForm = ({
  onSubmit,
  bugId,
}: {
  onSubmit: MutateFunction<Comment, unknown, CommentInput, unknown>;
  bugId: number;
}) => {
  const ctx = useContext(Context);
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContent('');
    onSubmit({ content, userId: ctx.state.userId, bugId });
  };

  return (
    <form
      className="border-2 border-indigo-200 rounded-lg bg-gray-100 p-10"
      onSubmit={handleSubmit}
    >
      <div>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment..."
          required
        />
      </div>

      <div className="flex">
        <button className={`${BUTTON_STYLE} ml-auto`} type="submit">
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
