
import React from 'react';
// FIX: Added missing type import
import type { Kpi, IconName } from '../types';
// FIX: Added missing icon imports
import * as Icons from './Icons';

// FIX: Map string icon names to actual components to break dependency cycle.
const iconMap: Record<IconName, React.FC<{className?: string}>> = {
    AcademicCapIcon: Icons.AcademicCapIcon,
    StarIcon: Icons.StarIcon,
    SparklesIcon: Icons.SparklesIcon,
    ShieldCheckIcon: Icons.ShieldCheckIcon,
    ChatBubbleLeftRightIcon: Icons.ChatBubbleLeftRightIcon,
    DocumentTextIcon: Icons.DocumentTextIcon,
    LightBulbIcon: Icons.LightBulbIcon,
    TrophyIcon: Icons.TrophyIcon,
    FireIcon: Icons.FireIcon,
    CodeIcon: Icons.CodeIcon,
    BriefcaseIcon: Icons.BriefcaseIcon,
    UsersIcon: Icons.UsersIcon,
    ChartBarIcon: Icons.ChartBarIcon,
    WrenchScrewdriverIcon: Icons.WrenchScrewdriverIcon,
    BrainCircuitIcon: Icons.BrainCircuitIcon,
    ArrowTrendingUpIcon: Icons.ArrowTrendingUpIcon,
    ArrowTrendingDownIcon: Icons.ArrowTrendingDownIcon,
};


interface KpiCardProps {
  kpi: Kpi;
}

const KpiCard = ({ kpi }: KpiCardProps) => {
  const KpiIcon = iconMap[kpi.icon];
  if (!KpiIcon) return null;

  return (
    <div className="bg-slate-800/50 rounded-2xl ring-1 ring-white/10 p-6 flex flex-col h-full shadow-lg hover:shadow-blue-500/10 hover:ring-blue-500/80 transition-all duration-300">
      <div className="flex items-start space-x-4">
        <div className="bg-slate-700/50 p-3 rounded-lg ring-1 ring-white/10">
          <KpiIcon className="h-7 w-7 text-blue-400" />
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
          <Icons.ArrowTrendingUpIcon className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-green-400 uppercase tracking-wider">Financial Return</p>
            <p className="text-sm font-semibold text-slate-200">{kpi.financialReturn}</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <Icons.ArrowTrendingDownIcon className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
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
