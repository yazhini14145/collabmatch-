import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Sparkles, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentUser } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="site-navbar">
      <div className="container site-navbar-inner">
        <Link to="/" className="brand-wordmark" onClick={() => setMobileOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            <Sparkles size={16} />
          </span>
          <span>CollabMatch</span>
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/discover"
            className={`nav-link ${location.pathname === '/discover' ? 'active' : ''}`}
          >
            Discover Creators
          </Link>
          <button
            type="button"
            className="nav-link"
            style={{ background: 'none', border: 'none' }}
            onClick={() => scrollToSection('how-it-works')}
          >
            How It Works
          </button>
          <button
            type="button"
            className="nav-link"
            style={{ background: 'none', border: 'none' }}
            onClick={() => scrollToSection('for-brands')}
          >
            For Brands
          </button>
          <button
            type="button"
            className="nav-link"
            style={{ background: 'none', border: 'none' }}
            onClick={() => scrollToSection('for-creators')}
          >
            For Creators
          </button>
        </nav>

        <div className="nav-actions nav-actions-desktop">
          {currentUser ? (
            <Link to="/dashboard" className="btn btn-primary">
              Open Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="mobile-menu-btn"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-links">
          <Link
            to="/"
            className="mobile-drawer-link"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/discover"
            className="mobile-drawer-link"
            onClick={() => setMobileOpen(false)}
          >
            Discover Creators
          </Link>
          <button
            type="button"
            className="mobile-drawer-link"
            style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
            onClick={() => scrollToSection('how-it-works')}
          >
            How It Works
          </button>
          <button
            type="button"
            className="mobile-drawer-link"
            style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
            onClick={() => scrollToSection('for-brands')}
          >
            For Brands
          </button>
          <button
            type="button"
            className="mobile-drawer-link"
            style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
            onClick={() => scrollToSection('for-creators')}
          >
            For Creators
          </button>
          <Link
            to="/dashboard"
            className="mobile-drawer-link"
            onClick={() => setMobileOpen(false)}
          >
            Dashboard
          </Link>
        </div>

        <div className="mobile-drawer-actions">
          {currentUser ? (
            <Link
              to="/dashboard"
              className="btn btn-primary"
              style={{ flex: 1 }}
              onClick={() => setMobileOpen(false)}
            >
              Open Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-secondary"
                style={{ flex: 1 }}
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
