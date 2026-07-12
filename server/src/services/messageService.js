/**
 * @file messageService.js
 * @description Business logic for message storage and retrieval.
 */

const Message = require('../models/Message');
const logger = require('../utils/logger');

/**
 * Retrieves the full conversation between two users, sorted oldest → newest.
 * @param {string} userId - The logged-in user's ID
 * @param {string} receiverId - The selected conversation partner's ID
 * @returns {Promise<object[]>} Array of message documents
 */
const getConversation = async (userId, receiverId) => {
  const messages = await Message.find({
    $or: [
      { senderId: userId, receiverId },
      { senderId: receiverId, receiverId: userId },
    ],
  })
    .sort({ createdAt: 1 }) // Oldest first
    .lean(); // Return plain JS objects (faster)

  return messages;
};

/**
 * Saves a new message to MongoDB.
 * @param {string} senderId
 * @param {string} receiverId
 * @param {string} message
 * @returns {Promise<object>} Saved message document
 */
const saveMessage = async (senderId, receiverId, message) => {
  const newMessage = await Message.create({
    senderId,
    receiverId,
    message: message.trim(),
    delivered: false,
    read: false,
  });

  logger.debug('Message saved', { senderId, receiverId, messageId: newMessage._id });
  return newMessage;
};

/**
 * Marks messages from a sender to a receiver as delivered.
 * Called when the receiver connects and has pending undelivered messages.
 * @param {string} senderId
 * @param {string} receiverId
 * @returns {Promise<object>} Mongoose update result
 */
const markMessagesDelivered = async (senderId, receiverId) => {
  return Message.updateMany(
    { senderId, receiverId, delivered: false },
    { $set: { delivered: true } }
  );
};

/**
 * Marks all messages in a conversation as read.
 * Called when the receiver opens a conversation.
 * @param {string} senderId - The person who originally sent
 * @param {string} receiverId - The person who is now reading
 * @returns {Promise<object>} Mongoose update result
 */
const markMessagesRead = async (senderId, receiverId) => {
  return Message.updateMany(
    { senderId, receiverId, read: false },
    { $set: { read: true, delivered: true } }
  );
};

module.exports = {
  getConversation,
  saveMessage,
  markMessagesDelivered,
  markMessagesRead,
};
