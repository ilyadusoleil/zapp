import { useQuery, QueryResult } from 'react-query';
import fetchRequest from '../services/ApiService';
import { Bug } from '../types/Bug';

const useBugs = (): QueryResult<Bug[]> => {
  return useQuery('project', () => fetchRequest('/project'));
}

export default useBugs
