/**
 * @file MessageStatus.jsx
 * @description Renders the delivery/read tick icons for sent messages.
 * Single tick = sent, double tick grey = delivered, double tick blue = read.
 */

const MessageStatus = ({ delivered, read }) => {
  // Read: double blue ticks
  if (read) {
    return (
      <span className="message-status-icon read" aria-label="Read" title="Read">
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <path d="M11.071.653L4.5 7.224l-2.571-2.57L.5 6.082l4 4 8-8z" fill="#53bdeb"/>
          <path d="M15.071.653L8.5 7.224l-.571-.571-1.43 1.43L8.5 10.082l8-8z" fill="#53bdeb"/>
        </svg>
      </span>
    );
  }

  // Delivered: double grey ticks
  if (delivered) {
    return (
      <span className="message-status-icon" aria-label="Delivered" title="Delivered">
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <path d="M11.071.653L4.5 7.224l-2.571-2.57L.5 6.082l4 4 8-8z" fill="#8696a0"/>
          <path d="M15.071.653L8.5 7.224l-.571-.571-1.43 1.43L8.5 10.082l8-8z" fill="#8696a0"/>
        </svg>
      </span>
    );
  }

  // Sent: single grey tick
  return (
    <span className="message-status-icon" aria-label="Sent" title="Sent">
      <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
        <path d="M11.071.653L4.5 7.224l-2.571-2.57L.5 6.082l4 4 8-8z" fill="#8696a0"/>
      </svg>
    </span>
  );
};

export default MessageStatus;
