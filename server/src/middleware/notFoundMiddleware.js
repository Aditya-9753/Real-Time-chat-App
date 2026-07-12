/**
 * @file notFoundMiddleware.js
 * @description Catches all unmatched routes and returns a 404 response.
 */

const { HTTP_STATUS, MESSAGES } = require('../utils/constants');

/**
 * Middleware for handling undefined routes.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const notFoundMiddleware = (req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
};

module.exports = notFoundMiddleware;
