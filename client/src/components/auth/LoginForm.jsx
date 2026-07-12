/**
 * @file LoginForm.jsx
 * @description Login form component with username validation.
 * Handles form state, validation, submission, and error display.
 */

import { useState } from 'react';
import { validateUsername } from '../../utils/validators';
import useAuth from '../../hooks/useAuth';

const LoginForm = ({ onSuccess }) => {
  const { login, loading } = useAuth();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUsername(e.target.value);
    // Clear error on typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const { valid, message } = validateUsername(username);
    if (!valid) {
      setError(message);
      return;
    }

    const result = await login(username);
    if (result.success) {
      onSuccess?.();
    } else {
      setError(result.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="login-form"
      id="login-form"
      noValidate
      aria-label="Login form"
    >
      <div className="form-group">
        <label htmlFor="username-input" className="form-label">
          Username
        </label>
        <input
          id="username-input"
          type="text"
          value={username}
          onChange={handleChange}
          placeholder="e.g. john_doe"
          disabled={loading}
          autoFocus
          autoComplete="username"
          className={`form-input ${error ? 'error' : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? 'username-error' : undefined}
          maxLength={30}
        />
        {error && (
          <p id="username-error" className="form-error" role="alert">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="btn-login"
        disabled={loading || !username.trim()}
        id="login-submit-btn"
        aria-label={loading ? 'Logging in...' : 'Continue to chat'}
      >
        {loading && <span className="spinner" aria-hidden="true" />}
        {loading ? 'Joining...' : 'Continue to Chat'}
      </button>
    </form>
  );
};

export default LoginForm;
