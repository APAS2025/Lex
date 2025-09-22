
import { useState, useMemo, type FC } from 'react';
import { useAuth } from '../context/AuthContext';
import type { EntityType } from '../types';
import EntityCard from '../components/EntityCard';
import { BriefcaseIcon, UsersIcon, AcademicCapIcon, CheckBadgeIcon, ShieldCheckIcon } from '../components/Icons';

const ENTITY_TYPES: { id: EntityType, icon: FC<{className?: string}> }[] = [
    { id: 'Vendor', icon: BriefcaseIcon },
    { id: 'Consultant', icon: UsersIcon },
    { id: 'Government', icon: ShieldCheckIcon },
    { id: 'Academia', icon: AcademicCapIcon },
    { id: 'Non-Profit', icon: CheckBadgeIcon }
];

const EcosystemDirectory = () => {
    const { ecosystemEntities } = useAuth();
    const [selectedType, setSelectedType] = useState<EntityType | null>(null);

    const filteredEntities = useMemo(() => {
        if (!selectedType) {
            return ecosystemEntities;
        }
        return ecosystemEntities.filter(entity => entity.type === selectedType);
    }, [selectedType, ecosystemEntities]);

    const FilterButton = ({ type, label, icon: Icon }: { type: EntityType | null, label: string, icon: FC<{className?: string}> }) => {
        const isActive = selectedType === type;
        return (
            <button
                onClick={() => setSelectedType(type)}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 shrink-0 ${
                    isActive
                        ? 'bg-blue-600 text-white ring-2 ring-blue-400 shadow-md shadow-blue-500/20'
                        : 'bg-slate-800/50 text-slate-300 ring-1 ring-white/10 hover:bg-slate-700/50 hover:text-blue-300'
                }`}
                aria-pressed={isActive}
            >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
            </button>
        );
    };

    return (
        <div className="container mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-slate-100 sm:text-5xl md:text-6xl">
                    Industry Ecosystem
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400">
                    Discover and connect with the vendors, consultants, and agencies shaping the future of infrastructure.
                </p>
            </div>
            
            {/* Filter Controls */}
            <div className="flex flex-wrap items-center justify-center gap-3 p-4 bg-slate-900/50 rounded-xl mb-12 sticky top-[70px] z-30">
                <FilterButton type={null} label="All" icon={UsersIcon} />
                 <div className="w-px h-6 bg-slate-700 mx-1 hidden sm:block"></div>
                {ENTITY_TYPES.map(({ id, icon }) => (
                    <FilterButton key={id} type={id} label={id} icon={icon} />
                ))}
            </div>

            {/* Entity Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredEntities.map(entity => (
                    <EntityCard key={entity.id} entity={entity} />
                ))}
            </div>
            {filteredEntities.length === 0 && (
                <div className="text-center col-span-full py-16 bg-slate-800/50 rounded-xl ring-1 ring-white/10">
                    <h3 className="text-2xl font-bold text-slate-200">No entities found</h3>
                    <p className="text-slate-400 mt-2">There are no listings for the selected category.</p>
                </div>
            )}
        </div>
    );
};

export default EcosystemDirectory;
