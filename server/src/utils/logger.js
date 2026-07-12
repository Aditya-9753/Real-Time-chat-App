/**
 * @file logger.js
 * @description Centralized logging utility using different log levels.
 * Provides consistent log formatting across the entire application.
 */

const LOG_LEVELS = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  DEBUG: 'DEBUG',
  SOCKET: 'SOCKET',
};

/**
 * Formats a log message with timestamp, level, and optional metadata.
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @param {object} [meta] - Optional metadata object
 */
const formatLog = (level, message, meta = null) => {
  const timestamp = new Date().toISOString();
  const metaStr = meta ? ` | ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] [${level}] ${message}${metaStr}`;
};

const logger = {
  /**
   * Logs informational messages.
   * @param {string} message
   * @param {object} [meta]
   */
  info: (message, meta) => {
    console.log(formatLog(LOG_LEVELS.INFO, message, meta));
  },

  /**
   * Logs warning messages.
   * @param {string} message
   * @param {object} [meta]
   */
  warn: (message, meta) => {
    console.warn(formatLog(LOG_LEVELS.WARN, message, meta));
  },

  /**
   * Logs error messages.
   * @param {string} message
   * @param {object} [meta]
   */
  error: (message, meta) => {
    console.error(formatLog(LOG_LEVELS.ERROR, message, meta));
  },

  /**
   * Logs debug messages (only in development mode).
   * @param {string} message
   * @param {object} [meta]
   */
  debug: (message, meta) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(formatLog(LOG_LEVELS.DEBUG, message, meta));
    }
  },

  /**
   * Logs socket-related events.
   * @param {string} message
   * @param {object} [meta]
   */
  socket: (message, meta) => {
    console.log(formatLog(LOG_LEVELS.SOCKET, message, meta));
  },
};

module.exports = logger;
