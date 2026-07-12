/**
 * @file AuthContext.jsx
 * @description Provides authentication state and actions across the app.
 * Persists the logged-in user to localStorage for session continuity.
 */

import { createContext, useState, useCallback } from 'react';
import { saveUser, getUser, removeUser } from '../utils/storage';
import { loginUser } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize from localStorage so the session survives page refresh
  const [user, setUser] = useState(() => getUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Logs in the user and persists their data.
   * @param {string} username
   */
  const login = useCallback(async (username) => {
    setLoading(true);
    setError('');
    try {
      const loggedInUser = await loginUser(username);
      saveUser(loggedInUser);
      setUser(loggedInUser);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Logs out the user and clears stored session.
   */
  const logout = useCallback(() => {
    removeUser();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
