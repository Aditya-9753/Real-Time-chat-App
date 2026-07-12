/**
 * @file messageController.js
 * @description Controller for message endpoints.
 * Delegates business logic to messageService.
 */

const { getConversation, saveMessage } = require('../services/messageService');
const { sendSuccess } = require('../utils/response');
const { HTTP_STATUS, MESSAGES } = require('../utils/constants');

/**
 * GET /api/messages/:receiverId
 * Returns the full chat history between the logged-in user and the selected user.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const getMessages = async (req, res, next) => {
  try {
    const { receiverId } = req.params;
    const userId = req.user._id;

    const messages = await getConversation(userId, receiverId);

    return sendSuccess(res, MESSAGES.MESSAGES_FETCHED, { messages });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/messages
 * Saves a new message to MongoDB (REST fallback — primary delivery via socket).
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const sendMessage = async (req, res, next) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.user._id;

    const savedMessage = await saveMessage(senderId, receiverId, message);

    return sendSuccess(res, MESSAGES.MESSAGE_SENT, { message: savedMessage }, HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

module.exports = { getMessages, sendMessage };
