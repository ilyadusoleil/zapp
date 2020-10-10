import { useQuery, QueryResult } from 'react-query';
import fetchRequest from '../services/ApiService';
import { BugInput } from '../types/Bug';

const useBug = (id: string): QueryResult<BugInput> => {
  return useQuery(`issue-${id}`, () => fetchRequest(`/project/${id}`));
};

export default useBug;
