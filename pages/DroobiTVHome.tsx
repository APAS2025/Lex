import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { droobiVideos, videoCategories } from '../data/mockData';
import type { DroobiVideo, Playlist, AIRecommendation } from '../types';
import VideoCard from '../components/VideoCard';
import Loader from '../components/Loader';
import { getAIRecommendations, performAISearch } from '../services/geminiService';
import { PlayIcon, ClockIcon, SparklesIcon, SearchIcon, XIcon, NewspaperIcon, StarIcon } from '../components/Icons';

const VideoCategoryRow: React.FC<{ category: string; videos: DroobiVideo[]; icon?: React.ReactNode }> = ({ category, videos, icon }) => {
    if (videos.length === 0) return null;

    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-100 mb-4 px-4 sm:px-0 flex items-center">
                {icon}
                {category}
            </h2>
            <div className="flex overflow-x-auto space-x-4 lg:space-x-6 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                {videos.map(video => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </section>
    );
};

interface DroobiTVHomeProps {
    watchHistoryIds: string[];
    playlists: Playlist[];
}

const DroobiTVHome: React.FC<DroobiTVHomeProps> = ({ watchHistoryIds, playlists }) => {
    const heroVideo = droobiVideos[0];

    const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation | null>(null);
    const [isLoadingAI, setIsLoadingAI] = useState(true);
    const [aiError, setAiError] = useState<string | null>(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<DroobiVideo[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const watchHistoryVideos = useMemo(() => 
        watchHistoryIds.map(id => droobiVideos.find(v => v.id === id)).filter((v): v is DroobiVideo => !!v),
        [watchHistoryIds]
    );

     const newsVideos = useMemo(() =>
        droobiVideos.filter(v => v.source === 'AI News'),
        []
    );

    const partnerVideos = useMemo(() =>
        droobiVideos.filter(v => v.source === 'Partner'),
        []
    );

    const regularVideoCategories = useMemo(() =>
        videoCategories.filter(cat => cat !== 'News'),
        []
    );


    useEffect(() => {
        const fetchRecommendations = async () => {
            setIsLoadingAI(true);
            setAiError(null);
            try {
                const fullWatchHistory = watchHistoryIds
                    .map(id => droobiVideos.find(v => v.id === id))
                    .filter((v): v is DroobiVideo => !!v);
                
                const recommendations = await getAIRecommendations(fullWatchHistory, playlists, droobiVideos);
                setAiRecommendations(recommendations);
            } catch (err) {
                setAiError(err instanceof Error ? err.message : 'Failed to load recommendations.');
                console.error(err);
            } finally {
                setIsLoadingAI(false);
            }
        };

        fetchRecommendations();
    }, [watchHistoryIds, playlists]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            clearSearch();
            return;
        }

        setIsSearching(true);
        setSearchError(null);
        setHasSearched(true);
        try {
            const resultIds = await performAISearch(searchQuery, droobiVideos);
            const results = resultIds
                .map(id => droobiVideos.find(v => v.id === id))
                .filter((v): v is DroobiVideo => !!v);
            setSearchResults(results);
        } catch (err) {
            setSearchError(err instanceof Error ? err.message : 'An unknown error occurred during search.');
        } finally {
            setIsSearching(false);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
        setHasSearched(false);
        setSearchError(null);
    };

    const aiRecommendedVideos = useMemo(() => {
        if (!aiRecommendations) return [];
        return aiRecommendations.recommendedVideoIds
            .map(id => droobiVideos.find(v => v.id === id))
            .filter((v): v is DroobiVideo => !!v);
    }, [aiRecommendations]);

    return (
        <div className="container mx-auto">
            {/* Hero Section */}
            {!hasSearched && heroVideo && (
                 <section className="mb-12 rounded-2xl overflow-hidden ring-1 ring-white/10 relative h-[60vh] flex items-end p-8 bg-cover bg-center" style={{ backgroundImage: `url(${heroVideo.thumbnailUrl})` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
                    <div className="relative z-10 max-w-2xl">
                        {heroVideo.series && (
                            <p className="text-lg font-bold text-blue-400">{heroVideo.series.title}: Episode {heroVideo.series.episode}</p>
                        )}
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-4">{heroVideo.title}</h1>
                        <p className="text-slate-300 line-clamp-3 mb-6">{heroVideo.description}</p>
                        <Link 
                            to={`/video/${heroVideo.id}`}
                            className="inline-flex items-center px-8 py-3 bg-white text-slate-900 font-bold rounded-lg shadow-lg hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-white transition text-lg"
                        >
                            <PlayIcon className="h-6 w-6 mr-2"/>
                            Watch Now
                        </Link>
                    </div>
                </section>
            )}
            
            {/* Search Section */}
            <section className="mb-12">
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Ask anything... e.g., 'how to protect cities from flooding?'"
                        className="w-full pl-12 pr-12 py-4 bg-slate-800/50 rounded-xl ring-1 ring-white/10 text-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400 pointer-events-none" />
                    {searchQuery && (
                        <button type="button" onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text