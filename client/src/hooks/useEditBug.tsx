import { useMutation, queryCache } from 'react-query';
import fetchRequest from '../services/ApiService';

import { Bug } from '../types/Bug';

export default function useSaveBug() {
  const editBug = async (bug: Bug): Promise<Bug> => {
    return fetchRequest(`/bugs`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bug),
    });
  };

  return useMutation(editBug, {
    onMutate: (values) => {
      return () => queryCache.setQueryData<Bug>(['bug', values.id], values);
    },
    onError: (_error, _values, rollback) => (rollback as () => void)(),
    onSuccess: async (values) => {
      // FIXME: revert to commented code once server returns new value
      queryCache.refetchQueries(['projectbugs']);
      await queryCache.refetchQueries(['bug']);
      // queryCache.refetchQueries(['projectbugs', values.projectId]);
      // await queryCache.refetchQueries(['bug', values.id]);
    },
  });
}
