import { useQuery, QueryResult } from 'react-query';
import fetchRequest from '../services/ApiService';
import { Project } from '../types/Project';

// Get projects for a single user
const useProjects = (userId: string): QueryResult<Project[]> => {
  return useQuery(userId && ['project', userId], () => fetchRequest(`/projects?user_Id=${userId}`));
}

export default useProjects
