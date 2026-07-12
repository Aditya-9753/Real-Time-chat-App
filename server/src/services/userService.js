/**
 * @file userService.js
 * @description Business logic for user-related operations.
 */

const User = require('../models/User');
const { isUserOnline } = require('../utils/socketUsers');

/**
 * Retrieves all users except the currently logged-in user.
 * Augments each user with live online status from the in-memory socket map.
 *
 * @param {string} currentUserId - The logged-in user's MongoDB _id
 * @returns {Promise<object[]>} Array of user objects with online status
 */
const getAllUsersExcept = async (currentUserId) => {
  const users = await User.find(
    { _id: { $ne: currentUserId } },
    { username: 1, online: 1, createdAt: 1 } // Projection: only needed fields
  ).sort({ username: 1 });

  // Augment with real-time online status from in-memory map
  return users.map((user) => ({
    _id: user._id,
    username: user.username,
    online: isUserOnline(user._id.toString()),
    createdAt: user.createdAt,
  }));
};

module.exports = { getAllUsersExcept };
