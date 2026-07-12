/**
 * @file messageRoutes.js
 * @description Express router for message endpoints.
 */

const express = require('express');
const router = express.Router();
const { getMessages, sendMessage } = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validationMiddleware');
const {
  sendMessageValidationRules,
  getMessagesValidationRules,
} = require('../validators/messageValidator');

// GET /api/messages/:receiverId — Fetch conversation history (requires auth)
router.get('/:receiverId', authMiddleware, getMessagesValidationRules, validateRequest, getMessages);

// POST /api/messages — Save a new message (requires auth)
router.post('/', authMiddleware, sendMessageValidationRules, validateRequest, sendMessage);

module.exports = router;
