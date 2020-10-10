export type Bug = {
  id: number;
  title: string;
  description: string;
  priority: string;
};

export type BugInput = Omit<Bug, 'id'>;