'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { socket, connectSocket } from '@/services/socket';
import { toast } from 'react-toastify';
import { eventEmitter } from '@/lib/eventEmitter';

interface NotificationDetails {
  userId: string;
  email: string;
  fullName: string;
  timestamp: Date;
}

interface Notification {
  type: string;
  message: string;
  details: NotificationDetails;
}

const NotificationListener = () => {
  const { data: session } = useSession();

  useEffect(() => {
    let reconnectInterval: NodeJS.Timeout;
    let isReconnecting = false;

    const setupSocket = async () => {
      if (session?.token) {
        try {
          await connectSocket();

          // Silent debug logs
          console.debug('Setting up notification listener');

          socket.on('notification', (notification: Notification) => {
            try {
              switch (notification.type) {
                case 'NEW_USER_REGISTRATION':
                  toast.info(notification.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
                  // Emit event for new user registration
                  eventEmitter.emit('newUserRegistered');
                  break;
                  
                case 'SYSTEM_ALERT':
                  toast.warning(notification.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
                  break;
                  
                default:
                  toast(notification.message, {
                    position: "top-right",
                    autoClose: 5000,
                  });
              }
            } catch (error) {
              console.debug('Error handling notification:', error);
            }
          });

          // Silent reconnection logic
          socket.on('disconnect', (reason) => {
            console.debug('Socket disconnected:', reason);
            if (!isReconnecting && (reason === 'io server disconnect' || reason === 'transport close')) {
              isReconnecting = true;
              reconnectInterval = setInterval(async () => {
                if (!socket.connected) {
                  await connectSocket();
                } else {
                  isReconnecting = false;
                  clearInterval(reconnectInterval);
                }
              }, 5000);
            }
          });
        } catch (error) {
          console.debug('Error setting up socket:', error);
        }
      }
    };

    setupSocket();

    return () => {
      console.debug('Cleaning up notification listener');
      socket.off('notification');
      socket.off('disconnect');
      if (reconnectInterval) {
        clearInterval(reconnectInterval);
      }
      isReconnecting = false;
    };
  }, [session]);

  return null;
};

export default NotificationListener;