/**
 * @file socketEvents.js
 * @description Re-exports SOCKET_EVENTS from constants for the socket layer.
 * Keeps socket handler files clean and avoids relative import chains.
 */

const { SOCKET_EVENTS } = require('../utils/constants');
module.exports = SOCKET_EVENTS;
