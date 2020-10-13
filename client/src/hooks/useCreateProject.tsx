import { useMutation, queryCache } from 'react-query';

import fetchRequest from '../services/ApiService';
import { Project, ProjectInput } from '../types/Project';

function useCreateBug() {
  const createBug = async (project: ProjectInput): Promise<Project> => {
    return fetchRequest('/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
  };

  return useMutation(createBug, {
    onSuccess: () => {
      queryCache.refetchQueries('projects'); //TODO compare with invalidateQueries(['project', bug.id]);
    },
  });
}

export default useCreateBug;