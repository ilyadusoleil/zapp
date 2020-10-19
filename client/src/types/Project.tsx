export type Project = {
  id: number;
  name: string;
  description?: string;
  userId: string;
  projectUsers: (string | number)[];
};

export type ProjectInput = Omit<Project, 'id'>;
