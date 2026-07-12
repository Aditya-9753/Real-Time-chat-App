/**
 * @file authController.js
 * @description Controller for authentication endpoints.
 * Delegates business logic to authService.
 */

const { loginOrRegister } = require('../services/authService');
const { sendSuccess, sendError } = require('../utils/response');
const { HTTP_STATUS, MESSAGES } = require('../utils/constants');

/**
 * POST /api/auth/login
 * Creates or retrieves a user by username (dummy auth).
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const login = async (req, res, next) => {
  try {
    const { username } = req.body;

    const { user, isNew } = await loginOrRegister(username);

    const message = isNew ? MESSAGES.USER_CREATED : MESSAGES.LOGIN_SUCCESS;

    return sendSuccess(res, message, { user }, isNew ? HTTP_STATUS.CREATED : HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
