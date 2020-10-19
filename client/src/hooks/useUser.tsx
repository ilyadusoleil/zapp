import { useQuery, QueryResult } from 'react-query';
import fetchRequest from '../services/ApiService';
import { User } from '../types/User';

// Get details about one user
const useUser = (userId: number): QueryResult<User> => {
  return useQuery(userId && ['user', userId], () =>
    fetchRequest(`/user?userId=${userId}`)
  );
};

export default useUser;
