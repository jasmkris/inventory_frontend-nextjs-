import axios from 'axios';
import { getSession } from 'next-auth/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`;
  }
  return config;
});
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
    return response.data;
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
    return response.data;
  },

  deleteRoom: async (roomId: string) => {
    const response = await api.delete(`/rooms/${roomId}`);
    return response.data;
  },
};

// Object services
export const objectService = {
  getObjects: async () => {
    const response = await api.get('/objects');
    return response.data;
  },
  createObject: async (objectData: FormData) => {
    console.log(objectData, 'objectData');
    const response = await api.post('/objects', objectData);
    return response.data;
  },
  // Add other object-related endpoints
};
