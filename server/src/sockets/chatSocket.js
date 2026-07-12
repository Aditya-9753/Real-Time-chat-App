/**
 * @file chatSocket.js
 * @description Main Socket.io event handler for the chat application.
 * Registers all real-time event listeners for each connected socket.
 *
 * Events handled:
 *  - connection      : Socket lifecycle
 *  - join            : User identifies themselves on connect
 *  - privateMessage  : Incoming private message
 *  - typing          : Typing indicator start
 *  - stopTyping      : Typing indicator stop
 *  - messageRead     : Receiver opened the conversation
 *  - disconnect      : Socket disconnected
 */

const EVENTS = require('./socketEvents');
const {
  handleUserJoin,
  handleUserDisconnect,
  handlePrivateMessage,
  handleMessageRead,
} = require('../services/socketService');
const logger = require('../utils/logger');
const { getSocketId } = require('../utils/socketUsers');

/**
 * Attaches all chat socket event handlers to the Socket.io server.
 * @param {import('socket.io').Server} io
 */
const initChatSocket = (io) => {
  io.on(EVENTS.CONNECTION, (socket) => {
    logger.socket(`New socket connected: ${socket.id}`);

    // ─── Join ──────────────────────────────────────────────────────────────────
    // Client must emit 'join' immediately after connecting with their userId
    socket.on(EVENTS.JOIN, async (userId) => {
      if (!userId) {
        logger.warn('Join event without userId', { socketId: socket.id });
        return;
      }
      await handleUserJoin(socket, io, userId);
    });

    // ─── Private Message ───────────────────────────────────────────────────────
    // data: { senderId: string, receiverId: string, message: string }
    socket.on(EVENTS.PRIVATE_MESSAGE, async (data) => {
      if (!data?.senderId || !data?.receiverId || !data?.message) {
        socket.emit(EVENTS.ERROR, { message: 'Invalid message data' });
        return;
      }
      await handlePrivateMessage(socket, io, data);
    });

    // ─── Typing Indicator ──────────────────────────────────────────────────────
    // data: { senderId: string, receiverId: string }
    socket.on(EVENTS.TYPING, (data) => {
      const { senderId, receiverId } = data || {};
      if (!senderId || !receiverId) return;

      const receiverSocketId = getSocketId(receiverId);
      if (receiverSocketId) {
        // Notify only the receiver that sender is typing
        io.to(receiverSocketId).emit(EVENTS.TYPING, { senderId });
      }
    });

    // ─── Stop Typing ───────────────────────────────────────────────────────────
    socket.on(EVENTS.STOP_TYPING, (data) => {
      const { senderId, receiverId } = data || {};
      if (!senderId || !receiverId) return;

      const receiverSocketId = getSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit(EVENTS.STOP_TYPING, { senderId });
      }
    });

    // ─── Message Read ──────────────────────────────────────────────────────────
    // data: { senderId: string, receiverId: string }
    // "senderId" is who originally sent the messages being read
    socket.on(EVENTS.MESSAGE_READ, async (data) => {
      const { senderId, receiverId } = data || {};
      if (!senderId || !receiverId) return;
      await handleMessageRead(socket, io, { senderId, receiverId });
    });

    // ─── Disconnect ────────────────────────────────────────────────────────────
    socket.on(EVENTS.DISCONNECT, async (reason) => {
      logger.socket(`Socket disconnected: ${socket.id}`, { reason });
      await handleUserDisconnect(socket, io);
    });
  });
};

module.exports = initChatSocket;
