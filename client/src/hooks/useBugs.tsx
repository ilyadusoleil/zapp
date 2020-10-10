import { useQuery } from 'react-query';
import fetchRequest from '../services/ApiService';

export default function useBugs() {
  return useQuery('project', () => fetchRequest('/project'));
}
