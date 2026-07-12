/**
 * @file response.js
 * @description Utility functions to send standardized API responses.
 * Ensures consistent JSON response shape across all endpoints.
 */

/**
 * Sends a successful JSON response.
 * @param {object} res - Express response object
 * @param {string} message - Success message
 * @param {*} data - Response payload
 * @param {number} [statusCode=200] - HTTP status code
 */
const sendSuccess = (res, message, data = null, statusCode = 200) => {
  const response = {
    success: true,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

/**
 * Sends an error JSON response.
 * @param {object} res - Express response object
 * @param {string} message - Error message
 * @param {number} [statusCode=500] - HTTP status code
 * @param {*} [errors=null] - Validation errors or additional detail
 */
const sendError = (res, message, statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message,
  };

  if (errors !== null) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

module.exports = { sendSuccess, sendError };
