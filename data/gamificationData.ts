import type { ProfessionalTier, Badge } from '../types';
import {
    AcademicCapIcon,
    StarIcon,
    SparklesIcon,
    ShieldCheckIcon,
    ChatBubbleLeftRightIcon,
    DocumentTextIcon,
    LightBulbIcon,
    TrophyIcon,
} from '../components/Icons';

export const PROFESSIONAL_TIERS: ProfessionalTier[] = [
    { id: 'T0', name: 'Associate', minXp: 0, icon: AcademicCapIcon },
    { id: 'T1', name: 'Technician', minXp: 250, icon: AcademicCapIcon },
    { id: 'T2', name: 'Specialist', minXp: 1000, icon: StarIcon },
    { id: 'T3', name: 'Senior Specialist', minXp: 5000, icon: StarIcon },
    { id: 'T4', name: 'Principal Expert', minXp: 15000, icon: ShieldCheckIcon },
    { id: 'T5', name: 'Sector Leader', minXp: 50000, icon: SparklesIcon },
    { id: 'T6', name: 'Infrastructure Maverick', minXp: 100000, icon: TrophyIcon },
];

export const BADGES: Badge[] = [
    {
        id: 'B01',
        name: 'First Drop',
        description: 'Posted your first comment and started a conversation.',
        icon: ChatBubbleLeftRightIcon,
    },
    {
        id: 'B02',
        name: 'Librarian',
        description: 'Contributed your first approved document to the community library.',
        icon: DocumentTextIcon,
    },
    {
        id: 'B03',
        name: 'Pioneer',
        description: 'Suggested a new term via AI that was added to the lexicon.',
        icon: LightBulbIcon,
    },
    {
        id: 'B04',
        name: 'Community Pillar',
        description: 'Received 10 "Insightful" marks on your comments from the community.',
        icon: ShieldCheckIcon,
    }
];
