/**
 * @file UserList.jsx
 * @description Filtered, scrollable list of all available users.
 */

import UserCard from './UserCard';
import EmptyState from '../common/EmptyState';
import { LoadingDots } from '../common/Loader';

const UserList = ({ users, selectedUser, onSelectUser, loading, searchQuery }) => {
  // Filter users by search query
  const filteredUsers = searchQuery
    ? users.filter((u) =>
        u.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;

  const onlineUsers = filteredUsers.filter((u) => u.online);
  const offlineUsers = filteredUsers.filter((u) => !u.online);

  if (loading) {
    return (
      <div className="user-list-loading">
        <LoadingDots />
      </div>
    );
  }

  if (filteredUsers.length === 0) {
    return (
      <EmptyState
        icon={
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        }
        title={searchQuery ? 'No users found' : 'No other users yet'}
        subtitle={searchQuery ? `No one matches "${searchQuery}"` : 'Ask your friends to join!'}
      />
    );
  }

  return (
    <div className="user-list" role="list" aria-label="User list">
      {/* Online Users */}
      {onlineUsers.length > 0 && (
        <>
          <div className="section-label">Online — {onlineUsers.length}</div>
          {onlineUsers.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              isActive={selectedUser?._id === user._id}
              onClick={onSelectUser}
            />
          ))}
        </>
      )}

      {/* Offline Users */}
      {offlineUsers.length > 0 && (
        <>
          <div className="section-label">Offline — {offlineUsers.length}</div>
          {offlineUsers.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              isActive={selectedUser?._id === user._id}
              onClick={onSelectUser}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default UserList;
