import { PROFESSIONAL_TIERS, BADGES } from '../data/gamificationData';
import type { ProfessionalTier, Badge, User } from '../types';
import { users } from '../data/mockData';

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

export const getUserById = (userId: string): User | undefined => {
    return users.find(u => u.id === userId);
};
