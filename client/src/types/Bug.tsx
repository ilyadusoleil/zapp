import { Comment } from './Comment';

export type BugDetails = {
  id: number;
  projectId: number;
  title: string;
  description: string;
  priority: number;
  createdAt: Date;
  state: number; // TODO update this once finalised on server
  comments: Comment[];
  userId?: number;
};

export type Bug = Omit<BugDetails, 'comments'>;

export type BugInput = Omit<Bug, 'id' | 'createdAt'>;
