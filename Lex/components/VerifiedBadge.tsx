
// FIX: Added missing CheckBadgeIcon import.
import { CheckBadgeIcon } from './Icons';

interface VerifiedBadgeProps {
  className?: string;
}

const VerifiedBadge = ({ className = 'h-6 w-6' }: VerifiedBadgeProps) => {
  return (
    <div className="group relative flex items-center" title="Verified Vendor">
      <CheckBadgeIcon className={`${className} text-blue-400`} />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 ring-1 ring-white/10">
        Verified Vendor
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900"></div>
      </div>
    </div>
  );
};

export default VerifiedBadge;
