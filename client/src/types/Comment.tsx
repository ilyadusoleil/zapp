export type Comment = {
  id: number;
  createdAt: Date;
  content: string;
  bugId: number;
  userId: number;
};

export type CommentInput = Omit<Comment, 'id' | 'createdAt'>;
