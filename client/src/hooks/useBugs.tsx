import { useQuery, QueryResult } from 'react-query';
import fetchRequest from '../services/ApiService';
import { Bug } from '../types/Bug';

// Get all bugs for one project
const useBugs = (projectId: string): QueryResult<Bug[]> => {
  return useQuery(projectId && ['projectbugs', projectId], () => fetchRequest(`/bugs?projectId=${projectId}`));
}

export default useBugs
