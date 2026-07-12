/**
 * @file authService.js (client)
 * @description API calls related to authentication.
 */

import axiosInstance from '../api/axios';

/**
 * Logs in (or registers) a user by username.
 * @param {string} username
 * @returns {Promise<object>} User object
 */
export const loginUser = async (username) => {
  const response = await axiosInstance.post('/auth/login', { username });
  return response.data.data.user;
};
