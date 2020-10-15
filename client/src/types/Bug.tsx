export type Bug = {
  id: number;
  projectId: number;
  title: string;
  description: string;
  priority: number;
  createdAt: Date;
  state: any; // TODO update this once finalised on server
};

export type BugInput = Omit<Bug, 'id' | 'createdAt'>;
