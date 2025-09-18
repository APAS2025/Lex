
import React from 'react';
import { Link } from 'react-router-dom';
import type { LexiconTerm } from '../types';
import { ArrowRightIcon, BriefcaseIcon } from './Icons';
import PremiumBadge from './PremiumBadge';

interface TermCardProps {
  term: LexiconTerm;
}

const TermCard: React.FC<TermCardProps> = ({ term }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 hover:ring-blue-500 transition-all duration-300 overflow-hidden group flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors duration-300">{term.term}</h3>
          {term.isPremium && <PremiumBadge />}
        </div>
         <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-blue-400">{term.category}</p>
        <p className="mt-2 text-slate-400 line-clamp-3">
          {term.plainLanguageDefinition}
        </p>
      </div>
      
      <div className="px-6 pb-4 mt-auto">
        <div className="flex items-center space-x-4 text-sm text-slate-400">
            <div className="flex items-center space-x-1.5">
                <BriefcaseIcon className="h-4 w-4" />
                <span>{term.linkedVendorIds.length} Vendor{term.linkedVendorIds.length !== 1 && 's'}</span>
            </div>
        </div>
      </div>

      <Link to={`/term/${term.id}`} className="block bg-slate-900/50 group-hover:bg-blue-900/20 transition-colors duration-300 px-6 py-4">
        <div className="flex justify-between items-center text-blue-400 font-semibold">
          <span>View Details</span>
          <ArrowRightIcon className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </Link>
    </div>
  );
};

export default TermCard;