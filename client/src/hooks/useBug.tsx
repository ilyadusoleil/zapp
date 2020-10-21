import { useQuery, QueryResult } from 'react-query';
import fetchRequest from '../services/ApiService';
import { BugDetails } from '../types/Bug';

// Get details about one bug (in the edit/details screen)
const useBug = (bugId: number): QueryResult<BugDetails> => {
  return useQuery(bugId && ['bug', bugId], () =>
    fetchRequest(`/api/details?bugId=${bugId}`)
  );
};

export default useBug;
