/**
 * @file NotFound.jsx
 * @description 404 page shown for unmatched routes.
 */

import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        background: 'var(--surface-bg)',
        textAlign: 'center',
        padding: '40px',
      }}
      id="not-found-page"
    >
      <div
        style={{
          fontSize: '6rem',
          fontWeight: 800,
          color: 'var(--brand-primary)',
          lineHeight: 1,
          letterSpacing: '-4px',
        }}
        aria-hidden="true"
      >
        404
      </div>

      <h1
        style={{
          fontSize: 'var(--font-size-xl)',
          fontWeight: 600,
          color: 'var(--text-primary)',
        }}
      >
        Page Not Found
      </h1>

      <p
        style={{
          color: 'var(--text-muted)',
          fontSize: 'var(--font-size-sm)',
          maxWidth: '320px',
          lineHeight: 1.6,
        }}
      >
        The page you're looking for doesn't exist or has been moved.
      </p>

      <button
        onClick={() => navigate('/chat')}
        id="go-home-btn"
        style={{
          marginTop: '8px',
          padding: '12px 28px',
          background: 'var(--brand-primary)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--border-radius-md)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'var(--font-family)',
          transition: 'opacity 0.15s ease',
        }}
        onMouseEnter={(e) => (e.target.style.opacity = '0.85')}
        onMouseLeave={(e) => (e.target.style.opacity = '1')}
      >
        Back to Chat
      </button>
    </div>
  );
};

export default NotFound;
