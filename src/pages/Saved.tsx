import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { Creator } from '../data/creators';
import { calculateCreatorMatch } from '../utils/matching';
import { useApp } from '../context/AppContext';
import { WorkspaceShell } from '../components/Sidebar';
import { CreatorCard } from '../components/CreatorCard';
import { ConnectModal } from '../components/ConnectModal';

export const Saved: React.FC = () => {
  const { creators, savedIds, preferences } = useApp();
  const [connectTarget, setConnectTarget] = useState<Creator | null>(null);

  const savedCreators = useMemo(() => {
    return creators
      .filter((creator) => savedIds.includes(creator.id))
      .map((creator) => ({
        creator,
        match: calculateCreatorMatch(creator, preferences),
      }));
  }, [creators, savedIds, preferences]);

  return (
    <WorkspaceShell title="Saved Creators">
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Saved Creator Shortlist</h1>
          <p className="page-subtitle">
            Manage bookmarked creators for upcoming campaigns. Saved lists persist in your
            browser.
          </p>
        </div>
        <Link to="/discover" className="btn btn-secondary">
          Browse More Creators
        </Link>
      </div>

      {savedCreators.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-state-icon" aria-hidden="true">
            <Bookmark size={22} />
          </div>
          <h2 style={{ fontSize: 19 }}>Your shortlist is empty</h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '40ch' }}>
            Bookmark creators while exploring the marketplace to compare match scores and send
            collaboration requests together.
          </p>
          <Link to="/discover" className="btn btn-primary">
            Discover Creators
          </Link>
        </div>
      ) : (
        <div className="creators-grid" data-testid="saved-grid">
          {savedCreators.map(({ creator, match }) => (
            <CreatorCard
              key={creator.id}
              creator={creator}
              match={match}
              onConnect={setConnectTarget}
            />
          ))}
        </div>
      )}

      <ConnectModal creator={connectTarget} onClose={() => setConnectTarget(null)} />
    </WorkspaceShell>
  );
};
