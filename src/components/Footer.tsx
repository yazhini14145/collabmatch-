import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="brand-wordmark" style={{ marginBottom: 12 }}>
              <span className="brand-mark" aria-hidden="true">
                <Sparkles size={16} />
              </span>
              <span>CollabMatch</span>
            </Link>
            <p
              style={{
                fontSize: 14,
                color: 'var(--color-text-secondary)',
                maxWidth: '30ch',
                marginTop: 12,
              }}
            >
              Find your perfect collaboration. Connecting forward-thinking brands with vetted
              content creators.
            </p>
          </div>

          <div>
            <div className="footer-heading">Platform</div>
            <ul className="footer-list">
              <li>
                <Link to="/discover" className="footer-link">
                  Discover Creators
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="footer-link">
                  Brand Dashboard
                </Link>
              </li>
              <li>
                <Link to="/saved" className="footer-link">
                  Saved Shortlist
                </Link>
              </li>
              <li>
                <Link to="/messages" className="footer-link">
                  Collaboration Messages
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="footer-heading">Solutions</div>
            <ul className="footer-list">
              <li>
                <Link to="/discover?category=Technology" className="footer-link">
                  Tech & SaaS Launches
                </Link>
              </li>
              <li>
                <Link to="/discover?category=Fashion" className="footer-link">
                  Fashion & Beauty
                </Link>
              </li>
              <li>
                <Link to="/discover?category=Fitness" className="footer-link">
                  Health & Fitness
                </Link>
              </li>
              <li>
                <Link to="/discover?category=Finance" className="footer-link">
                  Fintech & Education
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="footer-heading">Account</div>
            <ul className="footer-list">
              <li>
                <Link to="/login" className="footer-link">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="footer-link">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/signup?role=Creator" className="footer-link">
                  Join as Creator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 CollabMatch Inc. All rights reserved.</span>
          <span>Find your perfect collaboration.</span>
        </div>
      </div>
    </footer>
  );
};
