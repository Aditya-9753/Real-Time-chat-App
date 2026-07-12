/**
 * @file EmptyState.jsx
 * @description Generic empty state placeholder component.
 */

const EmptyState = ({ icon, title, subtitle }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      gap: '12px',
      textAlign: 'center',
    }}
  >
    {icon && (
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: 'var(--surface-panel)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)',
          border: '1px solid var(--border-color)',
          marginBottom: 8,
        }}
      >
        {icon}
      </div>
    )}
    {title && (
      <p style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: 'var(--font-size-md)' }}>
        {title}
      </p>
    )}
    {subtitle && (
      <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', lineHeight: 1.6 }}>
        {subtitle}
      </p>
    )}
  </div>
);

export default EmptyState;
