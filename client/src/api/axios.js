/**
 * @file axios.js
 * @description Axios instance with base URL, request/response interceptors.
 * Automatically attaches the user ID header to every request.
 */

import axios from 'axios';
import { getUser } from '../utils/storage';
import { API_BASE_URL } from '../utils/constants';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
// Attach the logged-in user's ID to every request for dummy auth
axiosInstance.interceptors.request.use(
  (config) => {
    const user = getUser();
    if (user?._id) {
      config.headers['x-user-id'] = user._id;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────
// Normalize error responses for consistent handling in services
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.';

    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
