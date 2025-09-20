import type { Database } from './types/supabase';

// By deriving our application types from the auto-generated Supabase types,
// we ensure that our frontend code is always in sync with the database schema.
// The database is the single source of truth.

// Note: We use aliases here to avoid having to refactor every component
// that currently imports from this file. This is a clean way to adopt
// the new generated types.

export type LexiconCategory = Database['public']['Tables']['lexicon_terms']['Row']['category'];
export type PerformanceMetric = Database['public']['Tables']['performance_metrics']['Row'];
export type DocumentationItem = Database['public']['Tables']['documentation_items']['Row'];
export type Article = Database['public']['Tables']['articles']['Row'];
export type Video = Database['public']['Tables']['videos']['Row'];
export type Webinar = Database['public']['Tables']['webinars']['Row'];
export type ContactPerson = Database['public']['Tables']['contact_persons']['Row'];

export type Kpi = {
  id: string;
  objective: string;
  measurableOutcome: string;
  financialReturn: string;
  investment: string;
  icon: React.FC<{className?: string}>;
};

export type Vendor = Database['public']['Tables']['vendors']['Row'] & {
    // Relationships can be explicitly typed for convenience
    documentation: DocumentationItem[];
    articles: Article[];
    videos: Video[];
    webinars: Webinar[];
    contacts?: ContactPerson[];
    isVerified: boolean;
    kpis?: Kpi[];
};
export type ImpactMetric = Database['public']['Tables']['impact_metrics']['Row'];
export type ResilienceMapping = Database['public']['Json']['resilience_mapping'];

// Gamification Types
export type ProfessionalTier = {
  id: string;
  name: string;
  minXp: number;
  icon: React.FC<{className?: string}>;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: React.FC<{className?: string}>;
};

export type GamificationStats = {
  commentsPosted: number;
  documentsUploaded: number;
  insightfulMarks: number;
};

export type User = Database['public']['Tables']['users']['Row'] & {
  email: string;
  xp: number;
  tierId: string;
  badges: string[];
  stats: GamificationStats;
};

export type TermComment = {
  id: string;
  user: User;
  text: string;
  timestamp: string;
  replies?: TermComment[];
};

export type TermDocument = {
  id: string;
  fileName: string;
  fileType: string; // e.g., 'PDF', 'Word'
  fileSize: string; // e.g., '2.5 MB'
  uploadedBy: User;
  timestamp: string;
  url: string; // download link
};

export type LexiconTerm = Database['public']['Tables']['lexicon_terms']['Row'] & {
    comments?: TermComment[];
    documents?: TermDocument[];
    userRating?: number;
};

export type Manual = {
  id: string;
  title: string;
  vendorId: string;
  modelNumber: string;
  partNumber?: string;
  assetType: 'Pump' | 'Sensor' | 'Hydrant' | 'Valve' | 'Filtration System';
  fileUrl: string; // URL to the PDF
  coverImageUrl: string;
  uploadedAt: string;
  summary: string;
};

export type ConversationEntry = {
  id: string;
  role: 'user' | 'gemini' | 'loading' | 'error';
  content: string;
  feedback?: 'up' | 'down';
};


export type Comment = Database['public']['Tables']['comments']['Row'] & {
    // Typing relationships for nested structures
    user: User;
    replies: Comment[];
};
export type DroobiVideo = Database['public']['Tables']['droobi_videos']['Row'] & {
     series?: {
        title: string;
        episode: number;
    };
    comments: Comment[];
};
export type Playlist = Database['public']['Tables']['playlists']['Row'];

// UI-specific types that don't live in the database can remain here.
export interface AIRecommendation {
  title: string;
  recommendedVideoIds: string[];
}

export type Speaker = Database['public']['Tables']['speakers']['Row'];
export type Session = Database['public']['Tables']['sessions']['Row'] & {
    speaker: Speaker;
};
export type OnDemandSession = Database['public']['Tables']['on_demand_sessions']['Row'];

// Lexicon Academy Types
export type Flashcard = {
  id: string;
  deck_id: string;
  category_id: LexiconCategory;
  front: {
    type: 'text';
    content: string;
  };
  back: {
    type: 'rich';
    content: string;
    bullets?: string[];
    related_terms?: string[];
    video_url?: string | null;
    vendor_link?: string | null;
  };
  difficulty: number;
  media: {
    image_url?: string | null;
    audio_url?: string | null;
  };
  reg_refs?: string[];
  source_doc_ids?: string[];
  status: 'active' | 'draft';
  created_at: number;
};

export type FlashcardDeck = {
  id: string;
  title: string;
  category_id: LexiconCategory;
  tags?: string[];
  description: string;
  estimated_minutes: number;
  vendor_ids?: string[];
  reg_refs?: string[];
  thumbnail_url: string;
  is_featured?: boolean;
  language: 'en';
  status: 'published' | 'draft';
  created_at: number;
  updated_at: number;
  sponsorship?: {
    sponsor_id: string;
    tagline?: string;
  };
};

export type LearningPathway = {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  steps: { deck_id: string }[];
  estimated_minutes: number;
  category_mix: LexiconCategory[];
  badge_id: string;
  status: 'published' | 'draft';
};

export type OneWaterMinute = {
  date_key: string;
  card_id: string;
  headline: string;
  rollup_deck_id: string;
};

export type UserProgress = {
  user_id: string;
  deck_id: string;
  card_id: string;
  last_seen: number;
  ease_factor: number;
  interval_days: number;
  repetitions: number;
  streak_days: number;
  mastery_percent: number;
};

// Ecosystem Directory Types
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