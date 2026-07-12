/**
 * @file app.js
 * @description Express application factory.
 * Sets up all middleware, routes, and error handlers.
 * Separated from server.js to keep server concerns isolated.
 */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const corsOptions = require('./config/cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const notFoundMiddleware = require('./middleware/notFoundMiddleware');

const app = express();

// ─── Security & CORS ──────────────────────────────────────────────────────────
app.use(cors(corsOptions));

// ─── Request Parsing ──────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ─── HTTP Request Logging ─────────────────────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running', timestamp: new Date().toISOString() });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// ─── 404 Handler (must be after all routes) ───────────────────────────────────
app.use(notFoundMiddleware);

// ─── Global Error Handler (must be last) ─────────────────────────────────────
app.use(errorMiddleware);

module.exports = app;
