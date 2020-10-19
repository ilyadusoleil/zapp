import { useMutation, queryCache } from 'react-query';
import fetchRequest from '../services/ApiService';

import { User } from '../types/User';

type rollbackType = () => void;

export default function useUpdateUserRecentProject() {
  const updateUser = async (user: User): Promise<User> => {
    return fetchRequest(`/user/recentProject`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
  };

  return useMutation(updateUser, {
    onMutate: (values) => {
      return () => queryCache.setQueryData<User>(['user', values.id], values);
    },
    onError: (_error, _values, rollback: rollbackType) => rollback(),

    onSuccess: async () => {
      queryCache.refetchQueries(['user']);
    },
  });
}
