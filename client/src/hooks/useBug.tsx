import { useQuery, QueryResult } from 'react-query';
import fetchRequest from '../services/ApiService';
import { Bug } from '../types/Bug';

// Get details about one bug (in the edit/details screen)
const useBug = (bugId: number): QueryResult<Bug> => {
  return useQuery(bugId && ['bug', bugId], () => fetchRequest(`/details?bug_Id=${bugId}`));
};

export default useBug;
