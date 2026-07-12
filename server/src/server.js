/**
 * @file server.js
 * @description Main entry point for the backend server.
 * Creates the HTTP server, attaches Socket.io, connects to MongoDB, and starts listening.
 */

const http = require('http');
require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/database');
const createSocketServer = require('./config/socket');
const initChatSocket = require('./sockets/chatSocket');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;

// ─── Create HTTP Server ───────────────────────────────────────────────────────
const httpServer = http.createServer(app);

// ─── Attach Socket.io to HTTP Server ─────────────────────────────────────────
const io = createSocketServer(httpServer);

// ─── Initialize Socket Event Handlers ────────────────────────────────────────
initChatSocket(io);

// ─── Connect to MongoDB and Start Server ─────────────────────────────────────
const startServer = async () => {
  try {
    await connectDB();

    httpServer.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
      logger.info(`📡 Socket.io ready`);
      logger.info(`🌐 Client URL: ${process.env.CLIENT_URL}`);
    });
  } catch (error) {
    logger.error('Failed to start server', { error: error.message });
    process.exit(1);
  }
};

startServer();

// ─── Graceful Shutdown ────────────────────────────────────────────────────────
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  httpServer.close(() => {
    logger.info('HTTP server closed.');
    process.exit(0);
  });
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection', { reason: reason?.message || reason });
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', { error: error.message });
  process.exit(1);
});
