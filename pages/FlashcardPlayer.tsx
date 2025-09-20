import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { flashcardDecks, flashcards, vendors } from '../data/mockData';
import { ChevronLeftIcon, ChevronRightIcon, ArrowUturnUpIcon, XIcon, PlayIcon, FireIcon, BookmarkSlashIcon, SpeakerWaveIcon, SpeakerXMarkIcon, SparklesIcon } from '../components/Icons';
import type { Vendor, LexiconCategory } from '../types';
import VideoPlayer from '../components/VideoPlayer';
import { getCategoryLabel } from '../utils/categoryUtils';
import AICoachModal from '../components/AICoachModal';

const VideoModal: React.FC<{ isOpen: boolean; onClose: () => void; videoUrl: string; poster: string; title: string; }> = ({ isOpen, onClose, videoUrl, poster, title }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-opacity"
            onClick={onClose}
        >
            <div 
                className="bg-slate-900 rounded-xl ring-1 ring-white/10 w-full max-w-4xl relative shadow-2xl shadow-blue-500/10"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 flex justify-between items-center border-b border-slate-700/50">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-4">
                    <VideoPlayer src={videoUrl} poster={poster} />
                </div>
            </div>
        </div>
    );
};


const FlashcardPlayer: React.FC = () => {
    const { deckId } = useParams<{ deckId: string }>();
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [isCoachOpen, setIsCoachOpen] = useState(false);
    const [activeVideoUrl, setActiveVideoUrl] = useState('');
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);

    // Swipe gesture states
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchStartY, setTouchStartY] = useState<number | null>(null);
    
    const deck = useMemo(() => flashcardDecks.find(d => d.id === deckId), [deckId]);
    const cardsInDeck = useMemo(() => {
        if (!deck) return [];
        return flashcards.filter(c => c.deck_id === deckId);
    }, [deck]);

    const currentCard = cardsInDeck[currentCardIndex];
    const vendor = useMemo<Vendor | undefined>(() => {
        if (!deck?.vendor_ids || deck.vendor_ids.length === 0) return undefined;
        return vendors.find(v => v.id === deck.vendor_ids![0]);
    }, [deck]);
    
    useEffect(() => {
        setIsFlipped(false);
        window.speechSynthesis.cancel();
    }, [currentCardIndex]);

    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
            setIsPlayingAudio(false);
        };
    }, []);

    const handleNext = () => {
        if (currentCardIndex < cardsInDeck.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(currentCardIndex - 1);
        }
    };

    const handleSave = () => {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 1500);
    };

    const handlePlayVideo = (videoUrl: string) => {
        setActiveVideoUrl(videoUrl);
        setIsVideoModalOpen(true);
    };

    const handleListen = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();

        if (!currentCard) return;

        if (isPlayingAudio) {
            window.speechSynthesis.cancel();
            setIsPlayingAudio(false);
            return;
        }
        
        const frontText = `${getCategoryLabel(currentCard.category_id)}. ${currentCard.front.content}`;
        const backText = `${currentCard.back.content}. ${currentCard.back.bullets?.join('. ') || ''}`;

        const textToRead = isFlipped ? backText : frontText;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        
        utterance.onstart = () => setIsPlayingAudio(true);
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
            console.error('SpeechSynthesisUtterance.onerror:', event.error);
            setIsPlayingAudio(false);
        };

        window.speechSynthesis.speak(utterance);
    }, [isFlipped, currentCard, isPlayingAudio]);
    
    // Swipe gesture handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.targetTouches[0].clientX);
        setTouchStartY(e.targetTouches[0].clientY);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX === null || touchStartY === null) {
            return;
        }

        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        
        const swipeThreshold = 50; // Minimum distance for a swipe

        // Determine if it's a horizontal or vertical swipe
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal swipe
            if (Math.abs(diffX) > swipeThreshold) {
                if (diffX > 0) {
                    handlePrev(); // Swipe right
                } else {
                    handleNext(); // Swipe left
                }
            }
        } else {
            // Vertical swipe
            if (diffY > swipeThreshold) { // Only checking for swipe down
                handleSave();
            }
        }

        // Reset touch coordinates
        setTouchStartX(null);
        setTouchStartY(null);
    };

    if (!deck || !currentCard) {
        return (
            <div className="text-center container mx-auto">
                <h2 className="text-2xl font-bold">Deck not found</h2>
                <Link to="/academy" className="text-blue-400 hover:underline mt-4">Back to Academy</Link>
            </div>
        );
    }
    
    const progressPercentage = ((currentCardIndex + 1) / cardsInDeck.length) * 100;

    return (
        <div className="fixed inset-0 bg-[#0F172A] z-50 flex flex-col p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto flex flex-col items-center justify-center flex-grow">
                <div className="w-full max-w-3xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-slate-200">{deck.title}</h2>
                        <Link to="/academy" className="text-slate-400 hover:text-white">
                            <XIcon className="h-6 w-6" />
                        </Link>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-700/50 rounded-full h-2.5 mb-2">
                        <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                    <p className="text-sm text-slate-400 text-center mb-4">{currentCardIndex + 1} / {cardsInDeck.length}</p>
                    
                    {/* Gamification UI */}
                    <div className="flex justify-center items-center space-x-6 text-sm font-semibold text-slate-300 mb-4">
                        <div className="flex items-center space-x-1.5">
                            <FireIcon className="h-5 w-5 text-orange-400" />
                            <span>12 Day Streak</span>
                        </div>
                         <div className="h-4 w-px bg-slate-600"></div>
                        <div className="flex items-center space-x-1.5">
                            <span>Mastery: 75%</span>
                        </div>
                    </div>

                    {/* Flashcard */}
                    <div 
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        className="aspect-video w-full perspective-1000" 
                    >
                        <div 
                            onClick={() => setIsFlipped(!isFlipped)}
                            className={`relative w-full h-full transition-transform duration-500 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
                        >
                            {/* Front */}
                            <div className="absolute w-full h-full backface-hidden bg-slate-800 rounded-2xl ring-1 ring-white/10 flex flex-col items-center justify-center p-8 text-center">
                                <p className="text-lg font-semibold text-blue-400">{getCategoryLabel(currentCard.category_id)}</p>
                                <h3 className="text-4xl font-extrabold text-white mt-2">{currentCard.front.content}</h3>
                            </div>
                            {/* Back */}
                            <div className="absolute w-full h-full backface-hidden bg-slate-800 rounded-2xl ring-1 ring-white/10 p-8 rotate-y-180 flex flex-col justify-center overflow-y-auto">
                               {currentCard.media.image_url && <img src={currentCard.media.image_url} alt="" className="max-h-24 w-auto mx-auto mb-4 rounded-lg" />}
                                <p className="text-lg md:text-xl text-slate-300 text-center">{currentCard.back.content}</p>
                                {currentCard.back.bullets && (
                                    <ul className="text-slate-400 list-disc list-inside mt-4 space-y-1 text-center">
                                        {currentCard.back.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
                                    </ul>
                                )}
                                {vendor && (
                                    <Link to={`/vendor/${vendor.id}`} onClick={e => e.stopPropagation()} className="group mt-4 mx-auto flex items-center space-x-3 bg-slate-900/50 p-2 rounded-lg ring-1 ring-slate-700 hover:ring-blue-500 transition-all max-w-xs">
                                        <img src={vendor.logoUrl} alt={vendor.name} className="h-10 w-10 bg-white rounded-md object-contain p-1" />
                                        <div>
                                            <p className="text-xs text-slate-400">Related Vendor</p>
                                            <p className="font-semibold text-slate-200 group-hover:text-blue-400">{vendor.name}</p>
                                        </div>
                                    </Link>
                                )}
                                {currentCard.back.video_url && (
                                     <div className="mt-4 max-w-xs mx-auto w-full">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">Micro-Lesson</h4>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handlePlayVideo(currentCard.back.video_url!); }} 
                                            className="block w-full relative aspect-video rounded-lg overflow-hidden group bg-slate-900"
                                        >
                                            <img src={`https://picsum.photos/seed/${currentCard.id}/400/225`} alt="Video thumbnail" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                <PlayIcon className="h-12 w-12 text-white/80"/>
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                     {/* Saved Feedback Overlay */}
                    <div className={`absolute inset-0 bg-slate-900/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center text-white transition-opacity duration-300 ${isSaved ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <BookmarkSlashIcon className="h-16 w-16" />
                        <p className="text-2xl font-bold mt-4">Saved for later</p>
                    </div>

                    <div className="flex justify-center items-center mt-4 space-x-4">
                        <button onClick={handleListen} className={`flex items-center space-x-2 px-4 py-2 font-semibold rounded-lg transition ${isPlayingAudio ? 'text-blue-400 bg-blue-900/50' : 'text-slate-300 hover:bg-slate-700/50'}`}>
                           {isPlayingAudio ? <SpeakerXMarkIcon className="h-5 w-5" /> : <SpeakerWaveIcon className="h-5 w-5" />}
                           <span>{isPlayingAudio ? 'Stop' : 'Listen'}</span>
                        </button>
                        <button onClick={() => setIsFlipped(!isFlipped)} className="flex items-center space-x-2 px-4 py-2 text-slate-300 font-semibold hover:bg-slate-700/50 rounded-lg transition">
                            <ArrowUturnUpIcon className="h-5 w-5" />
                            <span>Flip Card</span>
                        </button>
                        <button 
                            onClick={() => setIsCoachOpen(true)}
                            className="flex items-center space-x-2 px-4 py-2 text-purple-300 font-semibold bg-purple-900/50 hover:bg-purple-900/80 rounded-lg transition"
                        >
                            <SparklesIcon className="h-5 w-5" />
                            <span>AI Coach</span>
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <div className="mt-auto pt-6 flex items-center justify-between w-full max-w-4xl">
                    <button 
                        onClick={handlePrev} 
                        disabled={currentCardIndex === 0}
                        className="flex items-center space-x-2 px-6 py-3 bg-slate-800 text-white font-bold rounded-lg shadow-md hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        <ChevronLeftIcon className="h-6 w-6" />
                        <span>Prev</span>
                    </button>
                    <button 
                        onClick={handleNext}
                        disabled={currentCardIndex === cardsInDeck.length - 1}
                        className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        <span>Next</span>
                        <ChevronRightIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {currentCard.back.video_url && (
                <VideoModal
                    isOpen={isVideoModalOpen}
                    onClose={() => setIsVideoModalOpen(false)}
                    videoUrl={activeVideoUrl}
                    poster={`https://picsum.photos/seed/${currentCard.id}/600/400`}
                    title={`Micro-Lesson: ${currentCard.front.content}`}
                />
            )}

            <AICoachModal
                isOpen={isCoachOpen}
                onClose={() => setIsCoachOpen(false)}
                card={currentCard}
            />
        </div>
    );
};

export default FlashcardPlayer;
