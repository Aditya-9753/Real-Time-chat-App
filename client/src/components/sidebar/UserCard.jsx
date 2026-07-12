/**
 * @file UserCard.jsx
 * @description A single user entry in the sidebar user list.
 * Shows avatar, username, online status, and selection highlight.
 */

import OnlineBadge from './OnlineBadge';

/**
 * Gets initials for the avatar from a username.
 * @param {string} name
 * @returns {string}
 */
const getInitials = (name = '') => {
  return name.trim().charAt(0).toUpperCase() || '?';
};

const UserCard = ({ user, isActive, onClick }) => {
  return (
    <div
      className={`user-card ${isActive ? 'active' : ''}`}
      onClick={() => onClick(user)}
      role="button"
      tabIndex={0}
      aria-label={`Chat with ${user.username}, ${user.online ? 'online' : 'offline'}`}
      aria-selected={isActive}
      onKeyDown={(e) => e.key === 'Enter' && onClick(user)}
      id={`user-card-${user._id}`}
    >
      {/* Avatar with online badge */}
      <div className="user-card-avatar">
        <div className="avatar">
          {getInitials(user.username)}
        </div>
        <OnlineBadge online={user.online} />
      </div>

      {/* User info */}
      <div className="user-card-info">
        <span className="user-card-name">{user.username}</span>
        <span className={`user-card-status ${user.online ? 'online-text' : ''}`}>
          {user.online ? (
            <>
              <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
                <circle cx="4" cy="4" r="4" fill="currentColor" />
              </svg>
              Online
            </>
          ) : (
            'Offline'
          )}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
