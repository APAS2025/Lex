export interface DocumentationItem {
  id: string;
  title: string;
  type: 'Cut Sheet' | 'Specification' | 'Drawing' | 'Collateral';
  url: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
}

export interface Webinar {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  url: string;
  isLive: boolean;
}

export interface Vendor {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  email: string;
  phone: string;
  website?: string;
  documentation: DocumentationItem[];
  articles: Article[];
  videos: Video[];
  webinars: Webinar[];
  isClaimed: boolean;
}

export interface ImpactMetric {
  name: string;
  value: string;
  description:string;
}

export interface ResilienceMapping {
  data: string;
  systems: string;
  finance: string;
}

export interface LexiconTerm {
  id: string;
  term: string;
  category: string;
  plainLanguageDefinition: string;
  technicalDefinition: string;
  regulatoryReferences: string[];
  designAndOMNotes: string;
  risksAndFailureModes: string[];
  useCases: string[];
  linkedVendorIds: string[];
  impactMetrics: ImpactMetric[];
  resilienceMapping: ResilienceMapping;
  isPremium: boolean;
  caseStudiesCount: number;
  demoVideoUrl?: string;
  handbookUrl?: string;
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string; // ISO string
  replies: Comment[];
  likes: number;
}

export interface DroobiVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  category: string;
  durationMinutes: number;
  airDate: string; // ISO string
  source?: 'AI News' | 'Partner';
  series?: {
    title: string;
    episode: number;
  };
  comments: Comment[];
}

export interface Playlist {
  id: string;
  name: string;
  videoIds: string[];
}

export interface AIRecommendation {
  title: string;
  recommendedVideoIds: string[];
}