
import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import type { Manual } from '../types';
import ManualCard from '../components/ManualCard';
import { SearchIcon, WrenchScrewdriverIcon } from '../components/Icons';

const ASSET_TYPES: Manual['assetType'][] = ['Pump', 'Sensor', 'Hydrant', 'Valve', 'Filtration System'];

const ManualsLibrary = () => {
    const { manuals, vendors } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAssetType, setSelectedAssetType] = useState<string | null>(null);

    const filteredManuals = useMemo(() => {
        let results = manuals;

        if (selectedAssetType) {
            results = results.filter(manual => manual.assetType === selectedAssetType);
        }

        if (searchTerm.trim()) {
            const lowercasedSearch = searchTerm.toLowerCase();
            results = results.filter(manual => {
                const vendor = vendors.find(v => v.id === manual.vendorId);
                return (
                    manual.title.toLowerCase().includes(lowercasedSearch) ||
                    manual.modelNumber.toLowerCase().includes(lowercasedSearch) ||
                    (vendor && vendor.name.toLowerCase().includes(lowercasedSearch))
                );
            });
        }
        
        return results.sort((a,b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
    }, [searchTerm, selectedAssetType, manuals, vendors]);

    return (
        <div className="container mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-slate-100 sm:text-5xl md:text-6xl">
                    Interactive Manuals Library
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400">
                    Search, filter, and interact with O&M manuals for critical infrastructure assets.
                </p>
            </div>

            {/* Search and Filter Section */}
            <div className="sticky top-[65px] bg-[#0F172A]/80 backdrop-blur-md z-40 py-6 mb-8">
                <div className="relative mb-4">
                    <input
                        type="search"
                        placeholder="Search by manual title, model number, or vendor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400 pointer-events-none" />
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                        onClick={() => setSelectedAssetType(null)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                            selectedAssetType === null 
                                ? 'bg-blue-600 text-white ring-2 ring-blue-400' 
                                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                        }`}
                    >
                        All Assets
                    </button>
                    {ASSET_TYPES.map(type => (
                        <button
                            key={type}
                            onClick={() => setSelectedAssetType(type)}
                            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                                selectedAssetType === type 
                                    ? 'bg-blue-600 text-white ring-2 ring-blue-400' 
                                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Manuals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredManuals.map(manual => {
                    const vendor = vendors.find(v => v.id === manual.vendorId);
                    return <ManualCard key={manual.id} manual={manual} vendor={vendor} />;
                })}
            </div>
            
            {filteredManuals.length === 0 && (
                <div className="text-center col-span-full py-16 bg-slate-800/50 rounded-xl ring-1 ring-white/10">
                    <WrenchScrewdriverIcon className="h-16 w-16 mx-auto text-slate-600 mb-4" />
                    <h3 className="text-2xl font-bold text-slate-200">No manuals found</h3>
                    <p className="text-slate-400 mt-2">Try adjusting your search or filters.</p>
                </div>
            )}
        </div>
    );
};

export default ManualsLibrary;
