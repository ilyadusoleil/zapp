import { useQuery, QueryResult } from 'react-query';
import fetchRequest from '../services/ApiService';
import { User } from '../types/User';

// Get details about one bug (in the edit/details screen)
const useUser = (userId: number): QueryResult<User> => {
  return useQuery(userId && ['user', userId], () =>
    fetchRequest(`/user?userId=${userId}`)
  );
};

export default useUser;
