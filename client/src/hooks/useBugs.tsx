import { useQuery, QueryResult } from 'react-query';
import fetchRequest from '../services/ApiService';
import { Bug } from '../types/Bug';

// Get all bugs for one project
const useBugs = (projectId: number): QueryResult<Bug[]> => {
  return useQuery(projectId && ['projectbugs', projectId], () =>
    fetchRequest(`/bugs?project_Id=${projectId}`)
  );
};

export default useBugs;
