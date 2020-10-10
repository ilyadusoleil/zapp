import { useQuery, QueryResult } from 'react-query';
import fetchRequest from '../services/ApiService';
import { BugInput } from '../types/Bug';

const useBugs = (): QueryResult<BugInput[]> => {
  return useQuery('project', () => fetchRequest('/project'));
}

export default useBugs
