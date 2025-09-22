
import { useMemo, type ReactNode } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { LexiconTerm, Vendor } from '../types';
import { useAuth } from '../context/AuthContext';
import { ChevronLeftIcon, BookOpenIcon, CodeIcon, BriefcaseIcon } from '../components/Icons';

const InfoCard = ({ title, icon, children }: {title: string; icon: ReactNode; children: ReactNode}) => (
    <div className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 p-6">
        <div className="flex items-center mb-4">
            {icon}
            <h3 className="ml-3 text-xl font-bold text-slate-100">{title}</h3>
        </div>
        <div className="text-slate-400 space-y-2 prose prose-slate prose-invert max-w-none">
            {children}
        </div>
    </div>
);

const VendorCard = ({ vendor }: { vendor: Vendor }) => (
    <Link to={`/vendor/${vendor.id}`} className="block bg-slate-800/60 rounded-lg ring-1 ring-white/10 hover:ring-blue-400 hover:bg-blue-900/40 transition-all duration-300 p-5 group">
        <div className="flex items-center mb-3">
            <img src={vendor.logoUrl} alt={`${vendor.name} logo`} className="h-12 w-12 object-contain rounded-md bg-white p-1 shrink-0" />
            <div className="ml-4">
                <h4 className="font-bold text-slate-100 text-lg group-hover:text-blue-300">{vendor.name}</h4>
            </div>
        </div>
        <p className="text-sm text-slate-300 line-clamp-3">{vendor.description}</p>
    </Link>
);

const TermDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { terms, vendors } = useAuth();

  const term: LexiconTerm | undefined = useMemo(() => terms.find((t) => t.id === id), [id, terms]);

  const linkedVendors: Vendor[] = useMemo(() => {
    if (!term || !term.linkedVendorIds) return [];
    return vendors.filter(vendor => term.linkedVendorIds!.includes(vendor.id));
  }, [term, vendors]);

  if (!term) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Term not found</h2>
        <Link to="/" className="text-blue-400 hover:underline">
          Back to Lexicon
        </Link>
      </div>
    );
  }

  // FIX: Expanded categoryMap to include all categories from the LexiconCategory type.
  const categoryMap: Record<LexiconTerm['category'], string> = {
    data: 'Data',
    asset_mgmt: 'Asset Management',
    climate_impacts: 'Climate Impacts',
    resiliency: 'Resiliency',
    regulations: 'Regulations',
    governance: 'Governance',
    modeling: 'Modeling',
    operations: 'Operations',
    ai_blockchain: 'AI & Blockchain',
  };

  return (
    <div className="container mx-auto">
      <Link to="/" className="inline-flex items-center mb-6 text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-200">
        <ChevronLeftIcon className="h-5 w-5 mr-1" />
        Back to Lexicon
      </Link>
      
      <div className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 p-8 mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100">{term.term}</h1>
        <p className="mt-2 text-lg font-semibold text-blue-400 bg-blue-500/10 rounded-full px-4 py-1 inline-block">{categoryMap[term.category]}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <InfoCard title="Plain Language Definition" icon={<BookOpenIcon className="h-7 w-7 text-sky-400" />}>
                <p>{term.plainLanguageDefinition}</p>
            </InfoCard>

            <InfoCard title="Technical Definition" icon={<CodeIcon className="h-7 w-7 text-indigo-400" />}>
                <p>{term.technicalDefinition}</p>
            </InfoCard>
        </div>

        <div className="lg:col-span-1 space-y-8">
           <div className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 p-6">
                <div className="flex items-center mb-4">
                    <BriefcaseIcon className="h-7 w-7 text-emerald-400" />
                    <h3 className="ml-3 text-xl font-bold text-slate-100">Linked Vendors</h3>
                </div>
                {linkedVendors.length > 0 ? (
                    <div className="space-y-4">
                        {linkedVendors.map(vendor => <VendorCard key={vendor.id} vendor={vendor} />)}
                    </div>
                ) : (
                    <p className="text-slate-400 italic">No vendors linked to this term yet.</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default TermDetail;
