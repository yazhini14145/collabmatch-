const mayaImg = '/src/assets/images/creator_maya_tech_1794566568494.jpg';
const marcusImg = '/src/assets/images/creator_marcus_fitness_1794566569604.jpg';
const elenaImg = '/src/assets/images/creator_elena_fashion_1794566570331.jpg';
const arjunImg = '/src/assets/images/creator_arjun_finance_1794566570319.jpg';
const sofiaImg = '/src/assets/images/creator_sofia_beauty_1794566571662.jpg';
const kenjiImg = '/src/assets/images/creator_kenji_food_1794566571007.jpg';
const chloeImg = '/src/assets/images/creator_chloe_travel_1794566571554.jpg';
const liamImg = '/src/assets/images/creator_liam_gaming_1794566572284.jpg';
const amaraImg = '/src/assets/images/creator_amara_lifestyle_1794566573209.jpg';
const noahImg = '/src/assets/images/creator_noah_education_1794566572706.jpg';
const yasminImg = '/src/assets/images/creator_nadia_tech_1794566574140.jpg';
const lucasImg = '/src/assets/images/creator_lucas_travel_1794566573686.jpg';
const studioCoverImg = 'studio';
const lifestyleCoverImg = 'lifestyle';

export type CreatorCategory =
  | 'Technology'
  | 'Lifestyle'
  | 'Fashion'
  | 'Fitness'
  | 'Beauty'
  | 'Food'
  | 'Travel'
  | 'Finance'
  | 'Education'
  | 'Gaming';

export type SocialPlatform = 'YouTube' | 'Instagram' | 'TikTok' | 'Twitch' | 'LinkedIn';

export interface PortfolioItem {
  id: string;
  title: string;
  brand: string;
  format: string;
  views: string;
  engagement: string;
  summary: string;
  image: string;
}

export interface AudienceDemographics {
  primaryAge: string;
  ageBreakdown: { label: string; percentage: number }[];
  genderSplit: { female: number; male: number; other: number };
  topRegions: { country: string; percentage: number }[];
}

export interface Creator {
  id: string;
  name: string;
  username: string;
  category: CreatorCategory;
  secondaryCategories: CreatorCategory[];
  location: string;
  country: string;
  platform: SocialPlatform;
  secondaryPlatforms: SocialPlatform[];
  followers: number;
  engagementRate: number;
  avgLikes: number;
  shortBio: string;
  fullBio: string;
  avatar: string;
  coverImage: string;
  budgetRange: string;
  budgetMin: number;
  budgetMax: number;
  collaborationInterests: string[];
  pastPartners: string[];
  responseTime: string;
  demographics: AudienceDemographics;
  portfolio: PortfolioItem[];
  socialLinks: { platform: string; handle: string; url: string }[];
}

export const CATEGORIES: CreatorCategory[] = [
  'Technology',
  'Lifestyle',
  'Fashion',
  'Fitness',
  'Beauty',
  'Food',
  'Travel',
  'Finance',
  'Education',
  'Gaming',
];

export const PLATFORMS: SocialPlatform[] = [
  'YouTube',
  'Instagram',
  'TikTok',
  'Twitch',
  'LinkedIn',
];

export const LOCATIONS: string[] = [
  'United States',
  'United Kingdom',
  'Europe',
  'Asia-Pacific',
  'Canada & Latin America',
];

export const CREATORS: Creator[] = [
  {
    id: 'maya-lin',
    name: 'Maya Lin',
    username: '@mayalintech',
    category: 'Technology',
    secondaryCategories: ['Education', 'Lifestyle'],
    location: 'San Francisco, USA',
    country: 'United States',
    platform: 'YouTube',
    secondaryPlatforms: ['Instagram', 'LinkedIn'],
    followers: 245000,
    engagementRate: 5.4,
    avgLikes: 13200,
    shortBio:
      'Hardware deep dives, clean desk workflows, and developer productivity gear reviews.',
    fullBio:
      'Maya produces studio-grade video essays and hands-on product reviews focused on developer tools, creative workstations, and thoughtful consumer hardware. Brands work with her for high-retention product launches and transparent technical storytelling.',
    avatar: mayaImg,
    coverImage: studioCoverImg,
    budgetRange: '$3,500 – $6,500',
    budgetMin: 3500,
    budgetMax: 6500,
    collaborationInterests: [
      'Dedicated YouTube Review',
      'Product Launch Integration',
      'Workspace Setup Series',
      'Long-term Brand Ambassador',
    ],
    pastPartners: ['Logitech', 'Notion', 'Keychron', 'Figma'],
    responseTime: 'Within 12 hours',
    demographics: {
      primaryAge: '25–34',
      ageBreakdown: [
        { label: '18–24', percentage: 22 },
        { label: '25–34', percentage: 51 },
        { label: '35–44', percentage: 20 },
        { label: '45+', percentage: 7 },
      ],
      genderSplit: { female: 38, male: 59, other: 3 },
      topRegions: [
        { country: 'United States', percentage: 48 },
        { country: 'United Kingdom', percentage: 16 },
        { country: 'Canada', percentage: 12 },
      ],
    },
    portfolio: [
      {
        id: 'p1',
        title: 'Building the Quietest Studio Desk of 2026',
        brand: 'Keychron & BenQ',
        format: 'YouTube Video · 14 min',
        views: '318K views',
        engagement: '6.1%',
        summary: 'Full desk acoustic walkthrough driving 4,200+ tracked referral clicks in 72 hours.',
        image: studioCoverImg,
      },
      {
        id: 'p2',
        title: 'AI Code Assistants Tested on Real Ship Cycles',
        brand: 'Linear',
        format: 'YouTube + Newsletter',
        views: '194K views',
        engagement: '5.3%',
        summary: 'Benchmark comparison for engineering leads and indie founders.',
        image: lifestyleCoverImg,
      },
    ],
    socialLinks: [
      { platform: 'YouTube', handle: '@mayalintech', url: 'https://youtube.com' },
      { platform: 'Instagram', handle: '@mayalintech', url: 'https://instagram.com' },
      { platform: 'LinkedIn', handle: 'maya-lin-tech', url: 'https://linkedin.com' },
    ],
  },
  {
    id: 'marcus-cole',
    name: 'Marcus Cole',
    username: '@marcusmove',
    category: 'Fitness',
    secondaryCategories: ['Lifestyle', 'Food'],
    location: 'Austin, USA',
    country: 'United States',
    platform: 'Instagram',
    secondaryPlatforms: ['YouTube', 'TikTok'],
    followers: 185000,
    engagementRate: 6.2,
    avgLikes: 11400,
    shortBio:
      'Functional strength coach sharing science-backed mobility routines and recovery nutrition.',
    fullBio:
      'Certified strength and conditioning specialist creating approachable, form-first training series for busy professionals. Known for high-save carousel breakdowns and authentic endurance gear testing.',
    avatar: marcusImg,
    coverImage: studioCoverImg,
    budgetRange: '$2,500 – $4,800',
    budgetMin: 2500,
    budgetMax: 4800,
    collaborationInterests: [
      'Training Series Reels',
      'Wearable Tech Testing',
      'Nutrition & Hydration Launch',
      'Co-branded Workout Challenge',
    ],
    pastPartners: ['Whoop', 'Tracksmith', 'AG1', 'On Running'],
    responseTime: 'Within 6 hours',
    demographics: {
      primaryAge: '25–34',
      ageBreakdown: [
        { label: '18–24', percentage: 26 },
        { label: '25–34', percentage: 46 },
        { label: '35–44', percentage: 21 },
        { label: '45+', percentage: 7 },
      ],
      genderSplit: { female: 44, male: 54, other: 2 },
      topRegions: [
        { country: 'United States', percentage: 62 },
        { country: 'Canada', percentage: 14 },
        { country: 'United Kingdom', percentage: 9 },
      ],
    },
    portfolio: [
      {
        id: 'p3',
        title: '30-Day Zone 2 Heart Rate Experiment',
        brand: 'Whoop',
        format: 'Instagram Reels Series',
        views: '420K plays',
        engagement: '6.8%',
        summary: '4-part recovery diary achieving 18,500 saves and 9.4% story link CTR.',
        image: studioCoverImg,
      },
      {
        id: 'p4',
        title: 'Morning Mobility for Remote Builders',
        brand: 'Tracksmith',
        format: 'YouTube Shorts + IG',
        views: '165K views',
        engagement: '5.9%',
        summary: 'Zero-equipment desk recovery routine tailored to tech commuters.',
        image: lifestyleCoverImg,
      },
    ],
    socialLinks: [
      { platform: 'Instagram', handle: '@marcusmove', url: 'https://instagram.com' },
      { platform: 'YouTube', handle: '@marcusmove', url: 'https://youtube.com' },
      { platform: 'TikTok', handle: '@marcusmove', url: 'https://tiktok.com' },
    ],
  },
  {
    id: 'elena-rostova',
    name: 'Elena Moreau',
    username: '@elenamoreau',
    category: 'Fashion',
    secondaryCategories: ['Lifestyle', 'Beauty'],
    location: 'Paris, France',
    country: 'Europe',
    platform: 'Instagram',
    secondaryPlatforms: ['TikTok', 'YouTube'],
    followers: 310000,
    engagementRate: 4.9,
    avgLikes: 15200,
    shortBio:
      'Capsule wardrobe curator highlighting timeless tailoring, ethical textiles, and atelier craft.',
    fullBio:
      'Based in Paris, Elena partners with sustainable fashion houses and modern luxury labels to produce 35mm-inspired lookbooks and garment longevity guides that convert discerning style audiences.',
    avatar: elenaImg,
    coverImage: lifestyleCoverImg,
    budgetRange: '$4,000 – $7,500',
    budgetMin: 4000,
    budgetMax: 7500,
    collaborationInterests: [
      'Editorial Lookbook Campaign',
      'Capsule Collection Styling',
      'Showroom Coverage',
      'Paid Usage Rights',
    ],
    pastPartners: ['Sezane', 'Polene', 'COS', 'Aesop'],
    responseTime: 'Within 24 hours',
    demographics: {
      primaryAge: '25–34',
      ageBreakdown: [
        { label: '18–24', percentage: 19 },
        { label: '25–34', percentage: 49 },
        { label: '35–44', percentage: 24 },
        { label: '45+', percentage: 8 },
      ],
      genderSplit: { female: 81, male: 17, other: 2 },
      topRegions: [
        { country: 'France', percentage: 31 },
        { country: 'United Kingdom', percentage: 24 },
        { country: 'United States', percentage: 22 },
      ],
    },
    portfolio: [
      {
        id: 'p5',
        title: '5-Piece Autumn Tailoring Guide',
        brand: 'COS',
        format: 'IG Carousel + Reel',
        views: '510K reach',
        engagement: '5.4%',
        summary: 'Generated 3.8x ROAS on curated capsule affiliate storefront.',
        image: lifestyleCoverImg,
      },
      {
        id: 'p6',
        title: 'Behind the Leather Atelier',
        brand: 'Polene',
        format: 'Mini Documentary',
        views: '230K views',
        engagement: '4.7%',
        summary: 'Editorial craftsmanship story filmed on location in Paris.',
        image: studioCoverImg,
      },
    ],
    socialLinks: [
      { platform: 'Instagram', handle: '@elenamoreau', url: 'https://instagram.com' },
      { platform: 'TikTok', handle: '@elenamoreau', url: 'https://tiktok.com' },
    ],
  },
  {
    id: 'arjun-mehta',
    name: 'Arjun Mehta',
    username: '@arjunwealth',
    category: 'Finance',
    secondaryCategories: ['Education', 'Technology'],
    location: 'London, UK',
    country: 'United Kingdom',
    platform: 'LinkedIn',
    secondaryPlatforms: ['YouTube', 'Instagram'],
    followers: 142000,
    engagementRate: 5.8,
    avgLikes: 8200,
    shortBio:
      'Fintech analyst breaking down founder equity, SaaS economics, and modern wealth tools.',
    fullBio:
      'Former fintech product strategist helping early-career professionals and startup operators understand personal finance, investing frameworks, and B2B SaaS tools with clarity and zero hype.',
    avatar: arjunImg,
    coverImage: studioCoverImg,
    budgetRange: '$3,000 – $5,500',
    budgetMin: 3000,
    budgetMax: 5500,
    collaborationInterests: [
      'Fintech Product Walkthrough',
      'LinkedIn Thought Leadership',
      'YouTube Deep-Dive Sponsorship',
      'Newsletter Partnership',
    ],
    pastPartners: ['Wise', 'Stripe', 'Mercury', 'Interactive Brokers'],
    responseTime: 'Within 8 hours',
    demographics: {
      primaryAge: '25–34',
      ageBreakdown: [
        { label: '18–24', percentage: 15 },
        { label: '25–34', percentage: 54 },
        { label: '35–44', percentage: 23 },
        { label: '45+', percentage: 8 },
      ],
      genderSplit: { female: 39, male: 59, other: 2 },
      topRegions: [
        { country: 'United Kingdom', percentage: 38 },
        { country: 'United States', percentage: 34 },
        { country: 'Singapore', percentage: 11 },
      ],
    },
    portfolio: [
      {
        id: 'p7',
        title: 'Multi-Currency Treasury for Remote Startups',
        brand: 'Wise Business',
        format: 'LinkedIn Carousel + Video',
        views: '280K impressions',
        engagement: '6.3%',
        summary: 'Generated 1,100+ qualified B2B demo signups.',
        image: studioCoverImg,
      },
    ],
    socialLinks: [
      { platform: 'LinkedIn', handle: 'arjun-mehta-finance', url: 'https://linkedin.com' },
      { platform: 'YouTube', handle: '@arjunwealth', url: 'https://youtube.com' },
    ],
  },
  {
    id: 'sofia-reyes',
    name: 'Sofia Reyes',
    username: '@sofiaglowstudio',
    category: 'Beauty',
    secondaryCategories: ['Lifestyle', 'Fashion'],
    location: 'Los Angeles, USA',
    country: 'United States',
    platform: 'TikTok',
    secondaryPlatforms: ['Instagram', 'YouTube'],
    followers: 410000,
    engagementRate: 7.1,
    avgLikes: 29100,
    shortBio:
      'Ingredient-focused skincare educator and clean beauty minimalist testing SPF & barrier care.',
    fullBio:
      'Sofia translates cosmetic chemistry into honest, sunlit daily routines. Her community trusts her 28-day wear tests, making her a go-to partner for clean skincare and clinical beauty launches.',
    avatar: sofiaImg,
    coverImage: lifestyleCoverImg,
    budgetRange: '$4,500 – $8,000',
    budgetMin: 4500,
    budgetMax: 8000,
    collaborationInterests: [
      '28-Day Skincare Wear Test',
      'TikTok Spark Ads Whitelisting',
      'Product Formulation Story',
      'Launch Event Hosting',
    ],
    pastPartners: ['Summer Fridays', 'Glossier', 'La Roche-Posay', 'Tower 28'],
    responseTime: 'Within 10 hours',
    demographics: {
      primaryAge: '18–24',
      ageBreakdown: [
        { label: '18–24', percentage: 44 },
        { label: '25–34', percentage: 39 },
        { label: '35–44', percentage: 13 },
        { label: '45+', percentage: 4 },
      ],
      genderSplit: { female: 86, male: 11, other: 3 },
      topRegions: [
        { country: 'United States', percentage: 58 },
        { country: 'Canada', percentage: 15 },
        { country: 'United Kingdom', percentage: 10 },
      ],
    },
    portfolio: [
      {
        id: 'p8',
        title: 'Barrier Repair Routine Under Harsh Studio Lights',
        brand: 'Tower 28',
        format: 'TikTok Series (3x)',
        views: '1.2M views',
        engagement: '7.8%',
        summary: 'Sold out featured serum SKU twice during launch week.',
        image: lifestyleCoverImg,
      },
    ],
    socialLinks: [
      { platform: 'TikTok', handle: '@sofiaglowstudio', url: 'https://tiktok.com' },
      { platform: 'Instagram', handle: '@sofiaglowstudio', url: 'https://instagram.com' },
    ],
  },
  {
    id: 'kenji-takahashi',
    name: 'Kenji Takahashi',
    username: '@kenjiskitchen',
    category: 'Food',
    secondaryCategories: ['Lifestyle', 'Travel'],
    location: 'Tokyo, Japan',
    country: 'Asia-Pacific',
    platform: 'YouTube',
    secondaryPlatforms: ['Instagram', 'TikTok'],
    followers: 278000,
    engagementRate: 6.5,
    avgLikes: 18100,
    shortBio:
      'Artisanal home chef crafting 20-minute Japanese comfort dishes, pantry staples, and cookware reviews.',
    fullBio:
      'Kenji films tactile, ASMR-inspired culinary stories from his sunlit Tokyo kitchen. He collaborates with cookware makers, specialty pantry brands, and hospitality groups on recipe development and branded series.',
    avatar: kenjiImg,
    coverImage: lifestyleCoverImg,
    budgetRange: '$3,200 – $6,000',
    budgetMin: 3200,
    budgetMax: 6000,
    collaborationInterests: [
      'Custom Recipe Development',
      'Cookware Durability Test',
      'Pantry Ingredient Spotlight',
      'Food Travel Mini-Doc',
    ],
    pastPartners: ['Our Place', 'Vermicular', 'Kikkoman', 'Fellow'],
    responseTime: 'Within 16 hours',
    demographics: {
      primaryAge: '25–34',
      ageBreakdown: [
        { label: '18–24', percentage: 21 },
        { label: '25–34', percentage: 47 },
        { label: '35–44', percentage: 22 },
        { label: '45+', percentage: 10 },
      ],
      genderSplit: { female: 53, male: 45, other: 2 },
      topRegions: [
        { country: 'Japan', percentage: 34 },
        { country: 'United States', percentage: 31 },
        { country: 'Singapore', percentage: 14 },
      ],
    },
    portfolio: [
      {
        id: 'p9',
        title: 'One-Pot Donabe Dinners for Weeknights',
        brand: 'Fellow & Vermicular',
        format: 'YouTube Documentary',
        views: '490K views',
        engagement: '6.9%',
        summary: '29,000 recipe bookmarks and 4.1% affiliate conversion.',
        image: lifestyleCoverImg,
      },
    ],
    socialLinks: [
      { platform: 'YouTube', handle: '@kenjiskitchen', url: 'https://youtube.com' },
      { platform: 'Instagram', handle: '@kenjiskitchen', url: 'https://instagram.com' },
    ],
  },
  {
    id: 'chloe-lindqvist',
    name: 'Chloe Lindqvist',
    username: '@chloeroams',
    category: 'Travel',
    secondaryCategories: ['Lifestyle', 'Technology'],
    location: 'Stockholm, Sweden',
    country: 'Europe',
    platform: 'Instagram',
    secondaryPlatforms: ['YouTube', 'TikTok'],
    followers: 196000,
    engagementRate: 5.6,
    avgLikes: 10900,
    shortBio:
      'Nordic slow-travel filmmaker documenting coastal trails, eco-lodges, and mirrorless camera kits.',
    fullBio:
      'Chloe crafts atmospheric travel films and field guides for outdoor gear labels, sustainable hospitality brands, and tourism boards across Northern Europe and the Pacific Northwest.',
    avatar: chloeImg,
    coverImage: studioCoverImg,
    budgetRange: '$2,800 – $5,200',
    budgetMin: 2800,
    budgetMax: 5200,
    collaborationInterests: [
      'Destination Film Campaign',
      'Outdoor Gear Field Test',
      'Camera & Optics Showcase',
      'Boutique Stay Editorial',
    ],
    pastPartners: ['Fjallraven', 'Peak Design', 'Sony Alpha', 'Visit Norway'],
    responseTime: 'Within 12 hours',
    demographics: {
      primaryAge: '25–34',
      ageBreakdown: [
        { label: '18–24', percentage: 24 },
        { label: '25–34', percentage: 48 },
        { label: '35–44', percentage: 20 },
        { label: '45+', percentage: 8 },
      ],
      genderSplit: { female: 58, male: 40, other: 2 },
      topRegions: [
        { country: 'Sweden', percentage: 26 },
        { country: 'United Kingdom', percentage: 22 },
        { country: 'United States', percentage: 24 },
      ],
    },
    portfolio: [
      {
        id: 'p10',
        title: '72 Hours Across the Lofoten Ridge',
        brand: 'Peak Design',
        format: 'Short Film + IG Story Kit',
        views: '340K views',
        engagement: '6.0%',
        summary: 'Field-tested weatherproof pack system across coastal hikes.',
        image: studioCoverImg,
      },
    ],
    socialLinks: [
      { platform: 'Instagram', handle: '@chloeroams', url: 'https://instagram.com' },
      { platform: 'YouTube', handle: '@chloeroams', url: 'https://youtube.com' },
    ],
  },
  {
    id: 'liam-oconnor',
    name: 'Liam O’Connor',
    username: '@liamplays',
    category: 'Gaming',
    secondaryCategories: ['Technology', 'Education'],
    location: 'Toronto, Canada',
    country: 'Canada & Latin America',
    platform: 'Twitch',
    secondaryPlatforms: ['YouTube', 'TikTok'],
    followers: 224000,
    engagementRate: 7.4,
    avgLikes: 16500,
    shortBio:
      'Indie game spotlight streamer, custom mechanical keyboard builder, and PC hardware tester.',
    fullBio:
      'Liam hosts high-interaction live build streams and honest indie game showcases. His community has one of the highest live chat engagement rates in the hardware & indie gaming niche.',
    avatar: liamImg,
    coverImage: studioCoverImg,
    budgetRange: '$2,200 – $4,500',
    budgetMin: 2200,
    budgetMax: 4500,
    collaborationInterests: [
      'Sponsored Twitch Stream',
      'Custom Peripheral Build',
      'Indie Game Launch Marathon',
      'YouTube Benchmark Integration',
    ],
    pastPartners: ['Elgato', 'AMD', 'Wooting', 'Devolver Digital'],
    responseTime: 'Within 4 hours',
    demographics: {
      primaryAge: '18–24',
      ageBreakdown: [
        { label: '18–24', percentage: 49 },
        { label: '25–34', percentage: 37 },
        { label: '35–44', percentage: 11 },
        { label: '45+', percentage: 3 },
      ],
      genderSplit: { female: 29, male: 67, other: 4 },
      topRegions: [
        { country: 'Canada', percentage: 29 },
        { country: 'United States', percentage: 46 },
        { country: 'United Kingdom', percentage: 12 },
      ],
    },
    portfolio: [
      {
        id: 'p11',
        title: 'Hall-Effect Keyboard Latency Lab',
        brand: 'Wooting',
        format: 'Twitch + YouTube Breakdown',
        views: '390K views',
        engagement: '7.9%',
        summary: 'Live audience Q&A with 14,000 peak concurrent viewers.',
        image: studioCoverImg,
      },
    ],
    socialLinks: [
      { platform: 'Twitch', handle: 'liamplays', url: 'https://twitch.tv' },
      { platform: 'YouTube', handle: '@liamplays', url: 'https://youtube.com' },
    ],
  },
  {
    id: 'amara-okafor',
    name: 'Amara Okafor',
    username: '@amaraliving',
    category: 'Lifestyle',
    secondaryCategories: ['Fashion', 'Food'],
    location: 'London, UK',
    country: 'United Kingdom',
    platform: 'Instagram',
    secondaryPlatforms: ['YouTube', 'TikTok'],
    followers: 162000,
    engagementRate: 6.1,
    avgLikes: 9880,
    shortBio:
      'Biophilic apartment designer sharing mindful home routines, ceramics, and warm minimal spaces.',
    fullBio:
      'Amara transforms compact urban apartments into calm, plant-filled sanctuaries. She partners with homeware, lighting, acoustic, and wellness brands looking for deeply relatable lifestyle integration.',
    avatar: amaraImg,
    coverImage: lifestyleCoverImg,
    budgetRange: '$2,000 – $4,200',
    budgetMin: 2000,
    budgetMax: 4200,
    collaborationInterests: [
      'Home Makeover Series',
      'Lighting & Furniture Feature',
      'Morning Routine Integration',
      'Pinterest & IG Story Kit',
    ],
    pastPartners: ['Ferm Living', 'Sonos', 'Aesop', 'Made.com'],
    responseTime: 'Within 8 hours',
    demographics: {
      primaryAge: '25–34',
      ageBreakdown: [
        { label: '18–24', percentage: 20 },
        { label: '25–34', percentage: 52 },
        { label: '35–44', percentage: 21 },
        { label: '45+', percentage: 7 },
      ],
      genderSplit: { female: 74, male: 23, other: 3 },
      topRegions: [
        { country: 'United Kingdom', percentage: 47 },
        { country: 'United States', percentage: 26 },
        { country: 'Germany', percentage: 10 },
      ],
    },
    portfolio: [
      {
        id: 'p12',
        title: 'Warm Minimalism in a 550 sq ft Loft',
        brand: 'Sonos & Ferm Living',
        format: 'YouTube Room Tour',
        views: '275K views',
        engagement: '6.4%',
        summary: 'Featured architectural sound placement with 11K saves.',
        image: lifestyleCoverImg,
      },
    ],
    socialLinks: [
      { platform: 'Instagram', handle: '@amaraliving', url: 'https://instagram.com' },
      { platform: 'YouTube', handle: '@amaraliving', url: 'https://youtube.com' },
    ],
  },
  {
    id: 'noah-sterling',
    name: 'Noah Sterling',
    username: '@noahexplains',
    category: 'Education',
    secondaryCategories: ['Technology', 'Finance'],
    location: 'New York, USA',
    country: 'United States',
    platform: 'YouTube',
    secondaryPlatforms: ['LinkedIn', 'TikTok'],
    followers: 356000,
    engagementRate: 5.2,
    avgLikes: 18500,
    shortBio:
      'Visual learning essays on systems thinking, study workflows, and applied science.',
    fullBio:
      'Noah creates animated and whiteboard-driven educational explainers for curious professionals and university learners. Ideal for productivity software, EdTech platforms, and publishing brands.',
    avatar: noahImg,
    coverImage: studioCoverImg,
    budgetRange: '$4,200 – $7,000',
    budgetMin: 4200,
    budgetMax: 7000,
    collaborationInterests: [
      'Mid-roll Educational Integration',
      'EdTech Platform Walkthrough',
      'Newsletter Deep-Dive',
      'Campus Workshop Sponsorship',
    ],
    pastPartners: ['Brilliant', 'Readwise', 'Obsidian', 'Skillshare'],
    responseTime: 'Within 18 hours',
    demographics: {
      primaryAge: '18–24',
      ageBreakdown: [
        { label: '18–24', percentage: 41 },
        { label: '25–34', percentage: 38 },
        { label: '35–44', percentage: 15 },
        { label: '45+', percentage: 6 },
      ],
      genderSplit: { female: 42, male: 55, other: 3 },
      topRegions: [
        { country: 'United States', percentage: 51 },
        { country: 'United Kingdom', percentage: 15 },
        { country: 'India', percentage: 11 },
      ],
    },
    portfolio: [
      {
        id: 'p13',
        title: 'How Spaced Repetition Rewires Memory',
        brand: 'Readwise',
        format: 'YouTube Visual Essay',
        views: '610K views',
        engagement: '5.7%',
        summary: 'Highest-converting EdTech sponsorship of Q2 with 6,400 trials.',
        image: studioCoverImg,
      },
    ],
    socialLinks: [
      { platform: 'YouTube', handle: '@noahexplains', url: 'https://youtube.com' },
      { platform: 'LinkedIn', handle: 'noah-sterling-edu', url: 'https://linkedin.com' },
    ],
  },
  {
    id: 'yasmin-alfarsi',
    name: 'Yasmin Al-Farsi',
    username: '@yasminbuilds',
    category: 'Technology',
    secondaryCategories: ['Finance', 'Education'],
    location: 'Singapore',
    country: 'Asia-Pacific',
    platform: 'LinkedIn',
    secondaryPlatforms: ['YouTube', 'Instagram'],
    followers: 118000,
    engagementRate: 6.7,
    avgLikes: 7900,
    shortBio:
      'AI product strategist and software reviewer testing developer APIs and SaaS launch tools.',
    fullBio:
      'Yasmin evaluates enterprise AI workflows, developer infrastructure, and B2B productivity apps for founders and product managers across APAC and North America.',
    avatar: yasminImg,
    coverImage: studioCoverImg,
    budgetRange: '$2,600 – $5,000',
    budgetMin: 2600,
    budgetMax: 5000,
    collaborationInterests: [
      'AI Product Launch Review',
      'B2B SaaS Case Study',
      'Webinar Co-hosting',
      'Technical Founder Interview',
    ],
    pastPartners: ['Vercel', 'Raycast', 'Supabase', 'Loom'],
    responseTime: 'Within 6 hours',
    demographics: {
      primaryAge: '25–34',
      ageBreakdown: [
        { label: '18–24', percentage: 17 },
        { label: '25–34', percentage: 56 },
        { label: '35–44', percentage: 21 },
        { label: '45+', percentage: 6 },
      ],
      genderSplit: { female: 43, male: 55, other: 2 },
      topRegions: [
        { country: 'Singapore', percentage: 28 },
        { country: 'United States', percentage: 36 },
        { country: 'United Kingdom', percentage: 14 },
      ],
    },
    portfolio: [
      {
        id: 'p14',
        title: 'Shipping a Full SaaS MVP in 48 Hours',
        brand: 'Vercel & Supabase',
        format: 'YouTube + LinkedIn Series',
        views: '215K views',
        engagement: '7.1%',
        summary: 'Drove 2,900 developer signups via tracked sandbox template.',
        image: studioCoverImg,
      },
    ],
    socialLinks: [
      { platform: 'LinkedIn', handle: 'yasmin-alfarsi', url: 'https://linkedin.com' },
      { platform: 'YouTube', handle: '@yasminbuilds', url: 'https://youtube.com' },
    ],
  },
  {
    id: 'lucas-ferreira',
    name: 'Lucas Ferreira',
    username: '@lucasframes',
    category: 'Travel',
    secondaryCategories: ['Food', 'Lifestyle'],
    location: 'São Paulo, Brazil',
    country: 'Canada & Latin America',
    platform: 'TikTok',
    secondaryPlatforms: ['Instagram', 'YouTube'],
    followers: 294000,
    engagementRate: 6.9,
    avgLikes: 20280,
    shortBio:
      'Visual storyteller capturing mountain architecture, street food culture, and creator camera kits.',
    fullBio:
      'Lucas blends documentary photography with fast-paced vertical storytelling across Latin America and Europe. Brands rely on his color-graded reels for high organic share rates.',
    avatar: lucasImg,
    coverImage: lifestyleCoverImg,
    budgetRange: '$2,400 – $4,600',
    budgetMin: 2400,
    budgetMax: 4600,
    collaborationInterests: [
      'Vertical Travel Reels',
      'Camera & Audio Field Test',
      'Culinary Tourism Guide',
      'Creator Residency Coverage',
    ],
    pastPartners: ['Fujifilm', 'Airbnb', 'DJI', 'Patagonia'],
    responseTime: 'Within 10 hours',
    demographics: {
      primaryAge: '18–24',
      ageBreakdown: [
        { label: '18–24', percentage: 38 },
        { label: '25–34', percentage: 44 },
        { label: '35–44', percentage: 14 },
        { label: '45+', percentage: 4 },
      ],
      genderSplit: { female: 51, male: 47, other: 2 },
      topRegions: [
        { country: 'Brazil', percentage: 39 },
        { country: 'United States', percentage: 27 },
        { country: 'Spain', percentage: 12 },
      ],
    },
    portfolio: [
      {
        id: 'p15',
        title: 'Golden Hour Architecture in Minas Gerais',
        brand: 'Fujifilm',
        format: 'TikTok + IG Reels',
        views: '680K views',
        engagement: '7.3%',
        summary: '42,000 shares and featured in global X-Series gallery.',
        image: lifestyleCoverImg,
      },
    ],
    socialLinks: [
      { platform: 'TikTok', handle: '@lucasframes', url: 'https://tiktok.com' },
      { platform: 'Instagram', handle: '@lucasframes', url: 'https://instagram.com' },
    ],
  },
];
