/**
 * @file userService.js (client)
 * @description API calls for fetching users.
 */

import axiosInstance from '../api/axios';

/**
 * Fetches all users except the current user.
 * @returns {Promise<object[]>} Array of user objects
 */
export const fetchUsers = async () => {
  const response = await axiosInstance.get('/users');
  return response.data.data.users;
};
