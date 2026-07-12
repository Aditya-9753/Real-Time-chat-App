/**
 * @file Loader.jsx
 * @description Full-screen and inline loading spinners.
 */

/**
 * Centered loading dots animation.
 */
export const LoadingDots = () => (
  <div className="loading-dots" aria-label="Loading...">
    <div className="loading-dot" />
    <div className="loading-dot" />
    <div className="loading-dot" />
  </div>
);

/**
 * Full-page loading overlay.
 */
const Loader = ({ message = 'Loading...' }) => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      background: 'var(--surface-bg)',
    }}
    role="status"
    aria-live="polite"
  >
    <LoadingDots />
    <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>{message}</p>
  </div>
);

export default Loader;
