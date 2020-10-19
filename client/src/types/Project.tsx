export type Project = {
  id: number;
  name: string;
  description?: string;
  state: number;
  userId: number;
  projectUsers: (string | number)[];
};

export type ProjectInput = Omit<Project, 'id'>;
