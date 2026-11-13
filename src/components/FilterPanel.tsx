import React from 'react';
import { CATEGORIES, LOCATIONS, PLATFORMS } from '../data/creators';
import { DiscoverFilters, SortOption } from '../utils/matching';
import { SearchBar } from './SearchBar';

interface FilterPanelProps {
  filters: DiscoverFilters;
  onUpdate: (patch: Partial<DiscoverFilters>) => void;
  onReset: () => void;
}

const FOLLOWER_RANGES = [
  { label: 'Any Follower Count', min: 0, max: 1000000 },
  { label: 'Micro (50K – 180K)', min: 50000, max: 180000 },
  { label: 'Mid-Tier (180K – 300K)', min: 180000, max: 300000 },
  { label: 'Macro (300K+)', min: 300000, max: 1000000 },
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onUpdate,
  onReset,
}) => {
  const currentRangeValue = `${filters.minFollowers}-${filters.maxFollowers}`;

  return (
    <section className="discover-toolbar" aria-label="Creator search and filters">
      <div className="discover-search-row">
        <SearchBar
          value={filters.searchQuery}
          onChange={(searchQuery) => onUpdate({ searchQuery })}
        />

        <div className="filter-field">
          <label htmlFor="sort-creators-select" className="sr-only">
            Sort creators
          </label>
          <select
            id="sort-creators-select"
            className="form-select"
            value={filters.sortBy}
            onChange={(e) => onUpdate({ sortBy: e.target.value as SortOption })}
          >
            <option value="best_match">Sort: Best Match</option>
            <option value="engagement">Sort: Highest Engagement</option>
            <option value="popularity">Sort: Popularity (Followers)</option>
          </select>
        </div>
      </div>

      <div className="category-tabs" role="group" aria-label="Filter by niche category">
        <button
          type="button"
          className={`category-tab ${filters.targetCategory === 'All' ? 'active' : ''}`}
          onClick={() => onUpdate({ targetCategory: 'All' })}
        >
          All Niches
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className={`category-tab ${filters.targetCategory === category ? 'active' : ''}`}
            onClick={() => onUpdate({ targetCategory: category })}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="filter-grid">
        <div className="filter-field">
          <label htmlFor="filter-platform" className="filter-label">
            Social Platform
          </label>
          <select
            id="filter-platform"
            className="form-select"
            value={filters.targetPlatform}
            onChange={(e) =>
              onUpdate({
                targetPlatform: e.target.value as DiscoverFilters['targetPlatform'],
              })
            }
          >
            <option value="All">All Platforms</option>
            {PLATFORMS.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="filter-location" className="filter-label">
            Region / Location
          </label>
          <select
            id="filter-location"
            className="form-select"
            value={filters.targetLocation}
            onChange={(e) => onUpdate({ targetLocation: e.target.value })}
          >
            <option value="All">All Regions</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="filter-engagement" className="filter-label">
            Min. Engagement Rate
          </label>
          <select
            id="filter-engagement"
            className="form-select"
            value={filters.minEngagement}
            onChange={(e) => onUpdate({ minEngagement: Number(e.target.value) })}
          >
            <option value={0}>Any Engagement</option>
            <option value={4.5}>4.5%+ Engagement</option>
            <option value={5.5}>5.5%+ High Engagement</option>
            <option value={6.5}>6.5%+ Top Tier</option>
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="filter-followers" className="filter-label">
            Follower Range
          </label>
          <select
            id="filter-followers"
            className="form-select"
            value={currentRangeValue}
            onChange={(e) => {
              const [min, max] = e.target.value.split('-').map(Number);
              onUpdate({ minFollowers: min, maxFollowers: max });
            }}
          >
            {FOLLOWER_RANGES.map((range) => (
              <option key={range.label} value={`${range.min}-${range.max}`}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <label htmlFor="filter-audience-age" className="filter-label" style={{ margin: 0 }}>
            Target Audience Age:
          </label>
          <select
            id="filter-audience-age"
            className="form-select"
            style={{ width: 'auto', minHeight: 34, padding: '4px 10px', fontSize: 13 }}
            value={filters.targetAudienceAge}
            onChange={(e) => onUpdate({ targetAudienceAge: e.target.value })}
          >
            <option value="18–24">18–24 Gen Z</option>
            <option value="25–34">25–34 Core Millennials</option>
            <option value="35–44">35–44 Professionals</option>
          </select>
        </div>

        <button type="button" className="btn btn-ghost btn-sm" onClick={onReset}>
          Reset All Filters
        </button>
      </div>
    </section>
  );
};
