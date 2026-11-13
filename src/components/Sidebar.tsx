import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Bookmark,
  Compass,
  Home,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  MessageSquare,
  Sparkles,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface WorkspaceShellProps {
  title: string;
  primaryAction?: React.ReactNode;
  children: React.ReactNode;
}

export const WorkspaceShell: React.FC<WorkspaceShellProps> = ({
  title,
  primaryAction,
  children,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { savedIds, conversations, currentUser, logout } = useApp();
  const navigate = useNavigate();

  const activeThreads = Object.keys(conversations).length;
  const displayName = currentUser ? currentUser.fullName : 'Guest Workspace';
  const displayRole = currentUser ? `${currentUser.accountType} Account` : 'Prototype Mode';
  const initials = displayName
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="workspace-shell">
      <div
        className={`sidebar-backdrop ${drawerOpen ? 'open' : ''}`}
        onClick={() => setDrawerOpen(false)}
      />

      <aside className={`workspace-sidebar ${drawerOpen ? 'open' : ''}`} aria-label="Workspace sidebar">
        <div>
          <div className="sidebar-brand-row">
            <Link to="/" className="brand-wordmark" onClick={() => setDrawerOpen(false)}>
              <span className="brand-mark" aria-hidden="true">
                <Sparkles size={16} />
              </span>
              <span>CollabMatch</span>
            </Link>

            <button
              type="button"
              className="sidebar-mobile-toggle"
              aria-label="Close sidebar"
              onClick={() => setDrawerOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          <nav className="sidebar-nav">
            <NavLink
              to="/discover"
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={() => setDrawerOpen(false)}
            >
              <span className="sidebar-link-main">
                <Compass size={17} />
                <span>Discover Creators</span>
              </span>
            </NavLink>

            <NavLink
              to="/dashboard"
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={() => setDrawerOpen(false)}
            >
              <span className="sidebar-link-main">
                <LayoutDashboard size={17} />
                <span>Dashboard</span>
              </span>
            </NavLink>

            <NavLink
              to="/saved"
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={() => setDrawerOpen(false)}
            >
              <span className="sidebar-link-main">
                <Bookmark size={17} />
                <span>Saved Creators</span>
              </span>
              <span className="sidebar-count">{savedIds.length}</span>
            </NavLink>

            <NavLink
              to="/messages"
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={() => setDrawerOpen(false)}
            >
              <span className="sidebar-link-main">
                <MessageSquare size={17} />
                <span>Messages</span>
              </span>
              <span className="sidebar-count">{activeThreads}</span>
            </NavLink>

            <Link
              to="/"
              className="sidebar-link"
              onClick={() => setDrawerOpen(false)}
            >
              <span className="sidebar-link-main">
                <Home size={17} />
                <span>Landing Home</span>
              </span>
            </Link>
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-user-card">
            <div className="sidebar-user-avatar" aria-hidden="true">
              {initials}
            </div>
            <div className="sidebar-user-meta">
              <div className="sidebar-user-name">{displayName}</div>
              <div className="sidebar-user-role">{displayRole}</div>
            </div>
          </div>

          {currentUser ? (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ width: '100%' }}
              onClick={() => {
                logout();
                setDrawerOpen(false);
              }}
            >
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-soft btn-sm"
              style={{ width: '100%' }}
              onClick={() => {
                setDrawerOpen(false);
                navigate('/login');
              }}
            >
              <LogIn size={15} />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </aside>

      <div className="workspace-main">
        <header className="workspace-topbar">
          <div className="workspace-topbar-left">
            <button
              type="button"
              className="sidebar-mobile-toggle"
              aria-label="Open workspace navigation"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu size={18} />
            </button>
            <div className="workspace-breadcrumb">{title}</div>
          </div>

          <div className="workspace-topbar-actions">
            {primaryAction ?? (
              <Link to="/discover" className="btn btn-primary btn-sm">
                Find Creators
              </Link>
            )}
          </div>
        </header>

        <main className="workspace-content">{children}</main>
      </div>
    </div>
  );
};
