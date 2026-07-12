/**
 * @file authService.js
 * @description Business logic for authentication.
 * Implements dummy auth: creates the user if not found, otherwise updates.
 */

const User = require('../models/User');
const logger = require('../utils/logger');

/**
 * Handles user login (create or update by username).
 * @param {string} username - The submitted username
 * @returns {Promise<{user: object, isNew: boolean}>}
 */
const loginOrRegister = async (username) => {
  const normalizedUsername = username.trim().toLowerCase();

  // Try to find an existing user (case-insensitive already handled by lowercase model field)
  let user = await User.findOne({ username: normalizedUsername });
  let isNew = false;

  if (!user) {
    // Create new user
    user = await User.create({ username: normalizedUsername });
    isNew = true;
    logger.info('New user registered', { username: normalizedUsername });
  } else {
    // Existing user — no password to update in dummy auth
    logger.info('Existing user logged in', { username: normalizedUsername });
  }

  return { user, isNew };
};

module.exports = { loginOrRegister };
