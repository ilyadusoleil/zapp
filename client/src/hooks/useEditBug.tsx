import { useMutation, queryCache } from 'react-query';
import fetchRequest from '../services/ApiService';

import { Bug } from '../types/Bug';

export default function useSavePost() {
  const editBug = async (bug: Bug): Promise<Bug> => {
    return fetchRequest(`/bugs/${bug.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bug),
    });
  };

  return useMutation(editBug, {
    onMutate: (values) => {
      const oldIssue = queryCache.getQueryData<Bug>(['bug', values.id]);
      if (!oldIssue) return;

      queryCache.setQueryData<Bug>(['bug', values.id], (old) => ({
        ...old,
        ...values,
      }));

      return () => queryCache.setQueryData<Bug>(['bug', values.id], oldIssue);
    },
    onError: (_error, _values, rollback) => (rollback as () => void)(),
    onSuccess: async (values) => {
      queryCache.refetchQueries(['projectbugs', values.projectId]);
      await queryCache.refetchQueries(['bug', values.id]);
    },
  });
}
