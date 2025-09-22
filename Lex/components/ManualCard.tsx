
import { Link } from 'react-router-dom';
// FIX: Added missing type import
import type { Manual, Vendor } from '../types';
import { ArrowRightIcon } from './Icons';

interface ManualCardProps {
  manual: Manual;
  vendor?: Vendor;
}

const ManualCard = ({ manual, vendor }: ManualCardProps) => {
  return (
    <div className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 hover:ring-blue-500 transition-all duration-300 overflow-hidden group flex flex-col">
      <div className="relative aspect-[3/4]">
        <img 
            src={manual.coverImageUrl} 
            alt={`${manual.title} cover`}
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">{manual.assetType}</span>
        <h3 className="text-lg font-bold text-slate-100 mt-1 group-hover:text-blue-400 transition-colors duration-300">
            {manual.title}
        </h3>
        <p className="text-sm text-slate-400 line-clamp-2 mt-1">
            {manual.summary}
        </p>

        <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center space-x-3">
            {vendor ? (
                <>
                    <img src={vendor.logoUrl} alt={vendor.name} className="h-8 w-8 rounded-full object-contain bg-white" />
                    <div>
                        <p className="text-sm font-semibold text-slate-200">{vendor.name}</p>
                        <p className="text-xs text-slate-400">Model: {manual.modelNumber}</p>
                    </div>
                </>
            ) : (
                <div>
                     <p className="text-sm font-semibold text-slate-200">Unknown Vendor</p>
                     <p className="text-xs text-slate-400">Model: {manual.modelNumber}</p>
                </div>
            )}
        </div>
      </div>
      
       <Link to={`/manual/${manual.id}`} className="block bg-slate-900/50 group-hover:bg-blue-900/20 transition-colors duration-300 px-5 py-3">
        <div className="flex justify-between items-center text-blue-400 font-semibold text-sm">
          <span>View & Interact</span>
          <ArrowRightIcon className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </Link>
    </div>
  );
};

export default ManualCard;
