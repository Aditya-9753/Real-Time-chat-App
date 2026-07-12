/**
 * @file Message.js
 * @description Mongoose schema and model for the Message collection.
 * Stores one-to-one private messages with delivery and read tracking.
 */

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    /**
     * Reference to the user who sent the message.
     */
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Sender ID is required'],
    },

    /**
     * Reference to the user who should receive the message.
     */
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Receiver ID is required'],
    },

    /**
     * The text content of the message.
     */
    message: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
      maxlength: [2000, 'Message must be at most 2000 characters'],
    },

    /**
     * True once the message has been delivered to the receiver's socket.
     */
    delivered: {
      type: Boolean,
      default: false,
    },

    /**
     * True once the receiver has read/opened the conversation.
     */
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// Compound index to fetch full conversation between two users efficiently
messageSchema.index({ senderId: 1, receiverId: 1, createdAt: 1 });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
