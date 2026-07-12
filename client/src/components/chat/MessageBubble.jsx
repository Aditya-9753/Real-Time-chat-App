/**
 * @file MessageBubble.jsx
 * @description Individual message bubble with text, timestamp, and status icons.
 */

import MessageStatus from './MessageStatus';
import { formatTime } from '../../utils/formatTime';
import useAuth from '../../hooks/useAuth';

const MessageBubble = ({ message }) => {
  const { user } = useAuth();
  const isSent = message.senderId?.toString() === user?._id?.toString();

  return (
    <div
      className={`message-wrapper ${isSent ? 'sent' : 'received'}`}
      role="listitem"
      aria-label={`${isSent ? 'You' : 'Other'}: ${message.message}`}
    >
      <div
        className={`message-bubble ${isSent ? 'sent' : 'received'}`}
        id={`message-${message._id}`}
      >
        {/* Message text */}
        <p className="message-text">{message.message}</p>

        {/* Timestamp + status */}
        <div className="message-meta">
          <span className="message-time">{formatTime(message.createdAt)}</span>
          {/* Only show status ticks on sent messages */}
          {isSent && (
            <MessageStatus
              delivered={message.delivered}
              read={message.read}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
