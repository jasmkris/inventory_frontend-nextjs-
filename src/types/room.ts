export interface Room {
  id: string;
  name: string;
  description: string;
  isTransit?: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
} 