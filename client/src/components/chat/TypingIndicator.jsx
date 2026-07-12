/**
 * @file TypingIndicator.jsx
 * @description Animated three-dot bubble shown when the other user is typing.
 */

const TypingIndicator = ({ username }) => (
  <div className="typing-indicator-wrapper" aria-live="polite" aria-label={`${username} is typing`}>
    <div className="typing-bubble" role="status">
      <div className="typing-dot" aria-hidden="true" />
      <div className="typing-dot" aria-hidden="true" />
      <div className="typing-dot" aria-hidden="true" />
    </div>
    <span
      style={{
        fontSize: 'var(--font-size-xs)',
        color: 'var(--text-muted)',
        fontStyle: 'italic',
      }}
    >
      {username} is typing...
    </span>
  </div>
);

export default TypingIndicator;
