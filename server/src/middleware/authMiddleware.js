/**
 * @file authMiddleware.js
 * @description Middleware that extracts the current user's ID from request headers.
 * Since we use dummy authentication (username-based login), we pass
 * the userId via the `x-user-id` header set by the frontend after login.
 *
 * In production, this would verify a JWT token.
 */

const { sendError } = require('../utils/response');
const { HTTP_STATUS } = require('../utils/constants');
const User = require('../models/User');

/**
 * Attaches the authenticated user object to req.user.
 * Requires the `x-user-id` header to be set by the client.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const authMiddleware = async (req, res, next) => {
  try {
    const userId = req.headers['x-user-id'];

    if (!userId) {
      return sendError(res, 'Authentication required. Please log in.', HTTP_STATUS.UNAUTHORIZED);
    }

    const user = await User.findById(userId);

    if (!user) {
      return sendError(res, 'User not found. Please log in again.', HTTP_STATUS.UNAUTHORIZED);
    }

    // Attach user to request for downstream use
    req.user = user;
    next();
  } catch (error) {
    return sendError(res, 'Authentication failed.', HTTP_STATUS.UNAUTHORIZED);
  }
};

module.exports = authMiddleware;
