/**
 * @file socketUsers.js
 * @description In-memory map that tracks connected socket IDs.
 * Maps userId → socketId for targeted private message delivery.
 * 
 * Note: For multi-server deployments, replace with Redis-based storage.
 */

/** @type {Map<string, string>} userId → socketId */
const onlineUsers = new Map();

/**
 * Adds a user to the online map.
 * @param {string} userId
 * @param {string} socketId
 */
const addOnlineUser = (userId, socketId) => {
  onlineUsers.set(userId.toString(), socketId);
};

/**
 * Removes a user from the online map by socketId.
 * @param {string} socketId
 * @returns {string|null} The userId that was removed, or null
 */
const removeOnlineUserBySocket = (socketId) => {
  for (const [userId, sid] of onlineUsers.entries()) {
    if (sid === socketId) {
      onlineUsers.delete(userId);
      return userId;
    }
  }
  return null;
};

/**
 * Gets the socketId for a given userId.
 * @param {string} userId
 * @returns {string|undefined}
 */
const getSocketId = (userId) => {
  return onlineUsers.get(userId.toString());
};

/**
 * Checks if a user is currently online.
 * @param {string} userId
 * @returns {boolean}
 */
const isUserOnline = (userId) => {
  return onlineUsers.has(userId.toString());
};

/**
 * Returns all currently online user IDs.
 * @returns {string[]}
 */
const getAllOnlineUserIds = () => {
  return Array.from(onlineUsers.keys());
};

module.exports = {
  addOnlineUser,
  removeOnlineUserBySocket,
  getSocketId,
  isUserOnline,
  getAllOnlineUserIds,
};
