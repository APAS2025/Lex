import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { flashcardDecks, flashcards, learningPathways, vendors, oneWaterMinute } from '../data/mockData';
import type { FlashcardDeck, LearningPathway, LexiconCategory } from '../types';
import DeckCard from '../components/DeckCard';
import PathwayCard from '../components/PathwayCard';
import GamificationDashboard from '../components/GamificationDashboard';
// FIX: Import DocumentTextIcon to resolve usage error.
import { BrainCircuitIcon, ChevronRightIcon, SparklesIcon, StarIcon, DocumentTextIcon } from '../components/Icons';
import { LEXICON_CATEGORY_DETAILS } from '../utils/categoryUtils';

const DeckCategoryRow: React.FC<{ title: string; decks: FlashcardDeck[]; icon?: React.ReactNode }> = ({ title, decks, icon }) => {
    if (decks.length === 0) return (
      <div className="text-center py-10 bg-slate-800/20 rounded-lg">
        <p className="text-slate-400">No decks available in this category yet.</p>
      </div>
    );

    const getCardCount = (deckId: string) => flashcards.filter(c => c.deck_id === deckId).length;

    return (
        <section className="mb-12">
            {title && (
              <h2 className="text-2xl font-bold text-slate-100 mb-4 px-4 sm:px-0 flex items-center">
                {icon && <span className="mr-3">{icon}</span>}
                {title}
              </h2>
            )}
            <div className="flex overflow-x-auto space-x-4 lg:space-x-6 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                {decks.map(deck => (
                    <DeckCard key={deck.id} deck={deck} cardCount={getCardCount(deck.id)} />
                ))}
            </div>
        </section>
    );
};

const PathwayCategoryRow: React.FC<{ title: string; pathways: LearningPathway[] }> = ({ title, pathways }) => {
    if (pathways.length === 0) return null;
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-100 mb-4 px-4 sm:px-0">{title}</h2>
            <div className="flex overflow-x-auto space-x-4 lg:space-x-6 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                {pathways.map(pathway => (
                    <PathwayCard key={pathway.id} pathway={pathway} />
                ))}
            </div>
        </section>
    );
};

const OneWaterMinuteHero: React.FC = () => {
    const dailyCard = useMemo(() => flashcards.find(c => c.id === oneWaterMinute.card_id), []);
    const dailyDeck = useMemo(() => flashcardDecks.find(d => d.id === oneWaterMinute.rollup_deck_id), []);

    const sponsor = useMemo(() => {
        if (!dailyDeck?.sponsorship) return null;
        return vendors.find(v => v.id === dailyDeck.sponsorship!.sponsor_id);
    }, [dailyDeck]);

    if (!dailyCard || !dailyDeck) return null;

    return (
        <section className="mb-12">
            <div className="flex justify-between items-center mb-4 px-4 sm:px-0">
                <h2 className="text-2xl font-bold text-slate-100 flex items-center">
                    <SparklesIcon className="h-6 w-6 mr-3 text-yellow-400" />
                    Today's One Water Minute
                </h2>
                {sponsor && (
                    <div className="flex items-center space-x-2 text-sm text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-lg ring-1 ring-white/10">
                        <img src={sponsor.logoUrl} alt={sponsor.name} className="h-5 w-5 rounded-full bg-white object-contain" />
                        <span>Sponsored by <span className="font-semibold text-slate-200">{sponsor.name}</span></span>
                    </div>
                )}
            </div>
            <div className="bg-gradient-to-br from-slate-900 to-blue-900/30 rounded-2xl ring-2 ring-blue-500/50 p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-blue-500/20">
                <div className="md:w-1/2">
                    <p className="font-semibold text-blue-300">Daily Topic</p>
                    <h3 className="text-3xl lg:text-4xl font-extrabold text-white mt-2">{oneWaterMinute.headline}</h3>
                    <p className="text-slate-300 mt-4 line-clamp-3">{dailyCard.back.content}</p>
                    <Link
                        to={`/academy/deck/${dailyDeck.id}`}
                        className="inline-flex items-center mt-6 px-6 py-3 bg-white text-slate-900 font-bold rounded-lg shadow-lg hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-white transition"
                    >
                        <span>Study the Full Deck</span>
                        <ChevronRightIcon className="h-5 w-5 ml-2" />
                    </Link>
                </div>
                <div className="w-full md:w-1/2">
                    <DeckCard deck={dailyDeck} cardCount={flashcards.filter(c => c.deck_id === dailyDeck.id).length} />
                </div>
            </div>
        </section>
    );
};

const AcademyHome: React.FC = () => {
    const vendorDecks = useMemo(() => 
        flashcardDecks.filter(d => d.vendor_ids && d.vendor_ids.length > 0), 
    []);
    
    const regulatoryDecks = useMemo(() => 
        flashcardDecks.filter(d => d.category_id === 'regulations'), 
    []);

    const categoryOrder = Object.keys(LEXICON_CATEGORY_DETAILS) as LexiconCategory[];
    const [activeCategory, setActiveCategory] = useState<LexiconCategory>(categoryOrder[0]);

    const decksForActiveCategory = useMemo(() => 
        flashcardDecks.filter(d => d.category_id === activeCategory),
        [activeCategory]
    );


    return (
        <div className="container mx-auto">
            <div className="text-center mb-12">
                 <BrainCircuitIcon className="h-16 w-16 mx-auto text-blue-400 mb-4" />
                <h2 className="text-4xl font-extrabold text-slate-100 sm:text-5xl md:text-6xl">
                    Lexicon Academy
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400">
                    Master the language of water with interactive flashcard decks, learning pathways, and credentials.
                </p>
            </div>

            <GamificationDashboard />
            
            <OneWaterMinuteHero />

            <PathwayCategoryRow title="Deep Learning Pathways" pathways={learningPathways} />

            <div className="mt-12 border-t-2 border-slate-700/50 pt-8">
                <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight mb-6 px-4 sm:px-0">
                    Browse by Category
                </h2>

                <div className="flex overflow-x-auto space-x-2 lg:space-x-3 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                    {categoryOrder.map(catId => {
                        const details = LEXICON_CATEGORY_DETAILS[catId];
                        const isActive = activeCategory === catId;
                        return (
                             <button
                                key={catId}
                                onClick={() => setActiveCategory(catId)}
                                className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 shrink-0 ${
                                    isActive 
                                    ? 'bg-blue-600 text-white ring-2 ring-blue-400 shadow-md shadow-blue-500/20' 
                                    : 'bg-slate-800/50 text-slate-300 ring-1 ring-white/10 hover:bg-slate-700/50 hover:text-blue-300'
                                }`}
                                aria-pressed={isActive}
                            >
                                <details.icon className="h-5 w-5" />
                                <span>{details.label}</span>
                            </button>
                        )
                    })}
                </div>

                <div className="mt-4 min-h-[220px]">
                    <DeckCategoryRow
                        title=""
                        decks={decksForActiveCategory}
                    />
                </div>
            </div>
            
            <div className="mt-12 border-t-2 border-slate-700/50 pt-8">
                <DeckCategoryRow 
                    title="Vendor Decks" 
                    decks={vendorDecks} 
                    icon={<StarIcon className="h-6 w-6 text-yellow-400" />}
                />
            </div>
            
            <div className="mt-12 border-t-2 border-slate-700/50 pt-8">
                <DeckCategoryRow 
                    title="Regulatory & Compliance" 
                    decks={regulatoryDecks}
                    icon={<DocumentTextIcon className="h-6 w-6 text-red-400" />}
                />
            </div>
        </div>
    );
};

export default AcademyHome;