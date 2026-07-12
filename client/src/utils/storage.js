/**
 * @file storage.js
 * @description Utility wrappers around localStorage for persistent session data.
 */

const STORAGE_KEYS = {
  USER: 'chat_user',
};

/**
 * Saves the logged-in user to localStorage.
 * @param {object} user - User object from API response
 */
export const saveUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

/**
 * Retrieves the stored user from localStorage.
 * @returns {object|null}
 */
export const getUser = () => {
  try {
    const item = localStorage.getItem(STORAGE_KEYS.USER);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

/**
 * Removes the user session from localStorage.
 */
export const removeUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};
