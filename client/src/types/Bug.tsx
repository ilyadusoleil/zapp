export type Bug = {
  id: number;
  project_Id: number;
  title: string;
  description: string;
  priority: number;
};

export type BugInput = Omit<Bug, 'id'>;