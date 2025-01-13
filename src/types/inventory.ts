export type ObjectCategory = 'CONSUMABLE' | 'TEXTILE' | 'EQUIPMENT' | 'OTHER';

export interface InventoryObject {
  id: string;
  name: string;
  category: ObjectCategory;
  quantity: number;
  description: string;
  roomId: string;
  parentObjectId?: string; // For variants
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ObjectHistory {
  id: string;
  objectId: string;
  action: 'CREATED' | 'MOVED' | 'DELETED' | 'MODIFIED' | 'TRANSIT';
  fromRoomId?: string;
  toRoomId?: string;
  quantity?: number;
  note?: string;
  performedBy: string;
  performedAt: Date;
} 