import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Compass,
  Handshake,
  SlidersHorizontal,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Creator } from '../data/creators';
import { resolveCreatorAvatar } from '../data/creatorMedia';
import { calculateCreatorMatch } from '../utils/matching';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CreatorCard } from '../components/CreatorCard';
import { ConnectModal } from '../components/ConnectModal';
import { SafeImage } from '../components/SafeImage';

export const Home: React.FC = () => {
  const { creators, preferences } = useApp();
  const [connectTarget, setConnectTarget] = useState<Creator | null>(null);

  const featuredCreators = useMemo(() => {
    return creators
      .map((creator) => ({
        creator,
        match: calculateCreatorMatch(creator, preferences),
      }))
      .sort((a, b) => b.match.score - a.match.score)
      .slice(0, 3);
  }, [creators, preferences]);

  const heroCreator = creators[0];
  const heroAvatar = resolveCreatorAvatar(heroCreator.id, heroCreator.avatar);

  return (
    <div>
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="animate-fade-up">
              <div className="hero-kicker">Creator &amp; Brand Collaboration Platform</div>
              <h1 className="hero-title">
                Your Next Perfect Collaboration Starts Here.
              </h1>
              <p className="hero-subtitle">
                Discover creators who match your brand, connect with the right audience, and
                build partnerships that make an impact.
              </p>

              <div className="hero-cta-row">
                <Link to="/discover" className="btn btn-primary btn-lg">
                  <span>Discover Creators</span>
                  <ArrowRight size={17} />
                </Link>
                <Link to="/signup?role=Creator" className="btn btn-secondary btn-lg">
                  Join as Creator
                </Link>
              </div>

              <div className="hero-proof-strip">
                <div>
                  <div className="hero-proof-value tabular-nums">12+</div>
                  <div className="hero-proof-label">Vetted Creator Niches</div>
                </div>
                <div>
                  <div className="hero-proof-value tabular-nums">5.9%</div>
                  <div className="hero-proof-label">Avg. Creator Engagement</div>
                </div>
                <div>
                  <div className="hero-proof-value tabular-nums">&lt; 12h</div>
                  <div className="hero-proof-label">Median Partner Reply</div>
                </div>
              </div>
            </div>

            {/* Custom Interactive-Style Hero Composition */}
            <div className="hero-visual">
              <div className="hero-float-row top">
                <div className="hero-float-card">
                  <span className="hero-float-icon purple" aria-hidden="true">
                    <Users size={17} />
                  </span>
                  <div>
                    <div className="hero-float-value tabular-nums">120K Followers</div>
                    <div className="hero-float-label">Verified Audience</div>
                  </div>
                </div>

                <div className="hero-float-card delay-1">
                  <span className="hero-float-icon green" aria-hidden="true">
                    <CheckCircle2 size={17} />
                  </span>
                  <div>
                    <div className="hero-float-value tabular-nums">95% Match</div>
                    <div className="hero-float-label">Brand Alignment</div>
                  </div>
                </div>
              </div>

              <div className="hero-stage">
                <div className="hero-stage-header">
                  <div>
                    <div className="hero-stage-title">Smart Collaboration Match</div>
                    <div className="hero-stage-meta">
                      Technology · YouTube · 25–34 Audience
                    </div>
                  </div>
                  <Link to="/creator/maya-lin" className="btn btn-soft btn-sm">
                    View Profile
                  </Link>
                </div>

                <div className="hero-creator-preview">
                  <SafeImage
                    src={heroAvatar}
                    alt={`${heroCreator.name} portrait`}
                    className="hero-creator-photo"
                    fallbackText={heroCreator.name}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{heroCreator.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
                      {heroCreator.username} · {heroCreator.location}
                    </div>
                  </div>
                </div>

                <div className="hero-match-meter">
                  <div className="hero-match-meter-head">
                    <span style={{ fontWeight: 600 }}>Brand Compatibility Score</span>
                    <span
                      className="tabular-nums"
                      style={{ fontWeight: 700, color: 'var(--color-success-text)' }}
                    >
                      95% Match · Excellent Fit
                    </span>
                  </div>
                  <div className="match-bar-track">
                    <div className="match-bar-fill excellent" style={{ width: '95%' }} />
                  </div>
                </div>

                <div className="hero-connection-rows">
                  <div className="hero-connection-item">
                    <span>Niche &amp; Audience Fit</span>
                    <strong className="tabular-nums">35 / 35 pts</strong>
                  </div>
                  <div className="hero-connection-item">
                    <span>Verified Engagement Benchmark</span>
                    <strong className="tabular-nums">24 / 25 pts</strong>
                  </div>
                </div>
              </div>

              <div className="hero-float-row bottom">
                <div className="hero-float-card delay-2">
                  <span className="hero-float-icon purple" aria-hidden="true">
                    <TrendingUp size={17} />
                  </span>
                  <div>
                    <div className="hero-float-value tabular-nums">4.8% Engagement</div>
                    <div className="hero-float-label">Above Category Avg</div>
                  </div>
                </div>

                <div className="hero-float-card delay-3">
                  <span className="hero-float-icon pink" aria-hidden="true">
                    <Bell size={17} />
                  </span>
                  <div>
                    <div className="hero-float-value">New Collaboration Request</div>
                    <div className="hero-float-label">Q4 Launch Brief Sent</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="landing-section alt-surface">
          <div className="container">
            <div className="section-header">
              <div className="section-kicker">How It Works</div>
              <h2 className="section-title">
                From discovery to signed partnership in three focused steps
              </h2>
              <p className="section-desc">
                Replace guesswork and cold spreadsheets with transparent audience metrics and
                direct creator workflows.
              </p>
            </div>

            <div className="steps-grid">
              <article className="step-card">
                <div className="step-header-row">
                  <span className="step-number">01</span>
                  <span className="step-icon-box" aria-hidden="true">
                    <Compass size={20} />
                  </span>
                </div>
                <h3 className="step-title">Discover</h3>
                <p className="step-text">
                  Explore creators filtered by niche, social platform, engagement rate, audience
                  demographics, and campaign location.
                </p>
              </article>

              <article className="step-card">
                <div className="step-header-row">
                  <span className="step-number">02</span>
                  <span className="step-icon-box" aria-hidden="true">
                    <SlidersHorizontal size={20} />
                  </span>
                </div>
                <h3 className="step-title">Match</h3>
                <p className="step-text">
                  Review deterministic compatibility scores weighing niche alignment, engagement
                  quality, follower bracket, and platform fit.
                </p>
              </article>

              <article className="step-card">
                <div className="step-header-row">
                  <span className="step-number">03</span>
                  <span className="step-icon-box" aria-hidden="true">
                    <Handshake size={20} />
                  </span>
                </div>
                <h3 className="step-title">Collaborate</h3>
                <p className="step-text">
                  Save top candidates to your shortlist, send structured campaign briefs, and
                  coordinate deliverables in one workspace.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* FOR BRANDS & FOR CREATORS */}
        <section className="landing-section">
          <div className="container">
            <div className="split-showcase">
              <article id="for-brands" className="audience-panel">
                <div>
                  <div className="section-kicker">For Brands &amp; Teams</div>
                  <h2 className="section-title" style={{ fontSize: 26 }}>
                    Find creators whose audience already trusts your category
                  </h2>
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: 20 }}>
                    Evaluate engagement benchmarks, regional reach, and past brand case studies
                    before sending your first outreach note.
                  </p>

                  <ul className="audience-list">
                    <li>
                      <CheckCircle2 size={17} className="audience-list-icon" />
                      <span>Multi-factor match scoring across 10 creator categories</span>
                    </li>
                    <li>
                      <CheckCircle2 size={17} className="audience-list-icon" />
                      <span>Transparent estimated collaboration budgets on every profile</span>
                    </li>
                    <li>
                      <CheckCircle2 size={17} className="audience-list-icon" />
                      <span>Shortlist management and direct campaign messaging</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="audience-metric-row">
                    <div>
                      <div className="hero-proof-value tabular-nums">3.4x</div>
                      <div className="hero-proof-label">Faster creator shortlisting</div>
                    </div>
                    <div>
                      <div className="hero-proof-value tabular-nums">100%</div>
                      <div className="hero-proof-label">Transparent rate ranges</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <Link to="/discover" className="btn btn-primary">
                      Explore Creator Marketplace
                    </Link>
                  </div>
                </div>
              </article>

              <article id="for-creators" className="audience-panel accent">
                <div>
                  <div className="section-kicker">For Content Creators</div>
                  <h2 className="section-title" style={{ fontSize: 26 }}>
                    Showcase your portfolio and attract aligned brand budgets
                  </h2>
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: 20 }}>
                    Present your audience demographics, best-performing content, and preferred
                    collaboration formats in a clean media kit.
                  </p>

                  <ul className="audience-list">
                    <li>
                      <CheckCircle2 size={17} className="audience-list-icon" />
                      <span>Structured portfolio highlighting views and conversion wins</span>
                    </li>
                    <li>
                      <CheckCircle2 size={17} className="audience-list-icon" />
                      <span>Clear budget expectations to filter out mismatched offers</span>
                    </li>
                    <li>
                      <CheckCircle2 size={17} className="audience-list-icon" />
                      <span>Centralized collaboration requests and brand inbox</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="audience-metric-row">
                    <div>
                      <div className="hero-proof-value tabular-nums">4.5%+</div>
                      <div className="hero-proof-label">Benchmark engagement tier</div>
                    </div>
                    <div>
                      <div className="hero-proof-value tabular-nums">Direct</div>
                      <div className="hero-proof-label">No agency middleman fees</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <Link to="/signup?role=Creator" className="btn btn-secondary">
                      Create Creator Account
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* FEATURED CREATORS PREVIEW */}
        <section className="landing-section alt-surface">
          <div className="container">
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: 20,
                flexWrap: 'wrap',
                marginBottom: 32,
              }}
            >
              <div>
                <div className="section-kicker">Top Matches Today</div>
                <h2 className="section-title" style={{ marginBottom: 0 }}>
                  Featured Creators Ready to Collaborate
                </h2>
              </div>
              <Link to="/discover" className="btn btn-secondary">
                <span>Browse All 12 Creators</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="featured-grid">
              {featuredCreators.map(({ creator, match }) => (
                <CreatorCard
                  key={creator.id}
                  creator={creator}
                  match={match}
                  onConnect={setConnectTarget}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="landing-section">
          <div className="container">
            <div className="cta-banner">
              <div>
                <h2>Ready to launch your next creator partnership?</h2>
                <p>
                  Start browsing vetted creators by niche and audience metrics, or open your
                  workspace dashboard to manage active requests.
                </p>
              </div>
              <div className="cta-banner-actions">
                <Link to="/discover" className="btn btn-white btn-lg">
                  Discover Creators
                </Link>
                <Link to="/dashboard" className="btn btn-secondary btn-lg">
                  Open Dashboard
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ConnectModal creator={connectTarget} onClose={() => setConnectTarget(null)} />
    </div>
  );
};
