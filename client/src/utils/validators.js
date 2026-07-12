/**
 * @file validators.js
 * @description Frontend input validation helpers.
 */

/**
 * Validates a username input.
 * @param {string} username
 * @returns {{ valid: boolean, message: string }}
 */
export const validateUsername = (username) => {
  if (!username || !username.trim()) {
    return { valid: false, message: 'Username is required' };
  }
  if (username.trim().length < 2) {
    return { valid: false, message: 'Username must be at least 2 characters' };
  }
  if (username.trim().length > 30) {
    return { valid: false, message: 'Username must be at most 30 characters' };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username.trim())) {
    return { valid: false, message: 'Only letters, numbers, and underscores allowed' };
  }
  return { valid: true, message: '' };
};
