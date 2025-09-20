import React, { useMemo, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { flashcardDecks, flashcards, educationPathways } from '../data/mockData';
import type { FlashcardDeck, Flashcard, EducationPathway } from '../types';
import DeckCard from '../components/DeckCard';
import PathwayCard from '../components/PathwayCard';
import { BrainCircuitIcon, ChevronLeftIcon, ChevronRightIcon } from '../components/Icons';

const DeckCategoryRow: React.FC<{ title: string; decks: FlashcardDeck[] }> = ({ title, decks }) => {
    if (decks.length === 0) return null;
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-100 mb-4 px-4 sm:px-0">{title}</h2>
            <div className="flex overflow-x-auto space-x-4 lg:space-x-6 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                {decks.map(deck => (
                    <DeckCard key={deck.id} deck={deck} />
                ))}
            </div>
        </section>
    );
};

const PathwayCategoryRow: React.FC<{ title: string; pathways: EducationPathway[] }> = ({ title, pathways }) => {
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


const OneWaterMinuteSwiper: React.FC<{ cards: Flashcard[] }> = ({ cards }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const isSwiping = useRef(false);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchStartY, setTouchStartY] = useState(0);

    const goToPrev = () => {
        setActiveIndex(prev => (prev === 0 ? cards.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setActiveIndex(prev => (prev === cards.length - 1 ? 0 : prev + 1));
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.targetTouches[0].clientX);
        setTouchStartY(e.targetTouches[0].clientY);
        isSwiping.current = false;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!touchStartX || !touchStartY) return;
        const diffX = e.targetTouches[0].clientX - touchStartX;
        const diffY = e.targetTouches[0].clientY - touchStartY;
        if (Math.abs(diffX) > 10 && Math.abs(diffX) > Math.abs(diffY)) {
            isSwiping.current = true;
        }
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStartX || !touchStartY) return;
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                goToPrev();
            } else {
                goToNext();
            }
        }
        setTouchStartX(0);
        setTouchStartY(0);
    };

    const handleClick = (e: React.MouseEvent) => {
        if (isSwiping.current) {
            e.preventDefault();
            isSwiping.current = false;
        }
    };
    
    const activeCard = cards[activeIndex];
    if (!activeCard) return null;

    return (
        <div className="relative">
            <Link 
                to={`/term/${activeCard.termId}`} 
                className="block relative w-full aspect-video md:aspect-[2.4/1] lg:aspect-[3/1] rounded-2xl overflow-hidden group ring-1 ring-white/10 hover:ring-blue-500 transition-all duration-300 cursor-grab active:cursor-grabbing"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={handleClick}
            >
                <img 
                    src={activeCard.back.imageUrl} 
                    alt={activeCard.front.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent p-6 sm:p-8 flex flex-col justify-end">
                    <p className="text-lg font-bold text-blue-400">One Water Minute</p>
                    <h1 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight mt-2">{activeCard.front.title}</h1>
                    <p className="text-slate-300 line-clamp-2 mt-4 max-w-xl">{activeCard.back.definition}</p>
                </div>
            </Link>
            
            {/* Navigation */}
            <button onClick={goToPrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900/50 p-3 rounded-full text-white hover:bg-slate-800 transition-colors backdrop-blur-sm z-10" aria-label="Previous card">
                <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-900/50 p-3 rounded-full text-white hover:bg-slate-800 transition-colors backdrop-blur-sm z-10" aria-label="Next card">
                <ChevronRightIcon className="h-6 w-6" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {cards.map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => setActiveIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${activeIndex === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'}`}
                        aria-label={`Go to card ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};


const AcademyHome: React.FC = () => {
    const oneWaterMinuteCards = useMemo(() => {
        const deck = flashcardDecks.find(d => d.id === 'deck001');
        if (!deck) return [];
        return deck.cardIds.map(id => flashcards.find(c => c.id === id)).filter((c): c is Flashcard => !!c);
    }, []);
    
    const decksByCategory = useMemo(() => 
        flashcardDecks.filter(d => d.category === 'By Category' && d.id !== 'deck001'), 
    []);
    
    const vendorDecks = useMemo(() => 
        flashcardDecks.filter(d => d.category === 'Vendor Decks'), 
    []);
    
    const regulatoryDecks = useMemo(() => 
        flashcardDecks.filter(d => d.category === 'Regulatory & Compliance'), 
    []);

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

            {oneWaterMinuteCards.length > 0 && (
                 <section className="mb-12">
                    <OneWaterMinuteSwiper cards={oneWaterMinuteCards} />
                </section>
            )}

            <PathwayCategoryRow title="Deep Learning Pathways" pathways={educationPathways} />
            <DeckCategoryRow title="By Category" decks={decksByCategory} />
            <DeckCategoryRow title="Vendor Decks" decks={vendorDecks} />
            <DeckCategoryRow title="Regulatory & Compliance" decks={regulatoryDecks} />
        </div>
    );
};

export default AcademyHome;