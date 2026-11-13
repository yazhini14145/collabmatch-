import { Creator, CreatorCategory, SocialPlatform } from '../data/creators';

export interface MatchPreferences {
  targetCategory: CreatorCategory | 'All';
  targetPlatform: SocialPlatform | 'All';
  targetLocation: string;
  minFollowers: number;
  maxFollowers: number;
  minEngagement: number;
  targetAudienceAge: string;
}

export interface MatchBreakdown {
  niche: { score: number; max: number; note: string };
  engagement: { score: number; max: number; note: string };
  audience: { score: number; max: number; note: string };
  followers: { score: number; max: number; note: string };
  platform: { score: number; max: number; note: string };
}

export interface MatchResult {
  score: number;
  label: 'Excellent Match' | 'Good Match' | 'Potential Match';
  tier: 'excellent' | 'good' | 'potential';
  summary: string;
  breakdown: MatchBreakdown;
}

export type SortOption = 'best_match' | 'popularity' | 'engagement';

export interface DiscoverFilters extends MatchPreferences {
  searchQuery: string;
  sortBy: SortOption;
}

export const DEFAULT_MATCH_PREFERENCES: MatchPreferences = {
  targetCategory: 'All',
  targetPlatform: 'All',
  targetLocation: 'All',
  minFollowers: 0,
  maxFollowers: 1000000,
  minEngagement: 0,
  targetAudienceAge: '25–34',
};

const ADJACENT_CATEGORIES: Record<CreatorCategory, CreatorCategory[]> = {
  Technology: ['Education', 'Gaming', 'Finance'],
  Lifestyle: ['Fashion', 'Beauty', 'Food', 'Travel'],
  Fashion: ['Beauty', 'Lifestyle'],
  Fitness: ['Lifestyle', 'Food'],
  Beauty: ['Fashion', 'Lifestyle'],
  Food: ['Lifestyle', 'Fitness', 'Travel'],
  Travel: ['Lifestyle', 'Food', 'Technology'],
  Finance: ['Technology', 'Education'],
  Education: ['Technology', 'Finance'],
  Gaming: ['Technology', 'Lifestyle'],
};

export function calculateCreatorMatch(
  creator: Creator,
  preferences: MatchPreferences = DEFAULT_MATCH_PREFERENCES
): MatchResult {
  // 1. Niche Compatibility (max 35 pts)
  let nicheScore = 28;
  let nicheNote = 'Broad cross-category versatility';

  if (preferences.targetCategory === 'All') {
    nicheScore = 30;
    nicheNote = `${creator.category} core specialty`;
  } else if (creator.category === preferences.targetCategory) {
    nicheScore = 35;
    nicheNote = `Exact match for ${preferences.targetCategory}`;
  } else if (creator.secondaryCategories.includes(preferences.targetCategory)) {
    nicheScore = 27;
    nicheNote = `Secondary expertise in ${preferences.targetCategory}`;
  } else if (ADJACENT_CATEGORIES[preferences.targetCategory]?.includes(creator.category)) {
    nicheScore = 20;
    nicheNote = `Adjacent audience to ${preferences.targetCategory}`;
  } else {
    nicheScore = 10;
    nicheNote = `Different primary niche (${creator.category})`;
  }

  // 2. Engagement Rate (max 25 pts)
  let engagementScore = 12;
  let engagementNote = `${creator.engagementRate.toFixed(1)}% average engagement`;
  const targetEng = Math.max(preferences.minEngagement, 4.0);

  if (creator.engagementRate >= 6.5) {
    engagementScore = 25;
    engagementNote = `Top-tier ${creator.engagementRate.toFixed(1)}% engagement`;
  } else if (creator.engagementRate >= targetEng + 1.0) {
    engagementScore = 23;
    engagementNote = `Exceeds benchmark (${creator.engagementRate.toFixed(1)}%)`;
  } else if (creator.engagementRate >= targetEng) {
    engagementScore = 20;
    engagementNote = `Meets target (${creator.engagementRate.toFixed(1)}%)`;
  } else if (creator.engagementRate >= 3.5) {
    engagementScore = 15;
    engagementNote = `Steady ${creator.engagementRate.toFixed(1)}% engagement`;
  } else {
    engagementScore = 10;
    engagementNote = `Below benchmark (${creator.engagementRate.toFixed(1)}%)`;
  }

  // 3. Audience Compatibility (max 15 pts)
  let audienceScore = 9;
  const ageMatch = creator.demographics.primaryAge === preferences.targetAudienceAge;
  const locationMatch =
    preferences.targetLocation === 'All' || creator.country === preferences.targetLocation;

  if (ageMatch && locationMatch) {
    audienceScore = 15;
  } else if (ageMatch || locationMatch) {
    audienceScore = 12;
  } else {
    audienceScore = 7;
  }

  const audienceNote =
    preferences.targetLocation === 'All'
      ? `Core demographic ${creator.demographics.primaryAge}`
      : `${creator.country} · ${creator.demographics.primaryAge} cohort`;

  // 4. Follower Range Fit (max 15 pts)
  let followerScore = 13;
  let followerNote = 'Ideal reach scale';

  if (
    creator.followers >= preferences.minFollowers &&
    creator.followers <= preferences.maxFollowers
  ) {
    followerScore = 15;
    followerNote = 'Inside target follower bracket';
  } else if (
    creator.followers >= preferences.minFollowers * 0.75 &&
    creator.followers <= preferences.maxFollowers * 1.25
  ) {
    followerScore = 10;
    followerNote = 'Near target follower bracket';
  } else {
    followerScore = 6;
    followerNote = 'Outside target follower bracket';
  }

  // 5. Platform Preference (max 10 pts)
  let platformScore = 8;
  let platformNote = `Primary on ${creator.platform}`;

  if (preferences.targetPlatform === 'All') {
    platformScore = 9;
    platformNote = `Multi-channel (${creator.platform} primary)`;
  } else if (creator.platform === preferences.targetPlatform) {
    platformScore = 10;
    platformNote = `Primary channel ${preferences.targetPlatform}`;
  } else if (creator.secondaryPlatforms.includes(preferences.targetPlatform)) {
    platformScore = 7;
    platformNote = `Active secondary presence on ${preferences.targetPlatform}`;
  } else {
    platformScore = 3;
    platformNote = `No active presence on ${preferences.targetPlatform}`;
  }

  const rawTotal =
    nicheScore + engagementScore + audienceScore + followerScore + platformScore;
  const score = Math.max(52, Math.min(99, Math.round(rawTotal)));

  let label: MatchResult['label'] = 'Potential Match';
  let tier: MatchResult['tier'] = 'potential';
  let summary = `${score}% Match – Potential match for cross-niche reach.`;

  if (score >= 85) {
    label = 'Excellent Match';
    tier = 'excellent';
    summary = `${score}% Match – Excellent fit for your brand.`;
  } else if (score >= 70) {
    label = 'Good Match';
    tier = 'good';
    summary = `${score}% Match – Strong alignment with your audience goals.`;
  }

  return {
    score,
    label,
    tier,
    summary,
    breakdown: {
      niche: { score: nicheScore, max: 35, note: nicheNote },
      engagement: { score: engagementScore, max: 25, note: engagementNote },
      audience: { score: audienceScore, max: 15, note: audienceNote },
      followers: { score: followerScore, max: 15, note: followerNote },
      platform: { score: platformScore, max: 10, note: platformNote },
    },
  };
}

export interface CreatorWithMatch {
  creator: Creator;
  match: MatchResult;
}

export function filterAndSortCreators(
  creators: Creator[],
  filters: DiscoverFilters
): CreatorWithMatch[] {
  const query = filters.searchQuery.trim().toLowerCase();

  const filtered = creators.filter((creator) => {
    if (query) {
      const searchable = [
        creator.name,
        creator.username,
        creator.category,
        creator.location,
        creator.platform,
        creator.shortBio,
        ...creator.secondaryCategories,
      ]
        .join(' ')
        .toLowerCase();
      if (!searchable.includes(query)) {
        return false;
      }
    }

    if (
      filters.targetCategory !== 'All' &&
      creator.category !== filters.targetCategory &&
      !creator.secondaryCategories.includes(filters.targetCategory)
    ) {
      return false;
    }

    if (
      filters.targetPlatform !== 'All' &&
      creator.platform !== filters.targetPlatform &&
      !creator.secondaryPlatforms.includes(filters.targetPlatform)
    ) {
      return false;
    }

    if (
      filters.targetLocation !== 'All' &&
      creator.country !== filters.targetLocation
    ) {
      return false;
    }

    if (creator.engagementRate < filters.minEngagement) {
      return false;
    }

    if (
      creator.followers < filters.minFollowers ||
      creator.followers > filters.maxFollowers
    ) {
      return false;
    }

    return true;
  });

  const withMatches = filtered.map((creator) => ({
    creator,
    match: calculateCreatorMatch(creator, filters),
  }));

  withMatches.sort((a, b) => {
    if (filters.sortBy === 'popularity') {
      return b.creator.followers - a.creator.followers;
    }
    if (filters.sortBy === 'engagement') {
      return b.creator.engagementRate - a.creator.engagementRate;
    }
    return b.match.score - a.match.score;
  });

  return withMatches;
}
