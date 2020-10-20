import { useQuery, QueryResult } from 'react-query';
import fetchRequest from '../services/ApiService';
import { Project } from '../types/Project';

// Get details aboput a single project
const useProject = (projectId: number): QueryResult<Project> => {
  return useQuery(projectId && ['project', projectId], () =>
    fetchRequest(`/api/projects?projectId=${projectId}`)
  );
};

export default useProject;
