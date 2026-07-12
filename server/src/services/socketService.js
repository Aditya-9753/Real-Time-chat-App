/**
 * @file socketService.js
 * @description High-level socket utility functions used by chatSocket.js.
 * Bridges the socket layer with the database service layer.
 */

const User = require('../models/User');
const { saveMessage, markMessagesDelivered, markMessagesRead } = require('./messageService');
const {
  addOnlineUser,
  removeOnlineUserBySocket,
  getSocketId,
  getAllOnlineUserIds,
} = require('../utils/socketUsers');
const { SOCKET_EVENTS } = require('../utils/constants');
const logger = require('../utils/logger');

/**
 * Handles a user joining the chat system.
 * Updates their online status in DB and in the in-memory map.
 *
 * @param {import('socket.io').Socket} socket
 * @param {import('socket.io').Server} io
 * @param {string} userId
 */
const handleUserJoin = async (socket, io, userId) => {
  try {
    // Update DB
    await User.findByIdAndUpdate(userId, {
      socketId: socket.id,
      online: true,
    });

    // Update in-memory map
    addOnlineUser(userId, socket.id);

    // Notify all OTHER connected clients that this user is now online
    socket.broadcast.emit(SOCKET_EVENTS.USER_ONLINE, { userId });

    logger.socket(`User ${userId} joined with socket ${socket.id}`);
  } catch (error) {
    logger.error('handleUserJoin error', { error: error.message });
  }
};

/**
 * Handles a socket disconnect event.
 * Updates user's online status in DB and notifies others.
 *
 * @param {import('socket.io').Socket} socket
 * @param {import('socket.io').Server} io
 */
const handleUserDisconnect = async (socket, io) => {
  try {
    // Find which userId had this socket
    const userId = removeOnlineUserBySocket(socket.id);

    if (userId) {
      // Update DB
      await User.findByIdAndUpdate(userId, {
        socketId: null,
        online: false,
      });

      // Notify all connected clients
      io.emit(SOCKET_EVENTS.USER_OFFLINE, { userId });

      logger.socket(`User ${userId} disconnected (socket: ${socket.id})`);
    }
  } catch (error) {
    logger.error('handleUserDisconnect error', { error: error.message });
  }
};

/**
 * Handles sending a private message.
 * Saves to DB, delivers to receiver if online, confirms to sender.
 *
 * @param {import('socket.io').Socket} socket
 * @param {import('socket.io').Server} io
 * @param {object} data - { senderId, receiverId, message }
 */
const handlePrivateMessage = async (socket, io, data) => {
  try {
    const { senderId, receiverId, message } = data;

    // Save message to MongoDB
    const savedMessage = await saveMessage(senderId, receiverId, message);

    const receiverSocketId = getSocketId(receiverId);

    let isDelivered = false;

    // Serialize to plain object with string IDs for consistent client-side comparison
    const messageObj = {
      ...savedMessage.toObject(),
      _id: savedMessage._id.toString(),
      senderId: savedMessage.senderId.toString(),
      receiverId: savedMessage.receiverId.toString(),
    };

    if (receiverSocketId) {
      // Receiver is online — deliver immediately
      io.to(receiverSocketId).emit(SOCKET_EVENTS.RECEIVE_PRIVATE_MESSAGE, messageObj);
      isDelivered = true;

      // Update delivered flag
      await savedMessage.updateOne({ delivered: true });

      // Notify sender that message was delivered
      socket.emit(SOCKET_EVENTS.MESSAGE_DELIVERED, { messageId: messageObj._id });
    }

    // Confirm to sender with the full saved message object (echo)
    socket.emit(SOCKET_EVENTS.RECEIVE_PRIVATE_MESSAGE, { ...messageObj, _self: true });

    logger.socket('Private message sent', {
      from: senderId,
      to: receiverId,
      delivered: isDelivered,
    });
  } catch (error) {
    logger.error('handlePrivateMessage error', { error: error.message });
    socket.emit(SOCKET_EVENTS.ERROR, { message: 'Failed to send message' });
  }
};

/**
 * Marks all messages from a sender as read and notifies the sender.
 *
 * @param {import('socket.io').Socket} socket
 * @param {import('socket.io').Server} io
 * @param {object} data - { senderId, receiverId }
 */
const handleMessageRead = async (socket, io, data) => {
  try {
    const { senderId, receiverId } = data;

    await markMessagesRead(senderId, receiverId);

    const senderSocketId = getSocketId(senderId);
    if (senderSocketId) {
      io.to(senderSocketId).emit(SOCKET_EVENTS.MESSAGE_READ, { receiverId });
    }
  } catch (error) {
    logger.error('handleMessageRead error', { error: error.message });
  }
};

module.exports = {
  handleUserJoin,
  handleUserDisconnect,
  handlePrivateMessage,
  handleMessageRead,
};
