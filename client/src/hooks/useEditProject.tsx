import { useMutation, queryCache } from 'react-query';
import fetchRequest from '../services/ApiService';

import { Project } from '../types/Project';

type rollbackType = () => void;

export default function useEditProject() {
  const editProject = async (project: Project): Promise<Project> => {
    return fetchRequest(`/api/projects`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
  };

  return useMutation(editProject, {
    onMutate: (values) => {
      return () =>
        queryCache.setQueryData<Project>(['project', values.id], values);
    },
    onError: (_error, _values, rollback: rollbackType) => rollback(),

    // TODO remove this (est line removal below) once below code is updated
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: async (_values) => {
      // FIXME: revert to commented code once server returns new value
      queryCache.refetchQueries(['project']);
      await queryCache.refetchQueries(['projects']);
      // queryCache.refetchQueries(['projectbugs', values.projectId]);
      // await queryCache.refetchQueries(['bug', values.id]);
    },
  });
}
