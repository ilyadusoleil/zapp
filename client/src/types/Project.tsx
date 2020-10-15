export type Project = {
  id: number;
  name: string;
  description?: string;
  userId: string;
};

export type ProjectInput = Omit<Project, 'id'>;
