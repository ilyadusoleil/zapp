export type Bug = {
  id: number;
  projectId: number;
  title: string;
  description: string;
  priority: string; // TODO: Change to number
};

export type BugInput = Omit<Bug, 'id'>;