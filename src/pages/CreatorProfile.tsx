import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Bookmark,
  Check,
  ExternalLink,
  MapPin,
  MessageSquare,
  Send,
} from 'lucide-react';
import { Creator } from '../data/creators';
import { resolveCoverImage, resolveCreatorAvatar } from '../data/creatorMedia';
import { calculateCreatorMatch } from '../utils/matching';
import { formatCompactNumber } from '../utils/storage';
import { useApp } from '../context/AppContext';
import { WorkspaceShell } from '../components/Sidebar';
import { ConnectModal } from '../components/ConnectModal';
import { SafeImage } from '../components/SafeImage';

export const CreatorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { creators, preferences, savedIds, connections, toggleSave } = useApp();
  const [connectTarget, setConnectTarget] = useState<Creator | null>(null);

  const creator = creators.find((c) => c.id === id);

  const match = useMemo(() => {
    if (!creator) return null;
    return calculateCreatorMatch(creator, preferences);
  }, [creator, preferences]);

  if (!creator || !match) {
    return (
      <WorkspaceShell title="Creator Not Found">
        <div className="empty-state-card">
          <h1 style={{ fontSize: 22 }}>Creator profile not found</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            The requested creator profile could not be located in the directory.
          </p>
          <Link to="/discover" className="btn btn-primary">
            Return to Discover
          </Link>
        </div>
      </WorkspaceShell>
    );
  }

  const isSaved = savedIds.includes(creator.id);
  const connection = connections.find((c) => c.creatorId === creator.id);
  const avatarSrc = resolveCreatorAvatar(creator.id, creator.avatar);
  const coverSrc = resolveCoverImage(creator.coverImage);

  return (
    <WorkspaceShell
      title={`${creator.name} · Creator Profile`}
      primaryAction={
        <Link to={`/messages?creator=${creator.id}`} className="btn btn-secondary btn-sm">
          <MessageSquare size={14} />
          <span>Open Chat</span>
        </Link>
      }
    >
      <button
        type="button"
        className="back-link"
        style={{ background: 'none', border: 'none' }}
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </button>

      <section className="profile-hero-card">
        <div className="profile-cover">
          <SafeImage
            src={coverSrc}
            alt={`${creator.name} studio cover`}
            fallbackText={creator.name}
          />
          <div className="profile-cover-scrim" />
        </div>

        <div className="profile-header-body">
          <div className="profile-identity-wrap">
            <SafeImage
              src={avatarSrc}
              alt={`${creator.name} portrait`}
              className="profile-avatar-lg"
              fallbackText={creator.name}
            />
            <div className="profile-title-group">
              <h1 className="profile-name">{creator.name}</h1>
              <div className="profile-meta-strip">
                <span>{creator.username}</span>
                <span aria-hidden="true">·</span>
                <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>
                  {creator.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>{creator.platform}</span>
                <span aria-hidden="true">·</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <MapPin size={14} />
                  {creator.location}
                </span>
              </div>
            </div>
          </div>

          <div className="profile-header-actions">
            <button
              type="button"
              className={`btn ${isSaved ? 'btn-soft' : 'btn-secondary'}`}
              onClick={() => toggleSave(creator)}
            >
              <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
              <span>{isSaved ? 'Saved' : 'Save Creator'}</span>
            </button>

            {connection ? (
              <Link to={`/messages?creator=${creator.id}`} className="btn btn-success">
                <Check size={16} />
                <span>
                  {connection.status === 'connected' ? 'Connected · Message' : 'Request Sent'}
                </span>
              </Link>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setConnectTarget(creator)}
              >
                <Send size={16} />
                <span>Connect</span>
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="profile-layout">
        <div>
          <section className="profile-section-card">
            <h2 className="profile-section-title">About &amp; Collaboration Focus</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 18 }}>
              {creator.fullBio}
            </p>

            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>
              Collaboration Interests
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                gap: 10,
                marginBottom: 18,
              }}
            >
              {creator.collaborationInterests.map((interest) => (
                <div
                  key={interest}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 8,
                    backgroundColor: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {interest}
                </div>
              ))}
            </div>

            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
              <strong>Past Brand Partners:</strong> {creator.pastPartners.join(' · ')}
            </div>
          </section>

          <section className="profile-section-card">
            <h2 className="profile-section-title">Content Portfolio</h2>
            <div className="portfolio-grid">
              {creator.portfolio.map((item) => (
                <article key={item.id} className="portfolio-card">
                  <SafeImage
                    src={resolveCoverImage(item.image)}
                    alt={item.title}
                    className="portfolio-thumb"
                    fallbackText={item.brand}
                  />
                  <div className="portfolio-body">
                    <div className="portfolio-title">{item.title}</div>
                    <div className="portfolio-meta">
                      {item.brand} · {item.format}
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: 'var(--color-text-secondary)',
                        marginBottom: 10,
                      }}
                    >
                      {item.summary}
                    </p>
                    <div
                      className="tabular-nums"
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'var(--color-primary-hover)',
                      }}
                    >
                      {item.views} · {item.engagement} engagement
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="profile-section-card">
            <h2 className="profile-section-title">Audience Demographics</h2>
            <div className="demographics-list">
              {creator.demographics.ageBreakdown.map((age) => (
                <div key={age.label} className="demo-bar-row">
                  <div className="demo-bar-head">
                    <span>Age {age.label}</span>
                    <strong className="tabular-nums">{age.percentage}%</strong>
                  </div>
                  <div className="match-bar-track">
                    <div className="match-bar-fill" style={{ width: `${age.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
                marginTop: 20,
                paddingTop: 16,
                borderTop: '1px solid var(--color-border)',
                fontSize: 13,
              }}
            >
              <div>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Gender Split</div>
                <div style={{ color: 'var(--color-text-secondary)' }} className="tabular-nums">
                  {creator.demographics.genderSplit.female}% Female ·{' '}
                  {creator.demographics.genderSplit.male}% Male ·{' '}
                  {creator.demographics.genderSplit.other}% Other
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Top Regions</div>
                <div style={{ color: 'var(--color-text-secondary)' }} className="tabular-nums">
                  {creator.demographics.topRegions
                    .map((r) => `${r.country} (${r.percentage}%)`)
                    .join(' · ')}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sidebar Info */}
        <div>
          <section className="profile-section-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <h2 className="profile-section-title" style={{ marginBottom: 4 }}>
                Brand Match Analysis
              </h2>
              <span
                className="tabular-nums"
                style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-primary-hover)' }}
              >
                {match.score}%
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--color-success-text)', fontWeight: 600, marginBottom: 12 }}>
              {match.summary}
            </p>

            <div className="match-bar-track" style={{ height: 8 }}>
              <div
                className={`match-bar-fill ${match.tier}`}
                style={{ width: `${match.score}%` }}
              />
            </div>

            <div className="match-breakdown-list">
              {(
                [
                  ['Niche Compatibility', match.breakdown.niche],
                  ['Engagement Rate', match.breakdown.engagement],
                  ['Audience Compatibility', match.breakdown.audience],
                  ['Follower Range', match.breakdown.followers],
                  ['Platform Preference', match.breakdown.platform],
                ] as const
              ).map(([title, item]) => (
                <div key={title} className="match-breakdown-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ fontWeight: 600 }}>{title}</span>
                    <span className="tabular-nums" style={{ fontWeight: 700 }}>
                      {item.score} / {item.max}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                    {item.note}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="profile-section-card">
            <h2 className="profile-section-title">Key Metrics &amp; Budget</h2>
            <div className="creator-metrics-grid" style={{ borderTop: 'none', paddingTop: 0 }}>
              <div>
                <div className="creator-metric-label">Followers</div>
                <div className="creator-metric-value tabular-nums">
                  {formatCompactNumber(creator.followers)}
                </div>
              </div>
              <div>
                <div className="creator-metric-label">Engagement</div>
                <div className="creator-metric-value tabular-nums">
                  {creator.engagementRate.toFixed(1)}%
                </div>
              </div>
              <div>
                <div className="creator-metric-label">Avg Likes</div>
                <div className="creator-metric-value tabular-nums">
                  {formatCompactNumber(creator.avgLikes)}
                </div>
              </div>
            </div>

            <div style={{ paddingTop: 14 }}>
              <div className="creator-metric-label">Estimated Collaboration Budget</div>
              <div
                className="tabular-nums"
                style={{ fontSize: 20, fontWeight: 700, marginTop: 2 }}
              >
                {creator.budgetRange}
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4 }}>
                Typical response: {creator.responseTime}
              </div>
            </div>

            <div
              style={{
                marginTop: 18,
                paddingTop: 16,
                borderTop: '1px solid var(--color-border)',
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
                Social Channels
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {creator.socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: 8,
                      backgroundColor: 'var(--color-bg)',
                      border: '1px solid var(--color-border)',
                      fontSize: 13,
                    }}
                  >
                    <span>
                      <strong>{link.platform}</strong> · {link.handle}
                    </span>
                    <ExternalLink size={14} />
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <ConnectModal creator={connectTarget} onClose={() => setConnectTarget(null)} />
    </WorkspaceShell>
  );
};
