import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bookmark,
  Clock,
  Handshake,
  MessageSquare,
  Users,
} from 'lucide-react';
import { Creator } from '../data/creators';
import { resolveCreatorAvatar } from '../data/creatorMedia';
import { calculateCreatorMatch } from '../utils/matching';
import { formatShortDate } from '../utils/storage';
import { useApp } from '../context/AppContext';
import { WorkspaceShell } from '../components/Sidebar';
import { CreatorCard } from '../components/CreatorCard';
import { ConnectModal } from '../components/ConnectModal';
import { SafeImage } from '../components/SafeImage';

export const Dashboard: React.FC = () => {
  const {
    creators,
    savedIds,
    connections,
    conversations,
    activities,
    preferences,
  } = useApp();
  const [connectTarget, setConnectTarget] = useState<Creator | null>(null);

  const activeConnectionsCount = connections.filter((c) => c.status === 'connected').length;
  const pendingRequestsCount = connections.filter((c) => c.status === 'pending').length;

  const recommended = useMemo(() => {
    return creators
      .map((creator) => ({
        creator,
        match: calculateCreatorMatch(creator, preferences),
      }))
      .sort((a, b) => b.match.score - a.match.score)
      .slice(0, 3);
  }, [creators, preferences]);

  const categoryStats = useMemo(() => {
    const counts = new Map<string, number>();
    creators.forEach((c) => {
      counts.set(c.category, (counts.get(c.category) ?? 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({
        name,
        count,
        pct: Math.round((count / creators.length) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [creators]);

  const recentThreads = useMemo(() => {
    return Object.entries(conversations)
      .map(([creatorId, msgs]) => {
        const creator = creators.find((c) => c.id === creatorId);
        const lastMsg = msgs[msgs.length - 1];
        if (!creator || !lastMsg) return null;
        return { creator, lastMsg };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .slice(0, 4);
  }, [conversations, creators]);

  return (
    <WorkspaceShell
      title="Workspace Dashboard"
      primaryAction={
        <Link to="/discover" className="btn btn-primary btn-sm">
          Discover Creators
        </Link>
      }
    >
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Collaboration Overview</h1>
          <p className="page-subtitle">
            Track discovered creators, shortlisted partners, active outreach, and inbox replies.
          </p>
        </div>
      </div>

      {/* KPI Row */}
      <section className="kpi-grid" aria-label="Workspace key metrics">
        <article className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Creators Discovered</span>
            <span className="kpi-icon" aria-hidden="true">
              <Users size={17} />
            </span>
          </div>
          <div className="kpi-value tabular-nums">{creators.length}</div>
          <div className="kpi-note">Across 10 vetted niches</div>
        </article>

        <article className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Saved Creators</span>
            <span className="kpi-icon" aria-hidden="true">
              <Bookmark size={17} />
            </span>
          </div>
          <div className="kpi-value tabular-nums">{savedIds.length}</div>
          <div className="kpi-note">In active shortlist</div>
        </article>

        <article className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Active Connections</span>
            <span className="kpi-icon" aria-hidden="true">
              <Handshake size={17} />
            </span>
          </div>
          <div className="kpi-value tabular-nums">{activeConnectionsCount}</div>
          <div className="kpi-note">Confirmed campaign partners</div>
        </article>

        <article className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Pending Requests</span>
            <span className="kpi-icon" aria-hidden="true">
              <Clock size={17} />
            </span>
          </div>
          <div className="kpi-value tabular-nums">{pendingRequestsCount}</div>
          <div className="kpi-note">Awaiting creator confirmation</div>
        </article>
      </section>

      {/* Analytics + Activity Split */}
      <div className="dashboard-split">
        <section className="dashboard-card">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">Creator Pool &amp; Engagement Benchmarks</h2>
            <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
              Live Marketplace Distribution
            </span>
          </div>

          <div className="chart-bars">
            {categoryStats.map((cat, index) => (
              <div key={cat.name} className="chart-row">
                <span style={{ fontWeight: 500 }}>{cat.name}</span>
                <div className="chart-track">
                  <div
                    className={`chart-fill ${index % 3 === 1 ? 'pink' : index % 3 === 2 ? 'green' : ''}`}
                    style={{ width: `${Math.max(cat.pct * 3, 18)}%` }}
                  />
                </div>
                <span className="tabular-nums" style={{ textAlign: 'right', fontWeight: 600 }}>
                  {cat.count} {cat.count === 1 ? 'creator' : 'creators'}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 22,
              paddingTop: 16,
              borderTop: '1px solid var(--color-border)',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 12,
            }}
          >
            <div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                Top Engagement
              </div>
              <div className="tabular-nums" style={{ fontSize: 18, fontWeight: 700 }}>
                7.4%
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                Avg Match Fit
              </div>
              <div className="tabular-nums" style={{ fontSize: 18, fontWeight: 700 }}>
                {Math.round(
                  recommended.reduce((sum, r) => sum + r.match.score, 0) /
                    Math.max(recommended.length, 1)
                )}
                %
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                Active Threads
              </div>
              <div className="tabular-nums" style={{ fontSize: 18, fontWeight: 700 }}>
                {Object.keys(conversations).length}
              </div>
            </div>
          </div>
        </section>

        <section className="dashboard-card">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">Recent Messages</h2>
            <Link to="/messages" className="text-link" style={{ fontSize: 13 }}>
              Open Inbox
            </Link>
          </div>

          <div className="activity-list">
            {recentThreads.map(({ creator, lastMsg }) => (
              <Link
                key={creator.id}
                to={`/messages?creator=${creator.id}`}
                className="activity-item"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  <SafeImage
                    src={resolveCreatorAvatar(creator.id, creator.avatar)}
                    alt={`${creator.name} avatar`}
                    className="conversation-avatar"
                    fallbackText={creator.name}
                  />
                  <div style={{ minWidth: 0 }}>
                    <div className="activity-title">{creator.name}</div>
                    <div
                      className="activity-detail"
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: 240,
                      }}
                    >
                      {lastMsg.text}
                    </div>
                  </div>
                </div>
                <MessageSquare size={15} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Recent Activities */}
      <section className="dashboard-card" style={{ marginBottom: 24 }}>
        <div className="dashboard-card-header">
          <h2 className="dashboard-card-title">Recent Activity</h2>
          <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
            Synced to LocalStorage
          </span>
        </div>

        <div className="activity-list">
          {activities.slice(0, 5).map((item) => (
            <div key={item.id} className="activity-item">
              <div>
                <div className="activity-title">{item.title}</div>
                <div className="activity-detail">{item.detail}</div>
              </div>
              <span className="activity-time tabular-nums">
                {formatShortDate(item.timestamp)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Creators */}
      <section>
        <div className="dashboard-card-header" style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 19, fontWeight: 700 }}>Recommended for Your Brand</h2>
          <Link to="/discover" className="text-link" style={{ fontSize: 13 }}>
            View All Creators
          </Link>
        </div>

        <div className="creators-grid">
          {recommended.map(({ creator, match }) => (
            <CreatorCard
              key={creator.id}
              creator={creator}
              match={match}
              onConnect={setConnectTarget}
            />
          ))}
        </div>
      </section>

      <ConnectModal creator={connectTarget} onClose={() => setConnectTarget(null)} />
    </WorkspaceShell>
  );
};
