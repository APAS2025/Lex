import React from 'react';
import type { LexiconCategory } from '../types';
import { 
    CodeIcon, 
    BriefcaseIcon, 
    FireIcon, 
    ShieldCheckIcon, 
    DocumentTextIcon, 
    UsersIcon, 
    ChartBarIcon, 
    WrenchScrewdriverIcon, 
    BrainCircuitIcon 
} from '../components/Icons';

export const LEXICON_CATEGORY_MAP: Record<LexiconCategory, string> = {
  data: 'Data',
  asset_mgmt: 'Asset Management',
  climate_impacts: 'Climate Impacts',
  resiliency: 'Resiliency',
  regulations: 'Regulations',
  governance: 'Governance',
  modeling: 'Modeling',
  operations: 'Operations',
  ai_blockchain: 'AI & Blockchain',
};

export const LEXICON_CATEGORY_DETAILS: Record<LexiconCategory, { label: string; icon: React.FC<{className?: string}> }> = {
    data: { label: 'Data', icon: CodeIcon },
    asset_mgmt: { label: 'Asset Management', icon: BriefcaseIcon },
    climate_impacts: { label: 'Climate Impacts', icon: FireIcon },
    resiliency: { label: 'Resiliency', icon: ShieldCheckIcon },
    regulations: { label: 'Regulations', icon: DocumentTextIcon },
    governance: { label: 'Governance', icon: UsersIcon },
    modeling: { label: 'Modeling', icon: ChartBarIcon },
    operations: { label: 'Operations', icon: WrenchScrewdriverIcon },
    ai_blockchain: { label: 'AI & Blockchain', icon: BrainCircuitIcon },
};

export function getCategoryLabel(id: LexiconCategory): string {
  return LEXICON_CATEGORY_MAP[id] || 'General';
}

export function getCategoryDetails(id: LexiconCategory): { label: string; icon: React.FC<{className?: string}> } {
    return LEXICON_CATEGORY_DETAILS[id] || { label: 'General', icon: CodeIcon };
}
