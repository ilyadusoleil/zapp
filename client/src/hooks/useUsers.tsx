import { useQuery, QueryResult } from 'react-query';
import fetchRequest from '../services/ApiService';
import { User } from '../types/User';

// Get all users for one project
const useBugs = (projectId: number): QueryResult<User[]> => {
  return useQuery(projectId && ['projectusers', projectId], () => {
    return fetchRequest(`/api/projectsUsers?projectId=${projectId}`);
  });
};

export default useBugs;
