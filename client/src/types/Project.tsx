export type Project = {
  id: number;
  title: string;
};

export type ProjectInput = Omit<Project, 'id'>;