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
  const createBug = async (bug: BugInput): Promise<Bug> => {
    return fetchRequest('/bugs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bug),
    });
  };

  return useMutation(createBug, {
    onSuccess: (/*bug*/) => {
      queryCache.refetchQueries(['projectbugs']); // FIXME: Update to line below once server returns newly created object upon completion
      // queryCache.refetchQueries(['projectbugs', bug.project_Id]); //TODO compare with invalidateQueries(['project', bug.id]);
    },
  });
}

export default useCreateBug;
