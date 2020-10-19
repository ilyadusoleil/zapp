export type Project = {
  id: number;
  name: string;
  description?: string;
  userId: number;
  projectUsers: (string | number)[];
};

export type ProjectInput = Omit<Project, 'id'>;
