/**
 * @file Login.jsx
 * @description Login page — allows users to enter a username to join the chat.
 * Redirects to /chat on successful login.
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If already logged in, skip login page
  useEffect(() => {
    if (user) {
      navigate('/chat', { replace: true });
    }
  }, [user, navigate]);

  const handleLoginSuccess = () => {
    navigate('/chat', { replace: true });
  };

  return (
    <div className="login-page" id="login-page">
      <div className="login-card" role="main">
        {/* Header */}
        <div className="login-header">
          {/* Logo */}
          <div className="login-logo" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="white" width="36" height="36">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
          </div>

          <h1 className="login-title">Welcome to ChatApp</h1>
          <p className="login-subtitle">
            Enter your username to start chatting instantly.
            <br />
            No password required.
          </p>
        </div>

        {/* Form */}
        <LoginForm onSuccess={handleLoginSuccess} />

        {/* Footer */}
        <p className="login-footer">
          By continuing, you agree to our terms of service.
        </p>
      </div>
    </div>
  );
};

export default Login;
