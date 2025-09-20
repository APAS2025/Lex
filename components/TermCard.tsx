
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { LexiconTerm } from '../types';
import { ArrowRightIcon, CheckBadgeIcon, StarIcon } from './Icons';
import PremiumBadge from './PremiumBadge';
import { vendors } from '../data/mockData';
import { getCategoryLabel } from '../utils/categoryUtils';

interface TermCardProps {
  term: LexiconTerm;
  onRate: (termId: string, rating: number) => void;
}

const TermCard: React.FC<TermCardProps> = ({ term, onRate }) => {
  const [hoverRating, setHoverRating] = useState(0);

  // Find linked vendors from the mock data, filtering out any undefined results
  const linkedVendors = term.linkedVendorIds
    .map(vendorId => vendors.find(v => v.id === vendorId))
    .filter((v): v is NonNullable<typeof v> => v != null);

  const displayVendors = linkedVendors.slice(0, 4);
  const remainingCount = linkedVendors.length - displayVendors.length;

  return (
    <div className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 hover:ring-blue-500 transition-all duration-300 overflow-hidden group flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors duration-300">{term.term}</h3>
          {term.isPremium && <PremiumBadge />}
        </div>
         <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-blue-400">{getCategoryLabel(term.category)}</p>
        <p className="mt-2 text-slate-400 line-clamp-3">
          {term.plainLanguageDefinition}
        </p>
      </div>
      
      <div className="px-6 pb-4 mt-auto">
        {/* Star Rating Section */}
        <div className="flex items-center space-x-1 mb-4" onMouseLeave={() => setHoverRating(0)}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => onRate(term.id, star)}
              onMouseEnter={() => setHoverRating(star)}
              className="focus:outline-none"
              aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
            >
              <StarIcon
                className={`h-5 w-5 transition-colors duration-200 ${
                  (hoverRating || term.userRating || 0) >= star
                    ? 'text-yellow-400'
                    : 'text-slate-600 hover:text-yellow-300'
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center h-8" title={linkedVendors.map(v => v.name).join(', ')}>
          {linkedVendors.length > 0 ? (
            <div className="flex items-center -space-x-3">
              {displayVendors.map(vendor => (
                <div key={vendor.id} className="relative">
                  <img
                    src={vendor.logoUrl}
                    alt={vendor.name}
                    title={vendor.name}
                    className="h-8 w-8 rounded-full object-contain bg-white ring-2 ring-slate-800"
                  />
                  {vendor.isVerified && (
                      <CheckBadgeIcon 
                          className="absolute -bottom-1 -right-1 h-4 w-4 text-blue-400 bg-slate-800 rounded-full"
                          title={`${vendor.name} is a verified vendor`}
                      />
                  )}
                </div>
              ))}
              {remainingCount > 0 && (
                <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 ring-2 ring-slate-800 z-10">
                  +{remainingCount}
                </div>
              )}
            </div>
          ) : (
            <div className="text-sm text-slate-500 italic">
              No vendors linked
            </div>
          )}
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