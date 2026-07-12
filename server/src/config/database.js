/**
 * @file database.js
 * @description MongoDB connection setup using Mongoose.
 * Handles connection, retry logic, and graceful shutdown.
 */

const mongoose = require('mongoose');
const logger = require('../utils/logger');

/**
 * Connects to MongoDB using the MONGO_URI environment variable.
 * Exits the process on repeated connection failure.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Mongoose 6+ uses these by default, but kept explicit for clarity
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    logger.info(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error('MongoDB connection failed', { error: error.message });
    // Exit process with failure — Docker / PM2 will restart the service
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('reconnected', () => {
  logger.info('MongoDB reconnected successfully.');
});

module.exports = connectDB;
