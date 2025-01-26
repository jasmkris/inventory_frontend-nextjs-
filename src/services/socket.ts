import { io } from 'socket.io-client';
import { getSession } from 'next-auth/react';

const SOCKET_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:5000';

// Create socket instance with error handling
export const socket = io(SOCKET_URL, {
  auth: {
    token: null
  },
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  transports: ['websocket'],
  // Add these options to handle errors more gracefully
  reconnectionDelayMax: 5000,
  timeout: 20000,
});

// Suppress WebSocket connection errors from showing in the console
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' && 
    (args[0].includes('WebSocket connection') || 
     args[0].includes('transport error'))
  ) {
    // Silently handle WebSocket errors
    return;
  }
  originalConsoleError.apply(console, args);
};

// Add connection event listeners with silent error handling
socket.on('connect', () => {
  console.log('Socket connected successfully');
});

socket.on('connect_error', (error) => {
  // Log only to debug, not to console.error
  console.debug('Socket connection error:', error.message);
});

socket.on('disconnect', (reason) => {
  console.debug('Socket disconnected:', reason);
});

export const connectSocket = async () => {
  try {
    const session = await getSession();
    if (session?.token) {
      socket.auth = { token: session.token };
      socket.connect();
      console.debug('Socket connection initiated with token');
    } else {
      console.debug('No auth token available');
    }
  } catch (error) {
    console.debug('Error connecting socket:', error);
  }
};

export const disconnectSocket = () => {
  try {
    if (socket.connected) {
      socket.disconnect();
      console.debug('Socket disconnected');
    }
  } catch (error) {
    console.debug('Error disconnecting socket:', error);
  }
};