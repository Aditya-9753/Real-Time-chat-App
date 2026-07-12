/**
 * @file userController.js
 * @description Controller for user-related endpoints.
 * Delegates business logic to userService.
 */

const { getAllUsersExcept } = require('../services/userService');
const { sendSuccess, sendError } = require('../utils/response');
const { HTTP_STATUS, MESSAGES } = require('../utils/constants');

/**
 * GET /api/users
 * Returns all users except the currently authenticated user.
 * Includes real-time online status from the socket map.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersExcept(req.user._id);
    return sendSuccess(res, MESSAGES.USERS_FETCHED, { users });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers };
