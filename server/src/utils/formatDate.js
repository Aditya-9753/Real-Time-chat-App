/**
 * @file formatDate.js
 * @description Utility for formatting date values consistently.
 */

/**
 * Formats a Date object to a readable string.
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toISOString();
};

/**
 * Returns a relative time label (e.g., "2 minutes ago").
 * @param {Date} date
 * @returns {string}
 */
const getRelativeTime = (date) => {
  const now = new Date();
  const diff = Math.floor((now - new Date(date)) / 1000); // seconds

  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

module.exports = { formatDate, getRelativeTime };
