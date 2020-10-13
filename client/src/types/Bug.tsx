export type Bug = {
  id: number;
  project_Id: number;
  title: string;
  description: string;
  priority: number;
  created_At: Date;
  state: any; // TODO update this once finalised on server
};

export type BugInput = Omit<Bug, 'id' | 'created_At'>;