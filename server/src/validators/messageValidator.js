/**
 * @file messageValidator.js
 * @description express-validator rules for message endpoints.
 */

const { body, param } = require('express-validator');
const { MESSAGES } = require('../utils/constants');

/**
 * Validates the POST /api/messages request body.
 */
const sendMessageValidationRules = [
  body('receiverId')
    .trim()
    .notEmpty()
    .withMessage(MESSAGES.RECEIVER_REQUIRED)
    .isMongoId()
    .withMessage('Invalid receiver ID format'),

  body('message')
    .trim()
    .notEmpty()
    .withMessage(MESSAGES.MESSAGE_REQUIRED)
    .isLength({ max: 2000 })
    .withMessage('Message must be at most 2000 characters'),
];

/**
 * Validates the GET /api/messages/:receiverId route param.
 */
const getMessagesValidationRules = [
  param('receiverId')
    .trim()
    .notEmpty()
    .withMessage(MESSAGES.RECEIVER_REQUIRED)
    .isMongoId()
    .withMessage('Invalid receiver ID format'),
];

module.exports = { sendMessageValidationRules, getMessagesValidationRules };
