/**
 * @file formatTime.js
 * @description Time formatting utilities for message timestamps.
 */

/**
 * Formats a timestamp to HH:MM format (12-hour).
 * @param {string|Date} timestamp
 * @returns {string} e.g. "2:45 PM"
 */
export const formatTime = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Formats a date to show "Today", "Yesterday", or the date.
 * @param {string|Date} timestamp
 * @returns {string}
 */
export const formatDateLabel = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

  return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
};

/**
 * Returns true if two timestamps are on the same calendar day.
 * @param {string|Date} a
 * @param {string|Date} b
 * @returns {boolean}
 */
export const isSameDay = (a, b) => {
  if (!a || !b) return false;
  return new Date(a).toDateString() === new Date(b).toDateString();
};
