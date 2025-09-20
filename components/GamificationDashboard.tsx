import React from 'react';
import { userProgress } from '../data/userProgress';
import { ClipboardCheckIcon, FireIcon } from './Icons';

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="w-full bg-slate-700/50 rounded-full h-2.5 ring-1 ring-inset ring-slate-600 overflow-hidden">
        <div 
            className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
    </div>
);

const ChallengeCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    progressText: string;
    progressPercentage: number;
    isStreak?: boolean;
}> = ({ icon, title, description, progressText, progressPercentage, isStreak = false }) => (
    <div className={`bg-slate-800/50 rounded-xl p-5 ${isStreak ? 'ring-2 ring-orange-500/50 shadow-lg shadow-orange-500/10' : 'ring-1 ring-white/10'}`}>
        <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${isStreak ? 'bg-orange-500/20' : 'bg-slate-700/50'}`}>
                {icon}
            </div>
            <div>
                <h4 className="font-bold text-slate-100">{title}</h4>
                <p className="text-sm text-slate-400">{description}</p>
            </div>
        </div>
        <div className="mt-4">
            <div className="flex justify-between items-center text-sm font-semibold mb-1">
                <span className="text-slate-300">Progress</span>
                <span className={isStreak ? 'text-orange-300' : 'text-slate-200'}>{progressText}</span>
            </div>
            <ProgressBar progress={progressPercentage} />
        </div>
    </div>
);


const GamificationDashboard: React.FC = () => {
    const dailyGoal = 5;
    const weeklyGoal = 1;

    const dailyProgress = (userProgress.dailyFlips / dailyGoal) * 100;
    const weeklyProgress = (userProgress.decksMastered / weeklyGoal) * 100;

    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-100 mb-4 px-4 sm:px-0">Your Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ChallengeCard
                    icon={<ClipboardCheckIcon className="h-6 w-6 text-blue-400" />}
                    title="Daily Challenge"
                    description="Flip 5 cards today"
                    progressText={`${userProgress.dailyFlips} / ${dailyGoal}`}
                    progressPercentage={dailyProgress}
                />
                 <ChallengeCard
                    icon={<ClipboardCheckIcon className="h-6 w-6 text-blue-400" />}
                    title="Weekly Challenge"
                    description="Master a full deck"
                    progressText={`${userProgress.decksMastered} / ${weeklyGoal}`}
                    progressPercentage={weeklyProgress}
                />
                 <ChallengeCard
                    icon={<FireIcon className="h-6 w-6 text-orange-400" />}
                    title="Learning Streak"
                    description="Study every day to grow your streak"
                    progressText={`${userProgress.currentStreak} Days`}
                    progressPercentage={100}
                    isStreak
                />
            </div>
        </section>
    );
};

export default GamificationDashboard;
