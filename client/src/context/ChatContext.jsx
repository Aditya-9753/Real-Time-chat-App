/**
 * @file ChatContext.jsx
 * @description Provides chat state: user list, selected user, messages, and typing.
 * Orchestrates socket event listeners and API calls for the chat feature.
 */

import { createContext, useState, useCallback, useContext, useEffect, useRef } from 'react';
import { SocketContext } from './SocketContext';
import { AuthContext } from './AuthContext';
import { fetchUsers } from '../services/userService';
import { fetchMessages } from '../services/messageService';
import { SOCKET_EVENTS } from '../utils/constants';

export const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const { socket } = useContext(SocketContext);
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState({}); // { [userId]: boolean }
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Ref to track selected user in socket handlers (avoids stale closure)
  const selectedUserRef = useRef(null);
  selectedUserRef.current = selectedUser;

  // ─── Load Users ─────────────────────────────────────────────────────────────
  const loadUsers = useCallback(async () => {
    if (!user) return;
    setLoadingUsers(true);
    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      console.error('Failed to load users', err);
    } finally {
      setLoadingUsers(false);
    }
  }, [user]);

  // ─── Select User & Load Chat History ────────────────────────────────────────
  const selectUser = useCallback(async (targetUser) => {
    setSelectedUser(targetUser);
    setMessages([]);
    setLoadingMessages(true);
    try {
      const history = await fetchMessages(targetUser._id);
      setMessages(history);

      // Mark messages from this user as read
      if (socket && user) {
        socket.emit(SOCKET_EVENTS.MESSAGE_READ, {
          senderId: targetUser._id,
          receiverId: user._id,
        });
      }
    } catch (err) {
      console.error('Failed to load messages', err);
    } finally {
      setLoadingMessages(false);
    }
  }, [socket, user]);

  // ─── Socket Event Listeners ──────────────────────────────────────────────────
  useEffect(() => {
    if (!socket || !user) return;

    // Incoming private message
    const handleReceiveMessage = (message) => {
      const currentSelected = selectedUserRef.current;
      const userId = user._id?.toString();
      const senderId = message.senderId?.toString();
      const receiverId = message.receiverId?.toString();
      const selectedId = currentSelected?._id?.toString();

      // Determine if this message belongs to the currently open conversation
      const isOwnEcho = message._self === true; // server echoes sent msg back to sender
      const isIncoming =
        senderId === selectedId && receiverId === userId;
      const isSentByMe =
        isOwnEcho && senderId === userId && receiverId === selectedId;

      if (!isIncoming && !isSentByMe) return;

      const cleanMessage = { ...message };
      delete cleanMessage._self;

      setMessages((prev) => {
        // Prevent duplicates
        if (prev.find((m) => m._id === cleanMessage._id)) return prev;
        return [...prev, cleanMessage];
      });
    };

    // Message delivered status update
    const handleMessageDelivered = ({ messageId }) => {
      setMessages((prev) =>
        prev.map((m) => (m._id === messageId ? { ...m, delivered: true } : m))
      );
    };

    // Message read status update
    const handleMessageRead = ({ receiverId }) => {
      setMessages((prev) =>
        prev.map((m) =>
          m.senderId?.toString() === user._id?.toString() ? { ...m, read: true, delivered: true } : m
        )
      );
    };

    // Typing indicators
    const handleTyping = ({ senderId }) => {
      setTypingUsers((prev) => ({ ...prev, [senderId]: true }));
    };

    const handleStopTyping = ({ senderId }) => {
      setTypingUsers((prev) => {
        const updated = { ...prev };
        delete updated[senderId];
        return updated;
      });
    };

    // Online/offline status
    const handleUserOnline = ({ userId }) => {
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, online: true } : u))
      );
    };

    const handleUserOffline = ({ userId }) => {
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, online: false } : u))
      );
    };

    socket.on(SOCKET_EVENTS.RECEIVE_PRIVATE_MESSAGE, handleReceiveMessage);
    socket.on(SOCKET_EVENTS.MESSAGE_DELIVERED, handleMessageDelivered);
    socket.on(SOCKET_EVENTS.MESSAGE_READ, handleMessageRead);
    socket.on(SOCKET_EVENTS.TYPING, handleTyping);
    socket.on(SOCKET_EVENTS.STOP_TYPING, handleStopTyping);
    socket.on(SOCKET_EVENTS.USER_ONLINE, handleUserOnline);
    socket.on(SOCKET_EVENTS.USER_OFFLINE, handleUserOffline);

    return () => {
      socket.off(SOCKET_EVENTS.RECEIVE_PRIVATE_MESSAGE, handleReceiveMessage);
      socket.off(SOCKET_EVENTS.MESSAGE_DELIVERED, handleMessageDelivered);
      socket.off(SOCKET_EVENTS.MESSAGE_READ, handleMessageRead);
      socket.off(SOCKET_EVENTS.TYPING, handleTyping);
      socket.off(SOCKET_EVENTS.STOP_TYPING, handleStopTyping);
      socket.off(SOCKET_EVENTS.USER_ONLINE, handleUserOnline);
      socket.off(SOCKET_EVENTS.USER_OFFLINE, handleUserOffline);
    };
  }, [socket, user]);

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  /**
   * Sends a message via socket.
   * @param {string} messageText
   */
  const sendMessage = useCallback(
    (messageText) => {
      if (!socket || !selectedUser || !user || !messageText.trim()) return;

      socket.emit(SOCKET_EVENTS.PRIVATE_MESSAGE, {
        senderId: user._id,
        receiverId: selectedUser._id,
        message: messageText.trim(),
      });
    },
    [socket, selectedUser, user]
  );

  return (
    <ChatContext.Provider
      value={{
        users,
        selectedUser,
        messages,
        typingUsers,
        loadingUsers,
        loadingMessages,
        selectUser,
        sendMessage,
        loadUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
