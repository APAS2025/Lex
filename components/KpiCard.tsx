import React from 'react';
import type { Kpi } from '../types';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from './Icons';

interface KpiCardProps {
  kpi: Kpi;
}

const KpiCard: React.FC<KpiCardProps> = ({ kpi }) => {
  return (
    <div className="bg-slate-800/50 rounded-2xl ring-1 ring-white/10 p-6 flex flex-col h-full shadow-lg hover:shadow-blue-500/10 hover:ring-blue-500/80 transition-all duration-300">
      <div className="flex items-start space-x-4">
        <div className="bg-slate-700/50 p-3 rounded-lg ring-1 ring-white/10">
          <kpi.icon className="h-7 w-7 text-blue-400" />
        </div>
        <div>
          <h4 className="font-extrabold text-slate-100 text-lg leading-tight">{kpi.objective}</h4>
        </div>
      </div>
      
      <p className="text-slate-300 my-4 text-sm flex-grow">
        <span className="font-semibold text-slate-100">Measurable Outcome:</span> {kpi.measurableOutcome}
      </p>

      <div className="mt-auto pt-4 border-t border-slate-700/50 space-y-3">
        <div className="flex items-start space-x-3">
          <ArrowTrendingUpIcon className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-green-400 uppercase tracking-wider">Financial Return</p>
            <p className="text-sm font-semibold text-slate-200">{kpi.financialReturn}</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <ArrowTrendingDownIcon className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Investment</p>
            <p className="text-sm font-semibold text-slate-200">{kpi.investment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiCard;