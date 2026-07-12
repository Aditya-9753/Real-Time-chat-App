/**
 * @file EmptyChat.jsx
 * @description Placeholder shown in the chat window when no user is selected.
 */

const EmptyChat = () => (
  <div className="empty-chat" role="main" aria-label="Select a conversation">
    {/* Icon */}
    <div className="empty-chat-icon" aria-hidden="true">
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </div>

    <h1 className="empty-chat-title">ChatApp</h1>

    <p className="empty-chat-subtitle">
      Select a user from the sidebar to start a private conversation.
      <br />
      Your messages are delivered instantly.
    </p>

    {/* Feature highlights */}
    <div
      style={{
        display: 'flex',
        gap: '24px',
        marginTop: '24px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {[
        { icon: '⚡', label: 'Real-time' },
        { icon: '🔒', label: 'Private' },
        { icon: '✓✓', label: 'Read Receipts' },
      ].map(({ icon, label }) => (
        <div
          key={label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: 'var(--surface-panel)',
            borderRadius: '20px',
            border: '1px solid var(--border-color)',
            fontSize: 'var(--font-size-xs)',
            color: 'var(--text-secondary)',
          }}
        >
          <span>{icon}</span>
          <span>{label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default EmptyChat;
