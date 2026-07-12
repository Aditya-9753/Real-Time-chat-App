/**
 * @file OnlineBadge.jsx  (inline as part of UserCard)
 * Exported separately for reuse.
 */

/**
 * Small colored dot indicating online/offline presence.
 * @param {boolean} online
 */
const OnlineBadge = ({ online }) => (
  <span
    className={`online-badge ${online ? '' : 'offline'}`}
    aria-label={online ? 'Online' : 'Offline'}
    title={online ? 'Online' : 'Offline'}
  />
);

export default OnlineBadge;
