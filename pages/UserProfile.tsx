import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
// Fix: Import PROFESSIONAL_TIERS from its source in gamificationData.ts instead of through utils.
import { getUserById, getTierById, getBadgeById } from '../utils/gamification';
import { PROFESSIONAL_TIERS } from '../data/gamificationData';
import type { User, ProfessionalTier, Badge } from '../types';
import { initialTerms } from '../data/mockData';
import { ChevronRightIcon, DocumentTextIcon, ChatBubbleLeftRightIcon, TrophyIcon } from '../components/Icons';

// --- Sub-components defined within the same file for simplicity ---

const ProfileHeader: React.FC<{ user: User, tier?: ProfessionalTier }> = ({ user, tier }) => (
    <div className="md:flex items-center space-x-0 md:space-x-8 text-center md:text-left">
        <img 
            src={user.avatarUrl} 
            alt={user.name}
            className="h-32 w-32 rounded-full ring-4 ring-slate-700/50 object-cover mx-auto md:mx-0"
        />
        <div className="mt-4 md:mt-0">
            <h1 className="text-4xl font-extrabold text-slate-100">{user.name}</h1>
            {tier && (
                <div className="mt-2 flex items-center justify-center md:justify-start space-x-2 bg-blue-900/50 text-blue-300 ring-blue-500/30 text-lg font-bold px-4 py-2 rounded-full ring-1 ring-inset inline-flex">
                    <tier.icon className="h-6 w-6" />
                    <span>{tier.name}</span>
                </div>
            )}
        </div>
    </div>
);

const XPProgressBar: React.FC<{ user: User, currentTier?: ProfessionalTier, nextTier?: ProfessionalTier }> = ({ user, currentTier, nextTier }) => {
    if (!currentTier) return null;

    const tierProgress = nextTier 
        ? Math.max(0, user.xp - currentTier.minXp) 
        : currentTier.minXp;
    
    const tierMax = nextTier 
        ? nextTier.minXp - currentTier.minXp 
        : currentTier.minXp;

    const progressPercentage = tierMax > 0 ? (tierProgress / tierMax) * 100 : 100;

    return (
        <div className="mt-6">
            <div className="flex justify-between items-center text-sm font-semibold mb-1">
                <span className="text-slate-400">{currentTier.name}</span>
                <span className="text-slate-200">{user.xp.toLocaleString()} XP</span>
                <span className="text-slate-400">{nextTier ? nextTier.name : 'Max Tier'}</span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-4 ring-1 ring-inset ring-slate-600 overflow-hidden">
                <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-4 rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
            <div className="text-center text-sm text-slate-400 mt-2">
                {nextTier ? 
                    `${(nextTier.minXp - user.xp).toLocaleString()} XP to the next tier` :
                    "You've reached the pinnacle of expertise!"
                }
            </div>
        </div>
    );
};

const StatsBlock: React.FC<{ user: User }> = ({ user }) => (
    <div className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 p-6">
        <h3 className="font-bold text-slate-100 text-lg mb-4">Statistics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-slate-900/50 p-4 rounded-lg">
                <p className="text-3xl font-bold text-blue-400">{user.stats.commentsPosted}</p>
                <p className="text-sm text-slate-400">Comments Posted</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-lg">
                <p className="text-3xl font-bold text-blue-400">{user.stats.documentsUploaded}</p>
                <p className="text-sm text-slate-400">Docs Uploaded</p>
            </div>
             <div className="bg-slate-900/50 p-4 rounded-lg">
                <p className="text-3xl font-bold text-blue-400">{user.stats.insightfulMarks}</p>
                <p className="text-sm text-slate-400">Insightful Marks</p>
            </div>
        </div>
    </div>
);

const BadgeCard: React.FC<{ badge: Badge }> = ({ badge }) => (
    <div className="group relative text-center flex flex-col items-center">
        <div className="relative w-20 h-20 rounded-full flex items-center justify-center ring-2 ring-slate-700/50 group-hover:ring-yellow-400 transition-all duration-300 transform group-hover:scale-110 overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900 shadow-lg shadow-black/30">
            {/* Shimmer effect */}
            <div className="absolute inset-0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <badge.icon className="h-10 w-10 text-yellow-400 z-10" />
        </div>
        <p className="text-sm font-semibold mt-2 text-slate-300">{badge.name}</p>
        
        {/* Tooltip */}
        <div className="absolute bottom-full mb-3 w-48 p-3 bg-slate-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 ring-1 ring-white/10">
            <p className="font-bold mb-1">{badge.name}</p>
            {badge.description}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900"></div>
        </div>
    </div>
);

const BadgeCase: React.FC<{ user: User }> = ({ user }) => (
    <div className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 p-6">
        <h3 className="font-bold text-slate-100 text-lg mb-6">Badge Showcase</h3>
        {user.badges.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
                {user.badges.map(badgeId => {
                    const badge = getBadgeById(badgeId);
                    return badge ? <BadgeCard key={badge.id} badge={badge} /> : null;
                })}
            </div>
        ) : (
            <div className="text-center text-slate-400 py-8">
                <TrophyIcon className="h-12 w-12 mx-auto text-slate-600 mb-2"/>
                <p>No badges earned yet. <br/> Start contributing to earn them!</p>
            </div>
        )}
    </div>
);

const ActivityFeed: React.FC<{ user: User }> = ({ user }) => {
    // For mock purposes, find all comments by this user
    const userComments = useMemo(() => {
        return initialTerms.flatMap(term => 
            (term.comments || [])
                .filter(c => c.user.id === user.id)
                .map(c => ({...c, termName: term.term, termId: term.id }))
        ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }, [user.id]);
    
    return (
        <div className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 p-6">
             <h3 className="font-bold text-slate-100 text-lg mb-4">Recent Activity</h3>
             <div className="space-y-4">
                {userComments.length > 0 ? userComments.slice(0, 5).map(comment => (
                     <Link to={`/term/${comment.termId}`} key={comment.id} className="block group">
                        <div className="flex items-start space-x-3">
                            <ChatBubbleLeftRightIcon className="h-5 w-5 mt-1 text-slate-500 shrink-0"/>
                            <div>
                                <p className="text-slate-300">
                                    Commented on <span className="font-bold text-blue-400 group-hover:underline">{comment.termName}</span>
                                </p>
                                <p className="text-sm text-slate-400 italic mt-1 border-l-2 border-slate-700 pl-2">"{comment.text}"</p>
                            </div>
                        </div>
                    </Link>
                )) : (
                     <div className="text-center text-slate-400 py-8">No recent activity.</div>
                )}
             </div>
        </div>
    );
};


const UserProfile: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();

    const user = useMemo(() => getUserById(userId || ''), [userId]);
    const currentTier = useMemo(() => user ? getTierById(user.tierId) : undefined, [user]);
    const nextTier = useMemo(() => {
        if (!currentTier) return undefined;
        const currentTierIndex = PROFESSIONAL_TIERS.findIndex(t => t.id === currentTier.id);
        return PROFESSIONAL_TIERS[currentTierIndex + 1] || undefined;
    }, [currentTier]);

    if (!user) {
        return (
            <div className="text-center container mx-auto">
                <h2 className="text-2xl font-bold text-slate-100">User not found</h2>
                <Link to="/" className="mt-4 inline-block text-blue-400 hover:underline">
                    Back to Lexicon
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <div className="bg-slate-900/50 rounded-2xl ring-1 ring-blue-500/30 p-8 mb-8 shadow-2xl shadow-blue-500/10">
                <ProfileHeader user={user} tier={currentTier} />
                <XPProgressBar user={user} currentTier={currentTier} nextTier={nextTier} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 space-y-8">
                    <StatsBlock user={user} />
                    <ActivityFeed user={user} />
                </div>
                <div className="lg:col-span-2 space-y-8">
                    <BadgeCase user={user} />
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
