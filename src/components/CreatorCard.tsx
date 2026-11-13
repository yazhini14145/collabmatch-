import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Check, Send } from 'lucide-react';
import { Creator } from '../data/creators';
import { resolveCreatorAvatar } from '../data/creatorMedia';
import { MatchResult } from '../utils/matching';
import { formatCompactNumber } from '../utils/storage';
import { useApp } from '../context/AppContext';
import { SafeImage } from './SafeImage';

interface CreatorCardProps {
  creator: Creator;
  match: MatchResult;
  onConnect: (creator: Creator) => void;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({
  creator,
  match,
  onConnect,
}) => {
  const { savedIds, connections, toggleSave } = useApp();
  const isSaved = savedIds.includes(creator.id);
  const connection = connections.find((c) => c.creatorId === creator.id);
  const avatarSrc = resolveCreatorAvatar(creator.id, creator.avatar);

  return (
    <article className="creator-card">
      <div className="creator-card-header">
        <div className="creator-card-identity">
          <SafeImage
            src={avatarSrc}
            alt={`${creator.name} portrait`}
            className="creator-avatar"
            fallbackText={creator.name}
          />
          <div style={{ minWidth: 0 }}>
            <h3 className="creator-name">{creator.name}</h3>
            <div className="creator-handle">{creator.username}</div>
          </div>
        </div>

        <button
          type="button"
          className={`creator-save-btn ${isSaved ? 'saved' : ''}`}
          onClick={() => toggleSave(creator)}
          aria-label={isSaved ? `Remove ${creator.name} from saved` : `Save ${creator.name}`}
          aria-pressed={isSaved}
        >
          <Bookmark size={17} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="creator-meta-line">
        <span className="creator-meta-strong">{creator.category}</span>
        <span aria-hidden="true">·</span>
        <span>{creator.platform}</span>
        <span aria-hidden="true">·</span>
        <span>{creator.location}</span>
      </div>

      <p className="creator-bio">{creator.shortBio}</p>

      <div className="creator-metrics-grid">
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

      <div className="creator-match-row">
        <div className="creator-match-top">
          <span className="creator-match-score tabular-nums">{match.score}% Match</span>
          <span className={`creator-match-label ${match.tier}`}>{match.label}</span>
        </div>
        <div className="match-bar-track" aria-hidden="true">
          <div
            className={`match-bar-fill ${match.tier}`}
            style={{ width: `${match.score}%` }}
          />
        </div>
      </div>

      <div className="creator-card-actions">
        <Link to={`/creator/${creator.id}`} className="btn btn-secondary btn-sm">
          View Profile
        </Link>

        {connection ? (
          <Link
            to={`/messages?creator=${creator.id}`}
            className="btn btn-success btn-sm"
            aria-label={`Message ${creator.name} (${connection.status})`}
          >
            <Check size={14} />
            <span>{connection.status === 'connected' ? 'Connected' : 'Requested'}</span>
          </Link>
        ) : (
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => onConnect(creator)}
          >
            <Send size={14} />
            <span>Connect</span>
          </button>
        )}
      </div>
    </article>
  );
};
