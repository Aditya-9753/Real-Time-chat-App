/**
 * @file messageService.js (client)
 * @description API calls for chat messages.
 */

import axiosInstance from '../api/axios';

/**
 * Fetches the full conversation between the current user and a receiver.
 * @param {string} receiverId
 * @returns {Promise<object[]>} Array of message objects
 */
export const fetchMessages = async (receiverId) => {
  const response = await axiosInstance.get(`/messages/${receiverId}`);
  return response.data.data.messages;
};
