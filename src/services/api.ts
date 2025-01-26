import axios from 'axios';
import { getSession } from 'next-auth/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Bearer': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`;
  }
  return config;
});

// Add error interceptor
api.interceptors.response.use(
  response => response,
  error => {
    console.log('API Error:', error.response?.data || error.message);
    return error.response?.data || error.message;
    // return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (userData: FormData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};

export const userService = {
  getPendingUsers: async () => {
    const response = await api.get('/users/all');
    return response.data;
  },
  approveUser: async (userId: string) => {
    const response = await api.put(`/users/approve/${userId}`);
    return response.data;
  },
  rejectUser: async (userId: string) => {
    const response = await api.delete(`/users/reject/${userId}`);
    return response.data;
  },
  revokeAccess: async (userId: string) => {
    const response = await api.put(`/users/revoke/${userId}`);
    return response.data;
  },
  uploadProfileImage: async (formData: FormData) => {
    const response = await api.post('/users/profile/photo', formData);
    return response.data;
  },
  updateProfile: async (data: any) => {
    const response = await api.put('/users/profile', data);
    return response;
  },
};

// Room services
export const roomService = {
  getRooms: async (search?: string) => {
    const response = await api.get('/rooms', {
      params: { search }
    });
    return response.data;
  },

  getRoomById: async (roomId: string) => {
    const response = await api.get(`/rooms/${roomId}`);
    return response.data;
  },

  getRoomObjects: async (roomId: string, search?: string, category?: string) => {
    const response = await api.get(`/rooms/${roomId}/objects`, {
      params: { search, category }
    });
    return response.data;
  },

  createRoom: async (roomData: {
    name: string;
    description?: string;
    isTransit?: boolean;
  }) => {
    const response = await api.post('/rooms', roomData);
    return response;
  },

  updateRoom: async (
    roomId: string,
    roomData: {
      name?: string;
      description?: string;
      isTransit?: boolean;
    }
  ) => {
    const response = await api.put(`/rooms/${roomId}`, roomData);
    return response;
  },

  deleteRoom: async (roomId: string) => {
    const response = await api.delete(`/rooms/${roomId}`);
    console.log(response, 'response');
    return response;
  },
};

// Object services
export const objectService = {
  getObjects: async () => {
    const response = await api.get('/objects');
    return response.data;
  },
  createObject: async (objectData: any) => {
    const response = await api.post('/objects', objectData);
    return response.data;
  },
  getObjectById: async (objectId: string) => {
    const response = await api.get(`/objects/${objectId}`);
    return response.data;
  },
  allObjectsDelete: async (roomId: string) => {
    const response = await api.delete(`/objects/all/${roomId}`);
    return response;
  },
  multipleObjectsDelete: async (objectIds: string[]) => {
    const response = await api.delete('/objects', { data: { objectIds } });
    return response.data;
  },
  moveObject: async (objectId: string, roomId: string, quantity: number) => {
    const response = await api.post(`/objects/${objectId}/move`, { roomId, quantity });
    return response.data;
  },
  updateQuantity: async (objectId: string, quantity: number) => {
    const response = await api.put(`/objects/${objectId}/quantity`, { quantity });
    return response.data;
  },
  updateObject: async (objectId: string, objectData: any) => {
    const response = await api.put(`/objects/${objectId}`, objectData);
    return response.data;
  },
  removeObject: async (objectId: string, quantity: number, deleteNote: string) => {
    const response = await api.put(`/objects/${objectId}/remove`, { quantity, deleteNote });
    return response.data;
  },
};
