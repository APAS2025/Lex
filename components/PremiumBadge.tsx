
import React from 'react';
import { StarIcon } from './Icons';

const PremiumBadge: React.FC = () => {
  return (
    <div className="flex items-center space-x-1.5 bg-purple-600/20 text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ring-inset ring-purple-500/50">
      <StarIcon className="h-3 w-3" />
      <span>Premium</span>
    </div>
  );
};

export default PremiumBadge;
