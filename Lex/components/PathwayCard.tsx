
import { Link } from 'react-router-dom';
// FIX: Added missing type import
import type { LearningPathway } from '../types';
// FIX: Added missing icon imports
import { TrophyIcon, ClipboardListIcon } from './Icons';

const PathwayCard = ({ pathway }: { pathway: LearningPathway }) => {
    return (
        <Link 
            to={`/academy/pathway/${pathway.id}`} 
            className="block w-80 md:w-96 shrink-0 group relative overflow-hidden rounded-lg shadow-lg"
        >
            <div className="aspect-[4/3] bg-slate-800">
                <img 
                    src={pathway.thumbnail_url} 
                    alt={pathway.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-4">
                 <h3 className="text-white font-bold text-lg leading-tight">{pathway.title}</h3>
                 <p className="text-xs text-slate-300 mt-1 line-clamp-2">{pathway.description}</p>
                 <div className="flex items-center justify-between text-xs text-slate-200 mt-3 pt-2 border-t border-white/20">
                    <div className="flex items-center">
                        <ClipboardListIcon className="h-4 w-4 mr-1.5" />
                        <span>{pathway.steps.length} Decks</span>
                    </div>
                    <div className="flex items-center font-semibold text-yellow-300">
                        <TrophyIcon className="h-4 w-4 mr-1.5" />
                        <span>{pathway.badge_id}</span>
                    </div>
                 </div>
            </div>
        </Link>
    );
};

export default PathwayCard;
