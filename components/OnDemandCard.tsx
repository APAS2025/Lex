import React from 'react';
import type { OnDemandSession } from '../types';
import { EyeIcon, StarIcon, ClockIcon, PlayTriangleIcon, DocumentDownloadIcon } from './Icons';

interface OnDemandCardProps {
  session: OnDemandSession;
}

const OnDemandCard: React.FC<OnDemandCardProps> = ({ session }) => {
  return (
    <div className="bg-slate-800/50 rounded-2xl ring-1 ring-white/10 p-5 flex items-center space-x-5">
      <div className="shrink-0">
        <div className="w-20 h-20 bg-[#0d2847] rounded-lg flex items-center justify-center ring-1 ring-blue-500/30">
          <PlayTriangleIcon className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="flex-grow">
        <h3 className="font-bold text-slate-100 text-lg">{session.title}</h3>
        <p className="text-sm text-slate-400">{session.author}</p>
        <div className="flex items-center space-x-4 text-sm text-slate-400 mt-2">
          <span className="flex items-center"><EyeIcon className="w-4 h-4 mr-1.5" />{session.views.toLocaleString()} views</span>
          <span className="flex items-center"><StarIcon className="w-4 h-4 mr-1.5 text-yellow-400" />{session.rating}</span>
          <span className="flex items-center"><ClockIcon className="w-4 h-4 mr-1.5" />{session.durationMinutes} min</span>
        </div>
      </div>
      <div className="shrink-0 flex items-center space-x-2">
        <a 
          href={session.watchUrl}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold rounded-lg shadow-md transition-colors flex items-center space-x-2"
        >
          <PlayTriangleIcon className="w-4 h-4" />
          <span>Watch Now</span>
        </a>
        <a 
          href={session.downloadUrl}
          className="px-3 py-2 text-slate-300 font-semibold hover:bg-slate-700/50 rounded-lg transition-colors flex items-center space-x-2"
        >
          <DocumentDownloadIcon className="w-5 h-5" />
          <span>Download</span>
        </a>
      </div>
    </div>
  );
};

export default OnDemandCard;
