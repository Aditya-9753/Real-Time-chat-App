/**
 * @file socketService.js (client)
 * @description Creates and configures the Socket.io client instance.
 * Implements auto-reconnect and prevents duplicate connections.
 */

import { io } from 'socket.io-client';
import { SOCKET_URL } from '../utils/constants';

let socket = null;

/**
 * Returns the singleton socket instance, creating it if needed.
 * @returns {import('socket.io-client').Socket}
 */
export const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      // Do NOT auto-connect — we connect manually after login
      autoConnect: false,

      // Auto-reconnect configuration
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,        // Start with 1s
      reconnectionDelayMax: 10000,    // Cap at 10s
      randomizationFactor: 0.5,

      transports: ['websocket', 'polling'],
    });
  }
  return socket;
};

/**
 * Disconnects and destroys the socket instance.
 * Call on logout or component unmount.
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
