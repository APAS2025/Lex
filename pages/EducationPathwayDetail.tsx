import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeftIcon, TrophyIcon } from '../components/Icons';
import { learningPathways } from '../data/mockData';

const EducationPathwayDetail: React.FC = () => {
    const { pathwayId } = useParams<{ pathwayId: string }>();
    const pathway = learningPathways.find(p => p.id === pathwayId);

    if (!pathway) {
        return (
            <div className="text-center container mx-auto">
                <h2 className="text-2xl font-bold">Education Pathway not found</h2>
                <Link to="/academy" className="text-blue-400 hover:underline mt-4">
                    <ChevronLeftIcon className="h-5 w-5 mr-1 inline" />
                    Back to Academy
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <Link to="/academy" className="inline-flex items-center mb-6 text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-200">
                <ChevronLeftIcon className="h-5 w-5 mr-1" />
                Back to Academy
            </Link>

            <div className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 p-8 text-center">
                <TrophyIcon className="h-16 w-16 mx-auto text-yellow-400 mb-4" />
                <h1 className="text-4xl font-extrabold text-white">{pathway.title}</h1>
                <p className="mt-4 text-xl text-slate-300 max-w-2xl mx-auto">{pathway.description}</p>
                 <div className="mt-6 inline-flex items-center space-x-2 bg-yellow-600/20 text-yellow-300 text-sm font-semibold px-4 py-2 rounded-full ring-1 ring-inset ring-yellow-500/50">
                    <TrophyIcon className="h-4 w-4" />
                    <span>Unlocks: {pathway.badge_id}</span>
                </div>
            </div>

            <div className="mt-12">
                 <h2 className="text-2xl font-bold text-slate-100 mb-6">Pathway Decks</h2>
                 <div className="text-center py-20 bg-slate-800/50 rounded-xl">
                    <h3 className="text-2xl font-bold text-slate-200">Coming Soon!</h3>
                    <p className="text-slate-400 mt-2">The full pathway experience with progress tracking is under construction.</p>
                </div>
            </div>

        </div>
    );
};

export default EducationPathwayDetail;
