/**
 * @file constants.js
 * @description Application-wide constants for the backend.
 * Centralizes magic strings, event names, and configuration values.
 */

// ─── HTTP Status Codes ─────────────────────────────────────────────────────────
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

// ─── Socket.io Event Names ─────────────────────────────────────────────────────
const SOCKET_EVENTS = {
  // Connection lifecycle
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  RECONNECT: 'reconnect',
  RECONNECT_ERROR: 'reconnect_error',

  // User session
  JOIN: 'join',

  // Messaging
  PRIVATE_MESSAGE: 'privateMessage',
  RECEIVE_PRIVATE_MESSAGE: 'receivePrivateMessage',

  // Typing indicators
  TYPING: 'typing',
  STOP_TYPING: 'stopTyping',

  // Message status
  MESSAGE_DELIVERED: 'messageDelivered',
  MESSAGE_READ: 'messageRead',

  // User presence
  USER_ONLINE: 'userOnline',
  USER_OFFLINE: 'userOffline',

  // Error
  ERROR: 'error',
};

// ─── Response Messages ─────────────────────────────────────────────────────────
const MESSAGES = {
  // Auth
  LOGIN_SUCCESS: 'Login successful',
  USER_CREATED: 'User created and logged in',
  USERNAME_REQUIRED: 'Username is required',
  USERNAME_TOO_SHORT: 'Username must be at least 2 characters',
  USERNAME_TOO_LONG: 'Username must be at most 30 characters',

  // Users
  USERS_FETCHED: 'Users fetched successfully',
  USER_NOT_FOUND: 'User not found',

  // Messages
  MESSAGES_FETCHED: 'Messages fetched successfully',
  MESSAGE_SENT: 'Message sent successfully',
  MESSAGE_REQUIRED: 'Message content is required',
  RECEIVER_REQUIRED: 'Receiver ID is required',

  // General errors
  INTERNAL_ERROR: 'Internal server error',
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Resource not found',
};

module.exports = { HTTP_STATUS, SOCKET_EVENTS, MESSAGES };
