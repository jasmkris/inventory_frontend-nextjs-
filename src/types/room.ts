export interface Room {
  id: string;
  name: string;
  description: string | null;
  isTransit: boolean;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    objects: number;
  };
} 