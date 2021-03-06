import { useQuery, QueryResult } from 'react-query';
import fetchRequest from '../services/ApiService';
import { Project } from '../types/Project';

// Get projects for a single user
const useProjects = (userId: number): QueryResult<Project[]> => {
  return useQuery(userId && ['projectsForUser', userId], () =>
    fetchRequest(`/api/projects?userId=${userId}`)
  );
};

export default useProjects;
