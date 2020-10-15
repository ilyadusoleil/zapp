export type Project = {
  id: number;
  name: string;
  description?: string;
  user_Id: string;
};

export type ProjectInput = Omit<Project, 'id'>;
