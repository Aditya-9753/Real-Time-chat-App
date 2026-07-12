/**
 * @file MainLayout.jsx
 * @description Two-column layout: sidebar on the left, chat window on the right.
 */

import Sidebar from '../components/sidebar/Sidebar';
import ChatContainer from '../components/chat/ChatContainer';

const MainLayout = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--surface-bg)',
      }}
      id="main-layout"
    >
      {/* Left: Sidebar */}
      <Sidebar />

      {/* Right: Chat window */}
      <ChatContainer />
    </div>
  );
};

export default MainLayout;
