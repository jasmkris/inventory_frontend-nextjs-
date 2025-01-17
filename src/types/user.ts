export type UserRole = 'MANAGER' | 'EMPLOYEE';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  photoUrl: string;
  createdAt: Date;
  updatedAt: Date;
} 