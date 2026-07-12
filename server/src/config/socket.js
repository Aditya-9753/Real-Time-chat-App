/**
 * @file socket.js
 * @description Socket.io server configuration and initialization.
 * Creates the io instance and attaches it to the HTTP server.
 */

const { Server } = require('socket.io');
const logger = require('../utils/logger');

/**
 * Initializes a Socket.io server attached to the given HTTP server.
 * @param {import('http').Server} httpServer - The Node.js HTTP server
 * @returns {import('socket.io').Server} Configured Socket.io server instance
 */
const createSocketServer = (httpServer) => {
  const io = new Server(httpServer, {
    // CORS configuration — must match Express CORS settings
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    },

    // Enable automatic reconnection on the client side
    // (client config handles this, but these are server-side transport settings)
    transports: ['websocket', 'polling'],

    // Ping timeout and interval for detecting stale connections
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  logger.info('Socket.io server initialized.');
  return io;
};

module.exports = createSocketServer;
