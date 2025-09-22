import { PROFESSIONAL_TIERS, BADGES } from '../data';
import type { ProfessionalTier, Badge } from '../types';

export const getTierById = (tierId: string): ProfessionalTier | undefined => {
  return PROFESSIONAL_TIERS.find(t => t.id === tierId);
};

export const getBadgeById = (badgeId: string): Badge | undefined => {
  return BADGES.find(b => b.id === badgeId);
};

export const getTierForXp = (xp: number): ProfessionalTier => {
  // Tiers are sorted by minXp, so we can reverse and find the first match.
  return [...PROFESSIONAL_TIERS].reverse().find(tier => xp >= tier.minXp) || PROFESSIONAL_TIERS[0];
};
