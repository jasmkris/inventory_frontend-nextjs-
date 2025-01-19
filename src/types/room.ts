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

export interface Object {
  id: string;
  name: string;
  category: 'CONSUMABLE' | 'TEXTILE' | 'EQUIPMENT' | 'OTHER';
  quantity: number;
  description?: string;
  roomId: string;
}