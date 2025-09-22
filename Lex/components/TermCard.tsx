
import { Link } from 'react-router-dom';
import type { LexiconTerm } from '../types';
import { ArrowRightIcon } from './Icons';

interface TermCardProps {
  term: LexiconTerm;
}

const TermCard = ({ term }: TermCardProps) => {
  // FIX: Expanded categoryMap to include all categories from the LexiconCategory type.
  const categoryMap: Record<LexiconTerm['category'], string> = {
    data: 'Data',
    asset_mgmt: 'Asset Management',
    climate_impacts: 'Climate Impacts',
    resiliency: 'Resiliency',
    regulations: 'Regulations',
    governance: 'Governance',
    modeling: 'Modeling',
    operations: 'Operations',
    ai_blockchain: 'AI & Blockchain',
  };
  
  return (
    <div className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 hover:ring-blue-500 transition-all duration-300 overflow-hidden group flex flex-col">
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors duration-300">{term.term}</h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-blue-400">{categoryMap[term.category]}</p>
        <p className="mt-2 text-slate-400 line-clamp-3">
          {term.plainLanguageDefinition}
        </p>
      </div>

      <Link to={`/term/${term.id}`} className="block bg-slate-900/50 group-hover:bg-blue-900/20 transition-colors duration-300 px-6 py-4 mt-auto">
        <div className="flex justify-between items-center text-blue-400 font-semibold">
          <span>View Details</span>
          <ArrowRightIcon className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </Link>
    </div>
  );
};

export default TermCard;
