/**
 * @file ChatContainer.jsx
 * @description Assembles the full chat window: header, body, and input.
 * Shown when a user is selected from the sidebar.
 */

import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import MessageInput from './MessageInput';
import EmptyChat from './EmptyChat';
import useChat from '../../hooks/useChat';

const ChatContainer = () => {
  const { selectedUser } = useChat();

  if (!selectedUser) {
    return (
      <main className="chat-window">
        <div className="chat-bg-pattern" aria-hidden="true" />
        <EmptyChat />
      </main>
    );
  }

  return (
    <main
      className="chat-window"
      aria-label={`Conversation with ${selectedUser.username}`}
    >
      <div className="chat-bg-pattern" aria-hidden="true" />

      {/* Header */}
      <ChatHeader user={selectedUser} />

      {/* Messages */}
      <ChatBody selectedUser={selectedUser} />

      {/* Input */}
      <MessageInput receiverId={selectedUser._id} />
    </main>
  );
};

export default ChatContainer;
