import { useQuery, QueryResult } from 'react-query';
import fetchRequest from '../services/ApiService';
import { Bug } from '../types/Bug';

const useBug = (id: string): QueryResult<Bug> => {
  return useQuery(id && ['issue', id], () => fetchRequest(`/project/${id}`));
};

export default useBug;
