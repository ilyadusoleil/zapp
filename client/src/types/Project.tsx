export type Project = {
  id: number;
  title: string;
  description?: string;
  userId: string;
};

export type ProjectInput = Omit<Project, 'id'>;
