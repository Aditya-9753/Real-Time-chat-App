/**
 * @file constants.js
 * @description Frontend-wide constants.
 */

// Socket event names — must match server/src/utils/constants.js
export const SOCKET_EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  JOIN: 'join',
  PRIVATE_MESSAGE: 'privateMessage',
  RECEIVE_PRIVATE_MESSAGE: 'receivePrivateMessage',
  TYPING: 'typing',
  STOP_TYPING: 'stopTyping',
  MESSAGE_DELIVERED: 'messageDelivered',
  MESSAGE_READ: 'messageRead',
  USER_ONLINE: 'userOnline',
  USER_OFFLINE: 'userOffline',
  ERROR: 'error',
};

// Typing indicator debounce delay in ms
export const TYPING_TIMEOUT_MS = 2000;

// API base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Socket URL
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
