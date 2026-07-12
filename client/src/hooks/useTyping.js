/**
 * @file useTyping.js
 * @description Custom hook for managing typing indicator logic.
 * Emits typing/stopTyping events with debounce to avoid spamming the server.
 */

import { useRef, useCallback, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { SOCKET_EVENTS, TYPING_TIMEOUT_MS } from '../utils/constants';

/**
 * @param {string} senderId - The logged-in user's ID
 * @param {string} receiverId - The selected chat partner's ID
 * @returns {{ onTyping: Function, onStopTyping: Function }}
 */
const useTyping = (senderId, receiverId) => {
  const { socket } = useContext(SocketContext);
  const typingTimerRef = useRef(null);
  const isTypingRef = useRef(false);

  /**
   * Call this on every keypress in the message input.
   * Starts the typing indicator and resets the debounce timer.
   */
  const onTyping = useCallback(() => {
    if (!socket || !senderId || !receiverId) return;

    if (!isTypingRef.current) {
      isTypingRef.current = true;
      socket.emit(SOCKET_EVENTS.TYPING, { senderId, receiverId });
    }

    // Reset debounce timer
    clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      isTypingRef.current = false;
      socket.emit(SOCKET_EVENTS.STOP_TYPING, { senderId, receiverId });
    }, TYPING_TIMEOUT_MS);
  }, [socket, senderId, receiverId]);

  /**
   * Call this when the user sends a message to immediately stop the indicator.
   */
  const onStopTyping = useCallback(() => {
    if (!socket || !senderId || !receiverId) return;
    clearTimeout(typingTimerRef.current);
    if (isTypingRef.current) {
      isTypingRef.current = false;
      socket.emit(SOCKET_EVENTS.STOP_TYPING, { senderId, receiverId });
    }
  }, [socket, senderId, receiverId]);

  return { onTyping, onStopTyping };
};

export default useTyping;
