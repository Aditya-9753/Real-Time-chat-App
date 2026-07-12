/**
 * @file SocketContext.jsx
 * @description Provides the Socket.io client instance and connection state.
 * Manages connection lifecycle tied to the authenticated user.
 */

import { createContext, useEffect, useState, useContext } from 'react';
import { getSocket, disconnectSocket } from '../services/socketService';
import { SOCKET_EVENTS } from '../utils/constants';
import { AuthContext } from './AuthContext';

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  // Use state (not ref) so consumers re-render when socket becomes available
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!user?._id) {
      // Not logged in — make sure socket is disconnected
      disconnectSocket();
      setSocket(null);
      setIsConnected(false);
      return;
    }

    // Get (or create) singleton socket
    const socketInstance = getSocket();
    setSocket(socketInstance);

    // ── Connect ───────────────────────────────────────────────────────────────
    if (!socketInstance.connected) {
      socketInstance.connect();
    }

    const handleConnect = () => {
      setIsConnected(true);
      // Identify this socket with the user's MongoDB ID
      socketInstance.emit(SOCKET_EVENTS.JOIN, user._id);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const handleReconnect = () => {
      // Re-identify after reconnection
      socketInstance.emit(SOCKET_EVENTS.JOIN, user._id);
    };

    socketInstance.on('connect', handleConnect);
    socketInstance.on('disconnect', handleDisconnect);
    socketInstance.on('reconnect', handleReconnect);

    // If already connected when this effect runs
    if (socketInstance.connected) {
      handleConnect();
    }

    return () => {
      // Cleanup listeners on unmount / user change
      socketInstance.off('connect', handleConnect);
      socketInstance.off('disconnect', handleDisconnect);
      socketInstance.off('reconnect', handleReconnect);
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
