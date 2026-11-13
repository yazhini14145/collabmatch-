import test from 'node:test';
import assert from 'node:assert/strict';
import { CREATORS } from '../data/creators';
import {
  calculateCreatorMatch,
  DEFAULT_MATCH_PREFERENCES,
  filterAndSortCreators,
} from './matching';

test('matching algorithm computes deterministic high score for exact niche and platform match', () => {
  const maya = CREATORS.find((c) => c.id === 'maya-lin')!;
  const result = calculateCreatorMatch(maya, {
    targetCategory: 'Technology',
    targetPlatform: 'YouTube',
    targetLocation: 'United States',
    minFollowers: 100000,
    maxFollowers: 500000,
    minEngagement: 4.0,
    targetAudienceAge: '25–34',
  });

  assert.equal(result.score >= 90, true);
  assert.equal(result.label, 'Excellent Match');
  assert.equal(result.breakdown.niche.score, 35);
  assert.equal(result.breakdown.platform.score, 10);
});

test('matching algorithm lowers score for mismatched niche and platform', () => {
  const sofia = CREATORS.find((c) => c.id === 'sofia-reyes')!;
  const result = calculateCreatorMatch(sofia, {
    targetCategory: 'Finance',
    targetPlatform: 'LinkedIn',
    targetLocation: 'Europe',
    minFollowers: 10000,
    maxFollowers: 50000,
    minEngagement: 5.0,
    targetAudienceAge: '35–44',
  });

  assert.equal(result.score < 70, true);
  assert.equal(result.label, 'Potential Match');
});

test('filterAndSortCreators filters by search, category, and sorts by engagement', () => {
  const techResults = filterAndSortCreators(CREATORS, {
    ...DEFAULT_MATCH_PREFERENCES,
    searchQuery: '',
    targetCategory: 'Technology',
    sortBy: 'engagement',
  });

  assert.equal(techResults.length >= 2, true);
  assert.equal(
    techResults[0].creator.engagementRate >= techResults[1].creator.engagementRate,
    true
  );

  const searchResults = filterAndSortCreators(CREATORS, {
    ...DEFAULT_MATCH_PREFERENCES,
    searchQuery: 'Kenji',
    sortBy: 'best_match',
  });
  assert.equal(searchResults.length, 1);
  assert.equal(searchResults[0].creator.id, 'kenji-takahashi');
});
