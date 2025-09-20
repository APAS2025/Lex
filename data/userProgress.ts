export interface UserProgress {
  dailyFlips: number;
  decksMastered: number;
  currentStreak: number;
}

// Mock data representing the current user's progress.
// In a real app, this would come from a backend.
export const userProgress: UserProgress = {
  dailyFlips: 3,
  decksMastered: 0,
  currentStreak: 8,
};
