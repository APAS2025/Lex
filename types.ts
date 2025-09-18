import type { Database } from './types/supabase';

// By deriving our application types from the auto-generated Supabase types,
// we ensure that our frontend code is always in sync with the database schema.
// The database is the single source of truth.

// Note: We use aliases here to avoid having to refactor every component
// that currently imports from this file. This is a clean way to adopt
// the new generated types.

export type PerformanceMetric = Database['public']['Tables']['performance_metrics']['Row'];
export type DocumentationItem = Database['public']['Tables']['documentation_items']['Row'];
export type Article = Database['public']['Tables']['articles']['Row'];
export type Video = Database['public']['Tables']['videos']['Row'];
export type Webinar = Database['public']['Tables']['webinars']['Row'];
export type ContactPerson = Database['public']['Tables']['contact_persons']['Row'];
export type Vendor = Database['public']['Tables']['vendors']['Row'] & {
    // Relationships can be explicitly typed for convenience
    documentation: DocumentationItem[];
    articles: Article[];
    videos: Video[];
    webinars: Webinar[];
    contacts?: ContactPerson[];
};
export type ImpactMetric = Database['public']['Tables']['impact_metrics']['Row'];
export type ResilienceMapping = Database['public']['Json']['resilience_mapping'];
export type LexiconTerm = Database['public']['Tables']['lexicon_terms']['Row'];

export type User = Database['public']['Tables']['users']['Row'];
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
