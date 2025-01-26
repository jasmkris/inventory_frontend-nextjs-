export type ObjectCategory = 'TOOLS' | 'GARDEN' | 'AUTOMOTIVE' | 'RED_WINE' | 'WHITE_WINE' | 'SPARKLING_WINE' | 'TEXTILES' | 'TABLEWARE' | 'GLASSWARE' | 'COOKWARE' | 'MAINTENANCE' | 'EQUIPMENT' | 'CONSUMABLE' | 'OTHER';

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
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'MOVE' | 'TRANSIT' | 'REMOVE';
  fromRoomId?: string;
  toRoomId?: string;
  quantity?: number;
  note?: string;
  performedBy: string;
  performedAt: Date;
} 

export interface Object {
  id: string;
  name: string;
  category: ObjectCategory;
  quantity: number;
  roomId: string;
  description?: string;
  parentObjectId?: string; // For variants
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}