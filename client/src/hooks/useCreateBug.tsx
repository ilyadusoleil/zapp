import {
  useQuery,
  QueryResult,
  MutationResultPair,
  useMutation,
  queryCache,
} from 'react-query';

import fetchRequest from '../services/ApiService';
import { Bug, BugInput } from '../types/Bug';

function useCreateBug() {
  const createBug = async ({ bug }: { bug: BugInput }): Promise<Bug> => {
    return fetchRequest('/project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bug),
    });
  };

  return useMutation(createBug, {
    onSuccess: () => {
      queryCache.refetchQueries('project'); //TODO compare with invalidateQueries(['project', bug.id]);
    },
  });
}

export default useCreateBug;
