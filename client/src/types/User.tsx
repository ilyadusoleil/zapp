export type User = {
  id: number;
  email: string;
  googleId: string;
  displayName: string;
  image: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
};

// export type Bug = Omit<BugDetails, 'comments'>;

// export type BugInput = Omit<Bug, 'id' | 'createdAt'>;
