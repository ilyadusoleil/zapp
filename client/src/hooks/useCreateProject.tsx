import { useMutation, queryCache } from 'react-query';

import fetchRequest from '../services/ApiService';
import { Project, ProjectInput } from '../types/Project';

function useCreateProject() {
  const createProject = async (project: ProjectInput): Promise<Project> => {
    return fetchRequest('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
  };

  return useMutation(createProject, {
    onSuccess: () => {
      queryCache.refetchQueries(['project']); //TODO compare with invalidateQueries(['project', bug.id]);
    },
  });
}

export default useCreateProject;
