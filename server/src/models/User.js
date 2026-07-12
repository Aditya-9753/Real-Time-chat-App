/**
 * @file User.js
 * @description Mongoose schema and model for the User collection.
 * Tracks username, socket connection, and online/offline presence.
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    /**
     * Unique username chosen at login. Stored in lowercase for consistency.
     */
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [2, 'Username must be at least 2 characters'],
      maxlength: [30, 'Username must be at most 30 characters'],
    },

    /**
     * Current Socket.io socket ID. Updated on every (re)connection.
     * Null when the user is offline.
     */
    socketId: {
      type: String,
      default: null,
    },

    /**
     * Whether the user currently has an active socket connection.
     */
    online: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

// Index for fast lookups by socket ID (used during disconnect events)
userSchema.index({ socketId: 1 });

// Index for online status queries
userSchema.index({ online: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;
