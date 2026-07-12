/**
 * @file validationMiddleware.js
 * @description Middleware to check express-validator results and return 400 on failure.
 * Must be placed after validation rule arrays in route definitions.
 */

const { validationResult } = require('express-validator');
const { sendError } = require('../utils/response');
const { HTTP_STATUS, MESSAGES } = require('../utils/constants');

/**
 * Middleware that reads express-validator errors and sends a 400 response
 * if any validation rule was violated. Calls next() if validation passes.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Format errors as an array of { field, message } objects
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    return sendError(res, MESSAGES.VALIDATION_ERROR, HTTP_STATUS.BAD_REQUEST, formattedErrors);
  }

  next();
};

module.exports = validateRequest;
