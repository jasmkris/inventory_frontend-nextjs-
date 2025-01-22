export interface Room {
  id: string;
  name: string;
  description?: string;
  isTransit: boolean;
  items: Object[]; // remove this
  createdAt: Date;
  updatedAt: Date;
}

export interface Object {
  id: string;
  name: string;
  category: 'CONSUMABLE' | 'TEXTILE' | 'EQUIPMENT' | 'OTHER';
  quantity: number;
  description?: string;
  roomId: string;
  room: Room;
  createdAt: Date;
  updatedAt: Date;
  parentId?: string;
  parent?: Object;
  variants?: Object[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'MANAGER' | 'EMPLOYEE';
  selfieUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface History {
  id: string;
  objectId: string;
  object: Object;
  fromRoomId?: string;
  fromRoom?: Room;
  toRoomId: string;
  toRoom: Room;
  reason?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Common types that can be used across the application
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ErrorResponse {
  message: string;
  status: number;
}