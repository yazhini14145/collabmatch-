import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RefreshCw, SearchX } from 'lucide-react';
import { CATEGORIES, Creator, CreatorCategory } from '../data/creators';
import {
  DEFAULT_MATCH_PREFERENCES,
  DiscoverFilters,
  filterAndSortCreators,
} from '../utils/matching';
import { useApp } from '../context/AppContext';
import { WorkspaceShell } from '../components/Sidebar';
import { FilterPanel } from '../components/FilterPanel';
import { CreatorCard } from '../components/CreatorCard';
import { ConnectModal } from '../components/ConnectModal';

export const Discover: React.FC = () => {
  const { creators, preferences, updatePreferences, showToast } = useApp();
  const [searchParams] = useSearchParams();
  const [connectTarget, setConnectTarget] = useState<Creator | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const initialCategoryParam = searchParams.get('category');
  const validInitialCategory: CreatorCategory | 'All' =
    initialCategoryParam && CATEGORIES.includes(initialCategoryParam as CreatorCategory)
      ? (initialCategoryParam as CreatorCategory)
      : preferences.targetCategory;

  const [filters, setFilters] = useState<DiscoverFilters>({
    ...preferences,
    targetCategory: validInitialCategory,
    searchQuery: '',
    sortBy: 'best_match',
  });

  useEffect(() => {
    if (
      initialCategoryParam &&
      CATEGORIES.includes(initialCategoryParam as CreatorCategory)
    ) {
      setFilters((prev) => ({
        ...prev,
        targetCategory: initialCategoryParam as CreatorCategory,
      }));
    }
  }, [initialCategoryParam]);

  const handleUpdate = (patch: Partial<DiscoverFilters>) => {
    setFilters((prev) => {
      const next = { ...prev, ...patch };
      updatePreferences({
        targetCategory: next.targetCategory,
        targetPlatform: next.targetPlatform,
        targetLocation: next.targetLocation,
        minFollowers: next.minFollowers,
        maxFollowers: next.maxFollowers,
        minEngagement: next.minEngagement,
        targetAudienceAge: next.targetAudienceAge,
      });
      return next;
    });
  };

  const handleReset = () => {
    const resetState: DiscoverFilters = {
      ...DEFAULT_MATCH_PREFERENCES,
      searchQuery: '',
      sortBy: 'best_match',
    };
    setFilters(resetState);
    updatePreferences(DEFAULT_MATCH_PREFERENCES);
    showToast('Filters reset', 'Showing all 12 creators.', 'info');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    window.setTimeout(() => {
      setIsRefreshing(false);
    }, 320);
  };

  const results = useMemo(
    () => filterAndSortCreators(creators, filters),
    [creators, filters]
  );

  return (
    <WorkspaceShell
      title="Discover Creators"
      primaryAction={
        <button type="button" className="btn btn-secondary btn-sm" onClick={handleRefresh}>
          <RefreshCw size={14} />
          <span>Recalculate Matches</span>
        </button>
      }
    >
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Creator Discovery Marketplace</h1>
          <p className="page-subtitle">
            Filter by niche, platform, audience demographics, and engagement to calculate live
            collaboration match scores.
          </p>
        </div>
      </div>

      <FilterPanel filters={filters} onUpdate={handleUpdate} onReset={handleReset} />

      <div className="discover-results-meta">
        <span>
          Showing <strong className="tabular-nums">{results.length}</strong> of{' '}
          <strong className="tabular-nums">{creators.length}</strong> vetted creators
        </span>
        <span>
          Match weights: Niche 35% · Engagement 25% · Audience 15% · Followers 15% · Platform 10%
        </span>
      </div>

      {isRefreshing ? (
        <div className="creators-grid" aria-label="Loading creators">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="skeleton-card">
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div className="skeleton-bar" style={{ width: 56, height: 56, borderRadius: 14 }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div className="skeleton-bar" style={{ width: '60%' }} />
                  <div className="skeleton-bar" style={{ width: '40%' }} />
                </div>
              </div>
              <div className="skeleton-bar" style={{ width: '90%' }} />
              <div className="skeleton-bar" style={{ width: '75%' }} />
              <div className="skeleton-bar" style={{ width: '100%', height: 42, marginTop: 'auto' }} />
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-state-icon" aria-hidden="true">
            <SearchX size={24} />
          </div>
          <h2 style={{ fontSize: 19 }}>No creators match those filters</h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '42ch' }}>
            Try broadening your follower range, lowering the minimum engagement threshold, or
            clearing your search query.
          </p>
          <button type="button" className="btn btn-primary" onClick={handleReset}>
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="creators-grid" data-testid="creators-grid">
          {results.map(({ creator, match }) => (
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
