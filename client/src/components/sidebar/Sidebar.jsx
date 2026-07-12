/**
 * @file Sidebar.jsx
 * @description Left sidebar containing the user list, search, and current user info.
 */

import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useChat from '../../hooks/useChat';
import useSocket from '../../hooks/useSocket';
import UserList from './UserList';
import SearchUser from './SearchUser';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { users, selectedUser, selectUser, loadingUsers } = useChat();
  const { isConnected } = useSocket();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    // Disconnect handled by SocketContext cleanup
    logout();
  };

  // Get avatar initial
  const initial = user?.username?.charAt(0).toUpperCase() || '?';

  return (
    <aside className="sidebar" aria-label="Contacts sidebar">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="sidebar-header">
        <div className="sidebar-header-left">
          {/* App Logo */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-accent))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-hidden="true"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
          </div>
          <div>
            <div className="sidebar-brand">ChatApp</div>
            <div className="sidebar-brand-sub">
              <span
                className={`connection-dot ${isConnected ? '' : 'offline'}`}
                style={{ display: 'inline-block', marginRight: 4 }}
              />
              {isConnected ? 'Connected' : 'Connecting...'}
            </div>
          </div>
        </div>
      </header>

      {/* ── Search ─────────────────────────────────────────── */}
      <SearchUser
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* ── User List ───────────────────────────────────────── */}
      <UserList
        users={users}
        selectedUser={selectedUser}
        onSelectUser={selectUser}
        loading={loadingUsers}
        searchQuery={searchQuery}
      />

      {/* ── Footer: Current User Info ────────────────────────── */}
      <footer className="sidebar-footer">
        <div className="sidebar-user-info">
          <div className="avatar avatar-sm" aria-hidden="true">{initial}</div>
          <span className="sidebar-username" title={user?.username}>{user?.username}</span>
        </div>
        <button
          className="logout-btn"
          onClick={handleLogout}
          id="logout-btn"
          aria-label="Logout"
          title="Logout"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </footer>
    </aside>
  );
};

export default Sidebar;
