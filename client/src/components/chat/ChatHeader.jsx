/**
 * @file ChatHeader.jsx
 * @description Header bar for the active conversation.
 * Shows the selected user's avatar, name, online status, and typing indicator.
 */

import useChat from '../../hooks/useChat';

const ChatHeader = ({ user }) => {
  const { typingUsers } = useChat();
  const isTyping = typingUsers[user._id];
  const isOnline = user.online;

  const initial = user.username?.charAt(0).toUpperCase() || '?';

  return (
    <header className="chat-header" aria-label={`Chat with ${user.username}`}>
      <div className="chat-header-left">
        {/* Avatar */}
        <div className="avatar avatar-lg" aria-hidden="true">
          {initial}
        </div>

        {/* Name & Status */}
        <div className="chat-header-info">
          <h2 className="chat-header-name">{user.username}</h2>
          <p
            className={`chat-header-status ${isTyping ? 'typing-status' : isOnline ? 'online' : ''}`}
            aria-live="polite"
            aria-label={isTyping ? 'Typing...' : isOnline ? 'Online' : 'Offline'}
          >
            {isTyping ? 'typing...' : isOnline ? 'Online' : 'Last seen recently'}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="chat-header-actions" aria-label="Chat actions">
        {/* Call (UI only) */}
        <button
          className="icon-btn"
          title="Voice call (coming soon)"
          aria-label="Voice call"
          disabled
          style={{ opacity: 0.4 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.36 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.9-.9a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </button>

        {/* Video (UI only) */}
        <button
          className="icon-btn"
          title="Video call (coming soon)"
          aria-label="Video call"
          disabled
          style={{ opacity: 0.4 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
