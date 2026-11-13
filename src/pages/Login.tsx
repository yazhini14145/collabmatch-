import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { validateEmail, validateLogin } from '../utils/storage';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/Navbar';

export const Login: React.FC = () => {
  const { login, showToast } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [forgotMode, setForgotMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetNotice, setResetNotice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateLogin(email, password);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    const res = login(email, password, rememberMe);
    if (!res.ok) {
      setErrors({ form: res.error });
      return;
    }

    navigate('/dashboard');
  };

  const handleDemoFill = () => {
    setEmail('claire@northstarlabs.io');
    setPassword('Password123');
    setErrors({});
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(resetEmail)) {
      setResetNotice('Please enter a valid email address.');
      return;
    }
    setResetNotice('');
    setForgotMode(false);
    showToast(
      'Reset instructions sent (prototype)',
      `Demo account credentials remain claire@northstarlabs.io / Password123.`,
      'info'
    );
  };

  return (
    <div>
      <Navbar />
      <main className="auth-page">
        <div className="auth-card animate-fade-up">
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">
            Sign in to your CollabMatch workspace. Prototype authentication stored locally.
          </p>

          {errors.form && <div className="auth-alert error">{errors.form}</div>}

          {!forgotMode ? (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="login-email" className="form-label">
                  Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  className={`form-input ${errors.email ? 'has-error' : ''}`}
                  placeholder="claire@northstarlabs.io"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: undefined, form: undefined }));
                  }}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="login-password" className="form-label">
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    className={`form-input ${errors.password ? 'has-error' : ''}`}
                    placeholder="Enter your password"
                    style={{ paddingRight: 44 }}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, password: undefined, form: undefined }));
                    }}
                  />
                  <button
                    type="button"
                    className="btn-ghost"
                    style={{
                      position: 'absolute',
                      right: 6,
                      top: 4,
                      width: 34,
                      height: 34,
                      border: 'none',
                      borderRadius: 6,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <span className="form-error">{errors.password}</span>}
              </div>

              <div className="auth-row-between">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  className="text-link"
                  onClick={() => {
                    setForgotMode(true);
                    setResetEmail(email);
                  }}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
              >
                Login
              </button>

              <div className="auth-divider" />

              <button
                type="button"
                className="btn btn-secondary"
                style={{ width: '100%' }}
                onClick={handleDemoFill}
              >
                Fill Demo Brand Credentials
              </button>
            </form>
          ) : (
            <form onSubmit={handleForgotSubmit} noValidate>
              <div className="auth-alert info">
                Enter your email to simulate a password reset link in this prototype.
              </div>
              {resetNotice && <div className="auth-alert error">{resetNotice}</div>}

              <div className="form-group">
                <label htmlFor="reset-email" className="form-label">
                  Account Email
                </label>
                <input
                  id="reset-email"
                  type="email"
                  className="form-input"
                  placeholder="you@company.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                  onClick={() => setForgotMode(false)}
                >
                  Back to Login
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Send Reset Link
                </button>
              </div>
            </form>
          )}

          <div className="auth-footer-text">
            New to CollabMatch?{' '}
            <Link to="/signup" className="text-link">
              Create an account
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
