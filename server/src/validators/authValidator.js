/**
 * @file authValidator.js
 * @description express-validator rules for the authentication endpoints.
 */

const { body } = require('express-validator');
const { MESSAGES } = require('../utils/constants');

/**
 * Validates the login request body.
 * Username must be a non-empty trimmed string between 2–30 characters.
 */
const loginValidationRules = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage(MESSAGES.USERNAME_REQUIRED)
    .isLength({ min: 2 })
    .withMessage(MESSAGES.USERNAME_TOO_SHORT)
    .isLength({ max: 30 })
    .withMessage(MESSAGES.USERNAME_TOO_LONG)
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
];

module.exports = { loginValidationRules };
