/**
 * @file MessageInput.jsx
 * @description Message composition input with send button and typing indicator emission.
 * Supports Enter to send and Shift+Enter for newlines.
 */

import { useState, useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import useChat from '../../hooks/useChat';
import useTyping from '../../hooks/useTyping';

const MessageInput = ({ receiverId }) => {
  const { user } = useAuth();
  const { sendMessage } = useChat();
  const [text, setText] = useState('');
  const { onTyping, onStopTyping } = useTyping(user?._id, receiverId);
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
    onTyping(); // Emit typing event
  };

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    sendMessage(trimmed);
    setText('');
    onStopTyping(); // Immediately stop the typing indicator

    // Refocus input after sending
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    // Send on Enter (not Shift+Enter)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-input-container" role="form" aria-label="Message input">
      <div className="message-input-wrapper">
        {/* Emoji placeholder (future feature) */}
        <button
          className="icon-btn"
          type="button"
          title="Emoji (coming soon)"
          style={{ opacity: 0.4, flexShrink: 0 }}
          tabIndex={-1}
          aria-hidden="true"
          disabled
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </button>

        {/* Text Input */}
        <textarea
          ref={textareaRef}
          id="message-input"
          className="message-input"
          placeholder="Type a message..."
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={1}
          aria-label="Message text"
          autoFocus
        />
      </div>

      {/* Send Button */}
      <button
        type="button"
        className="send-btn"
        onClick={handleSend}
        disabled={!text.trim()}
        id="send-message-btn"
        aria-label="Send message"
        title="Send (Enter)"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </div>
  );
};

export default MessageInput;
