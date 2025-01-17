export interface Room {
  id: string;
  name: string;
<<<<<<< HEAD
  description: string | null;
  isTransit: boolean;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    objects: number;
  };
=======
  description: string;
  isTransit?: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
>>>>>>> e8f13d079188d56eaced21503e0728eb2c3b82be
} 