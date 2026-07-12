/**
 * @file ChatBody.jsx
 * @description Scrollable message list with date separators and typing indicator.
 * Auto-scrolls to the latest message on every change.
 */

import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { LoadingDots } from '../common/Loader';
import useAutoScroll from '../../hooks/useAutoScroll';
import useChat from '../../hooks/useChat';
import { formatDateLabel, isSameDay } from '../../utils/formatTime';

const ChatBody = ({ selectedUser }) => {
  const { messages, loadingMessages, typingUsers } = useChat();
  const isTyping = typingUsers[selectedUser?._id];
  const bottomRef = useAutoScroll([messages, isTyping]);

  if (loadingMessages) {
    return (
      <div
        className="chat-body"
        style={{ alignItems: 'center', justifyContent: 'center' }}
        aria-busy="true"
        aria-label="Loading messages"
      >
        <LoadingDots />
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', marginTop: 8 }}>
          Loading messages...
        </p>
      </div>
    );
  }

  if (messages.length === 0 && !isTyping) {
    return (
      <div
        className="chat-body"
        style={{ alignItems: 'center', justifyContent: 'center' }}
        aria-label="No messages yet"
      >
        <div
          style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: 'var(--font-size-sm)',
          }}
        >
          <p style={{ fontSize: '2rem', marginBottom: 8 }}>👋</p>
          <p>
            Say hi to <strong style={{ color: 'var(--text-primary)', textTransform: 'capitalize' }}>{selectedUser?.username}</strong>!
          </p>
          <p style={{ marginTop: 4, fontSize: 'var(--font-size-xs)' }}>No messages yet. Start the conversation.</p>
        </div>
        <div ref={bottomRef} />
      </div>
    );
  }

  return (
    <div
      className="chat-body"
      role="list"
      aria-label={`Messages with ${selectedUser?.username}`}
      aria-live="polite"
    >
      {messages.map((message, index) => {
        const prevMessage = messages[index - 1];
        const showDateSeparator = !prevMessage || !isSameDay(prevMessage.createdAt, message.createdAt);

        return (
          <div key={message._id}>
            {/* Date separator */}
            {showDateSeparator && (
              <div className="date-separator" aria-label={`Messages from ${formatDateLabel(message.createdAt)}`}>
                <span className="date-separator-label">{formatDateLabel(message.createdAt)}</span>
              </div>
            )}
            <MessageBubble message={message} />
          </div>
        );
      })}

      {/* Typing indicator */}
      {isTyping && (
        <TypingIndicator username={selectedUser?.username} />
      )}

      {/* Invisible scroll anchor */}
      <div ref={bottomRef} aria-hidden="true" />
    </div>
  );
};

export default ChatBody;
