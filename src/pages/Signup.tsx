import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { validateSignup } from '../utils/storage';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/Navbar';

export const Signup: React.FC = () => {
  const { signup } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialRole =
    searchParams.get('role') === 'Creator' ? 'Creator' : 'Brand';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState<'Brand' | 'Creator'>(initialRole);
  const [companyOrHandle, setCompanyOrHandle] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    form?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateSignup({ fullName, email, password, accountType });
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    const res = signup({
      fullName,
      email,
      password,
      accountType,
      companyOrHandle,
    });

    if (!res.ok) {
      setErrors({ form: res.error });
      return;
    }

    navigate('/dashboard');
  };

  return (
    <div>
      <Navbar />
      <main className="auth-page">
        <div className="auth-card animate-fade-up">
          <h1 className="auth-title">Create your CollabMatch account</h1>
          <p className="auth-subtitle">
            Choose Brand or Creator mode to personalize your workspace. Saved locally as a
            frontend prototype.
          </p>

          {errors.form && <div className="auth-alert error">{errors.form}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <span className="form-label">Account Type</span>
              <div className="role-toggle" role="group" aria-label="Select account type">
                <button
                  type="button"
                  className={`role-toggle-btn ${accountType === 'Brand' ? 'active' : ''}`}
                  onClick={() => setAccountType('Brand')}
                >
                  Brand / Team
                </button>
                <button
                  type="button"
                  className={`role-toggle-btn ${accountType === 'Creator' ? 'active' : ''}`}
                  onClick={() => setAccountType('Creator')}
                >
                  Creator
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="signup-name" className="form-label">
                Full Name
              </label>
              <input
                id="signup-name"
                type="text"
                className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                placeholder="Alex Rivera"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setErrors((prev) => ({ ...prev, fullName: undefined, form: undefined }));
                }}
              />
              {errors.fullName && <span className="form-error">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="signup-org" className="form-label">
                {accountType === 'Brand' ? 'Brand / Company Name' : 'Primary Creator Handle'}
              </label>
              <input
                id="signup-org"
                type="text"
                className="form-input"
                placeholder={accountType === 'Brand' ? 'Acme Studio' : '@alexcreates'}
                value={companyOrHandle}
                onChange={(e) => setCompanyOrHandle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-email" className="form-label">
                Email Address
              </label>
              <input
                id="signup-email"
                type="email"
                className={`form-input ${errors.email ? 'has-error' : ''}`}
                placeholder="alex@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: undefined, form: undefined }));
                }}
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="signup-password" className="form-label">
                Password (8+ characters)
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  className={`form-input ${errors.password ? 'has-error' : ''}`}
                  placeholder="Create a strong password"
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

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: 6 }}
            >
              Create Account
            </button>
          </form>

          <div className="auth-footer-text">
            Already have an account?{' '}
            <Link to="/login" className="text-link">
              Sign in
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
