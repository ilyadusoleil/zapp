import { Comment } from './Comment';

export type BugDetails = {
  id: number;
  projectId: number;
  title: string;
  description: string;
  priority: number;
  createdAt: Date;
  state: any; // TODO update this once finalised on server
  comments: Comment[];
};

export type Bug = Omit<BugDetails, 'comments'>;

export type BugInput = Omit<Bug, 'id' | 'createdAt'>;
