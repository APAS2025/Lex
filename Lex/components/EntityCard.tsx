
import { Link } from 'react-router-dom';
import type { EcosystemEntity, EntityType } from '../types';
import { ArrowRightIcon, CheckBadgeIcon } from './Icons';

interface EntityCardProps {
  entity: EcosystemEntity;
}

const getTypeClasses = (type: EntityType) => {
    switch(type) {
      case 'Vendor':
        return 'bg-green-900/50 text-green-300 ring-green-500/30';
      case 'Consultant':
        return 'bg-purple-900/50 text-purple-300 ring-purple-500/30';
      case 'Government':
        return 'bg-blue-900/50 text-blue-300 ring-blue-500/30';
      case 'Academia':
        return 'bg-amber-900/50 text-amber-300 ring-amber-500/30';
      case 'Non-Profit':
        return 'bg-cyan-900/50 text-cyan-300 ring-cyan-500/30';
      default:
        return 'bg-slate-700 text-slate-300 ring-slate-600';
    }
}

const EntityCard = ({ entity }: EntityCardProps) => {
  return (
    <div className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 hover:ring-blue-500 transition-all duration-300 overflow-hidden group flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4 mb-4">
                <img
                    src={entity.logoUrl}
                    alt={`${entity.name} logo`}
                    className="h-16 w-16 rounded-lg object-contain bg-white p-1 shrink-0"
                />
                <div>
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors duration-300">{entity.name}</h3>
                    <p className="text-sm text-slate-400">{entity.location}</p>
                </div>
            </div>
            {entity.isClaimed && (
                 <div title="Claimed Profile" className="flex items-center space-x-1 bg-green-600/20 text-green-300 text-xs font-semibold px-2.5 h-6 rounded-full ring-1 ring-inset ring-green-500/50 shrink-0">
                    <CheckBadgeIcon className="h-4 w-4" />
                    <span>Claimed</span>
                </div>
            )}
        </div>
        
        <p className="text-sm text-slate-400 line-clamp-3 mb-4">
          {entity.tagline}
        </p>
      </div>
      
      <div className="px-6 pb-4 mt-auto">
        <span className={`text-xs font-bold px-3 py-1 rounded-full ring-1 ring-inset ${getTypeClasses(entity.type)}`}>
            {entity.type}
        </span>
      </div>

      <Link to={`/ecosystem/${entity.id}`} className="block bg-slate-900/50 group-hover:bg-blue-900/20 transition-colors duration-300 px-6 py-4">
        <div className="flex justify-between items-center text-blue-400 font-semibold">
          <span>View Profile</span>
          <ArrowRightIcon className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </Link>
    </div>
  );
};

export default EntityCard;
