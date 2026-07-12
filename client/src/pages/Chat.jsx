/**
 * @file Chat.jsx
 * @description Main chat page — wraps the MainLayout inside ChatProvider.
 * This is the core application view after login.
 */

import { ChatProvider } from '../context/ChatContext';
import MainLayout from '../layouts/MainLayout';

const Chat = () => {
  return (
    <ChatProvider>
      <MainLayout />
    </ChatProvider>
  );
};

export default Chat;
