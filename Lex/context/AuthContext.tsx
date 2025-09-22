
import { createContext, useState, useContext, useMemo, useCallback, type ReactNode } from 'react';
import type { 
    User, LexiconTerm, Vendor, DroobiVideo, Session, OnDemandSession, Manual, 
    FlashcardDeck, Flashcard, LearningPathway, OneWaterMinute, EcosystemEntity 
} from '../types';
import { 
    users, currentUser as defaultUser, initialTerms, vendors as initialVendors, 
    droobiVideos as initialDroobiVideos, droobiSessions as initialDroobiSessions,
    onDemandSessions as initialOnDemandSessions, manuals as initialManuals,
    flashcardDecks as initialFlashcardDecks, flashcards as initialFlashcards,
    learningPathways as initialLearningPathways, oneWaterMinute as initialOneWaterMinute,
    ecosystemEntities as initialEcosystemEntities
} from '../data';


interface AuthContextType {
  currentUser: User;
  login: (userId: string) => void;
  logout: () => void;
  getUserById: (userId: string) => User | undefined;
  terms: LexiconTerm[];
  vendors: Vendor[];
  droobiVideos: DroobiVideo[];
  droobiSessions: Session[];
  onDemandSessions: OnDemandSession[];
  manuals: Manual[];
  flashcardDecks: FlashcardDeck[];
  flashcards: Flashcard[];
  learningPathways: LearningPathway[];
  oneWaterMinute: OneWaterMinute;
  ecosystemEntities: EcosystemEntity[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);
  
  // All app data is now managed by the context to prevent dependency cycles
  const [terms] = useState<LexiconTerm[]>(initialTerms);
  const [vendors] = useState<Vendor[]>(initialVendors);
  const [droobiVideos] = useState<DroobiVideo[]>(initialDroobiVideos);
  const [droobiSessions] = useState<Session[]>(initialDroobiSessions);
  const [onDemandSessions] = useState<OnDemandSession[]>(initialOnDemandSessions);
  const [manuals] = useState<Manual[]>(initialManuals);
  const [flashcardDecks] = useState<FlashcardDeck[]>(initialFlashcardDecks);
  const [flashcards] = useState<Flashcard[]>(initialFlashcards);
  const [learningPathways] = useState<LearningPathway[]>(initialLearningPathways);
  const [oneWaterMinute] = useState<OneWaterMinute>(initialOneWaterMinute);
  const [ecosystemEntities] = useState<EcosystemEntity[]>(initialEcosystemEntities);

  const login = (userId: string) => {
    const userToLogin = users.find(u => u.id === userId);
    if (userToLogin) {
      setCurrentUser(userToLogin);
    }
  };

  const logout = () => {
    setCurrentUser(defaultUser);
  };

  const getUserById = useCallback((userId: string): User | undefined => {
    return users.find(u => u.id === userId);
  }, []);

  const value = useMemo(() => ({
    currentUser,
    login,
    logout,
    getUserById,
    terms,
    vendors,
    droobiVideos,
    droobiSessions,
    onDemandSessions,
    manuals,
    flashcardDecks,
    flashcards,
    learningPathways,
    oneWaterMinute,
    ecosystemEntities,
  }), [currentUser, getUserById, terms, vendors, droobiVideos, droobiSessions, onDemandSessions, manuals, flashcardDecks, flashcards, learningPathways, oneWaterMinute, ecosystemEntities]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
