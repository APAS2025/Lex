

// No longer need React import here.

// FIX: Updated LexiconCategory to match the full set of categories from the database schema.
export type LexiconCategory = 'data' | 'asset_mgmt' | 'climate_impacts' | 'resiliency' | 'regulations' | 'governance' | 'modeling' | 'operations' | 'ai_blockchain';

export type IconName =
  | 'AcademicCapIcon'
  | 'StarIcon'
  | 'SparklesIcon'
  | 'ShieldCheckIcon'
  | 'ChatBubbleLeftRightIcon'
  | 'DocumentTextIcon'
  | 'LightBulbIcon'
  | 'TrophyIcon'
  | 'FireIcon'
  | 'CodeIcon'
  | 'BriefcaseIcon'
  | 'UsersIcon'
  | 'ChartBarIcon'
  | 'WrenchScrewdriverIcon'
  | 'BrainCircuitIcon'
  | 'ArrowTrendingUpIcon'
  | 'ArrowTrendingDownIcon';

export type User = {
    id: string;
    name: string;
    avatarUrl: string;
    email: string;
    tierId: string;
    xp: number;
    stats: {
        commentsPosted: number;
        documentsUploaded: number;
        insightfulMarks: number;
    };
    badges: string[];
};

export type Vendor = {
    id: string;
    name: string;
    logoUrl: string;
    description: string;
    email?: string;
    phone?: string;
    website?: string;
    isClaimed?: boolean;
};

// FIX: Added optional comments property to allow associating comments with a term.
export type LexiconTerm = {
    id: string;
    term: string;
    category: LexiconCategory;
    plainLanguageDefinition: string;
    technicalDefinition: string;
    linkedVendorIds?: string[];
    comments?: TermComment[];
};

export type SeriesInfo = {
    title: string;
    episode?: number;
};

// FIX: Added optional series_info property to match database schema and usage.
export type DroobiVideo = {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;
    category: string;
    durationMinutes: number;
    airDate: string;
    series_info?: SeriesInfo | null;
};

export type Playlist = {
    id: string;
    name: string;
    user_id: string;
    videoIds: string[];
};

export type AIRecommendation = {
    title: string;
    recommendedVideoIds: string[];
};

export type ConversationEntry = {
    id: string;
    role: 'user' | 'gemini' | 'loading' | 'error';
    content: string;
    feedback?: 'up' | 'down';
};

export type Comment = {
    id: string;
    user: User;
    user_id: string;
    video_id: string;
    parent_comment_id?: string | null;
    text: string;
    timestamp: string;
    likes: number;
    replies: Comment[];
};

export type Speaker = {
    id: string;
    name: string;
    affiliation: string;
    avatarInitials: string;
};

export type Session = {
    id: string;
    title: string;
    speaker: Speaker;
    dateTime: string;
    durationMinutes?: number;
    registeredAttendees: number;
    attendees: number | null;
    description: string;
    category: string;
    tags?: string[];
    isLive: boolean;
    isPremium: boolean;
    joinUrl: string;
};

export type OnDemandSession = {
    id: string;
    title: string;
    author: string;
    views: number;
    rating: number;
    durationMinutes: number;
    watchUrl: string;
    downloadUrl: string;
};

export type ContactPerson = {
    id: string;
    name: string;
    title: string;
    email: string;
    avatarUrl: string;
};

export type TermComment = {
    id: string;
    user: User;
    text: string;
    timestamp: string;
    replies: TermComment[];
};

export type TermDocument = {
    id: string;
    fileName: string;
    fileType: string;
    fileSize: string;
    uploadedBy: User;
    timestamp: string;
    url: string;
};

export type ProfessionalTier = {
    id: string;
    name: string;
    minXp: number;
    icon: IconName;
};

export type Badge = {
    id: string;
    name: string;
    description: string;
    icon: IconName;
};

export type LexiconCategoryDetail = {
  label: string;
  icon: IconName;
};

export type Manual = {
    id: string;
    title: string;
    vendorId: string;
    assetType: 'Pump' | 'Sensor' | 'Hydrant' | 'Valve' | 'Filtration System';
    modelNumber: string;
    partNumber?: string;
    summary: string;
    coverImageUrl: string;
    fileUrl: string;
    uploadedAt: string;
};

export type Kpi = {
    id: string;
    objective: string;
    measurableOutcome: string;
    financialReturn: string;
    investment: string;
    icon: IconName;
};

export type Flashcard = {
    id: string;
    deck_id: string;
    category_id: LexiconCategory;
    front: {
        content: string;
    };
    back: {
        content: string;
        bullets?: string[];
        video_url?: string;
    };
    media: {
        image_url?: string;
    };
};

export type FlashcardDeck = {
    id: string;
    title: string;
    description: string;
    thumbnail_url: string;
    category_id: LexiconCategory;
    vendor_ids?: string[];
    sponsorship?: {
        sponsor_id: string;
    } | null;
};

export type LearningPathway = {
    id: string;
    title: string;
    description: string;
    thumbnail_url: string;
    steps: { deck_id: string }[];
    badge_id: string;
};

export type OneWaterMinute = {
    date: string;
    headline: string;
    card_id: string;
    rollup_deck_id: string;
};

export type EntityType = 'Vendor' | 'Consultant' | 'Government' | 'Academia' | 'Non-Profit';

export type EcosystemEntity = {
    id: string;
    name: string;
    logoUrl: string;
    type: EntityType;
    tagline: string;
    location: string;
    domain: string;
    isClaimed: boolean;
    claimedByUserId?: string;
};

export interface UserProgress {
  dailyFlips: number;
  decksMastered: number;
  currentStreak: number;
}
