import { useMutation, queryCache } from 'react-query';

import fetchRequest from '../services/ApiService';
import { Comment, CommentInput } from '../types/Comment';

function useCreateBug() {
  const createBug = async (bug: CommentInput): Promise<Comment> => {
    return fetchRequest('/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bug),
    });
  };

  return useMutation(createBug, {
    onSuccess: (/*bug*/) => {
      queryCache.refetchQueries(['bug']); // TODO update to be more specific instead of refetching all
    },
  });
}

export default useCreateBug;
