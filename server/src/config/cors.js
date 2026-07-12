/**
 * @file cors.js
 * @description CORS configuration for the Express application.
 * Restricts cross-origin requests to the trusted frontend origin.
 */

const corsOptions = {
  // Allow requests from the React dev server (or production URL)
  origin: process.env.CLIENT_URL || 'http://localhost:5173',

  // Allow standard HTTP methods
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

  // Allow common request headers
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id'],

  // Allow cookies / credentials (not used here but good practice)
  credentials: true,
};

module.exports = corsOptions;
