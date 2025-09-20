
import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { LexiconTerm, Vendor } from '../types';
import { initialTerms, vendors } from '../data/mockData';
import PremiumBadge from '../components/PremiumBadge';
import VerifiedBadge from '../components/VerifiedBadge';
import { 
    ChevronLeftIcon, 
    BookOpenIcon,
    CodeIcon,
    BeakerIcon,
    ChartBarIcon,
    ShieldCheckIcon,
    BriefcaseIcon,
    DocumentTextIcon,
    PlayIcon,
    DocumentDownloadIcon,
    ChevronDownIcon,
    MailIcon,
    ClipboardListIcon,
    WifiIcon,
    PhoneIcon,
    ShareIcon,
    CheckIcon,
    LightBulbIcon
} from '../components/Icons';
import CommunityContributions from '../components/CommunityContributions';
import FeedbackModal from '../components/FeedbackModal';

const InfoCard: React.FC<{title: string; icon: React.ReactNode; children: React.ReactNode}> = ({ title, icon, children }) => (
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

const VendorCard: React.FC<{ vendor: Vendor }> = ({ vendor }) => (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg ring-1 ring-white/10 hover:ring-blue-400 hover:bg-blue-900/40 transition-all duration-300 p-5 h-full flex flex-col group glow-on-hover">
        <div className="flex items-center mb-3">
            <img src={vendor.logoUrl} alt={`${vendor.name} logo`} className="h-12 w-12 object-contain rounded-md bg-white p-1 shrink-0" />
            <div className="ml-4">
                <div className="flex items-center space-x-1.5">
                    <h4 className="font-bold text-slate-100 text-lg">{vendor.name}</h4>
                    {vendor.isVerified && <VerifiedBadge className="h-5 w-5" />}
                </div>
            </div>
        </div>
        <p className="text-sm text-slate-300 line-clamp-3 mb-4 flex-grow">{vendor.description}</p>
        
        {vendor.isClaimed ? (
             <div className="space-y-2 text-sm text-slate-300 border-t border-slate-700 pt-3 group-hover:border-blue-500/50 transition-colors">
                <div className="flex items-center">
                    <MailIcon className="h-4 w-4 mr-2 shrink-0 text-slate-500" />
                    <a href={`mailto:${vendor.email}`} className="truncate hover:text-blue-300 transition-colors">{vendor.email}</a>
                </div>
                <div className="flex items-center">
                    <PhoneIcon className="h-4 w-4 mr-2 shrink-0 text-slate-500" />
                    <a href={`tel:${vendor.phone.replace(/-/g, '')}`} className="truncate hover:text-blue-300 transition-colors">{vendor.phone}</a>
                </div>
            </div>
        ) : (
             <div className="text-sm text-center border-t border-dashed border-slate-700 pt-3 mt-auto">
                <span className="font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">Claim this profile to connect</span>
            </div>
        )}
    </div>
);

const CollapsibleVendors: React.FC<{ vendors: Vendor[] }> = ({ vendors }) => {
    const [isOpen, setIsOpen] = useState(true);

    if (vendors.length === 0) {
        return (
            <div className="flex items-center space-x-2 text-slate-500 p-6 bg-slate-800/50 rounded-xl ring-1 ring-white/10">
                <BriefcaseIcon className="h-6 w-6" />
                <span className="font-semibold">0 Vendors Linked</span>
            </div>
        );
    }

    return (
        <div className="relative bg-slate-900 rounded-2xl ring-2 ring-blue-500/50 shadow-2xl shadow-blue-500/20 overflow-hidden">
            <div 
                className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(56,189,248,0.2),rgba(255,255,255,0))] opacity-70"
            ></div>
            <div 
                className="absolute inset-[-1000%] animate-[aurora_20s_ease-in-out_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0c4a6e_0%,#3b82f6_50%,#0c4a6e_100%)]"
                style={{ backgroundSize: '200% 200%' }}
            ></div>

            <div className="relative">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex justify-between items-center p-6 text-left"
                >
                    <div className="flex items-center space-x-4">
                        <div className="bg-blue-500/20 p-3 rounded-lg ring-1 ring-blue-500/30">
                            <BriefcaseIcon className="h-8 w-8 text-blue-300" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Vendor & Solution Marketplace</h3>
                            <p className="text-sm text-blue-300">{vendors.length} Linked Partner{vendors.length > 1 ? 's' : ''}</p>
                        </div>
                    </div>
                    <ChevronDownIcon className={`h-7 w-7 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                    <div className="px-6 pb-6 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {vendors.map(vendor => (
                          <Link to={`/vendor/${vendor.id}`} key={vendor.id} className="block">
                            <VendorCard vendor={vendor} />
                          </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


const TermDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isCopied, setIsCopied] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const term: LexiconTerm | undefined = useMemo(() => initialTerms.find((t) => t.id === id), [id]);

  const linkedVendors: Vendor[] = useMemo(() => {
    if (!term) return [];
    return vendors.filter(vendor => term.linkedVendorIds.includes(vendor.id));
  }, [term]);
  
  const relatedTerms: LexiconTerm[] = useMemo(() => {
    if (!term) return [];
    return initialTerms
        .filter(t => t.category === term.category && t.id !== term.id)
        .slice(0, 3); // Limit to 3 related terms
    }, [term]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
  };

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

  const ActionCard = ({ children, href }: { children: React.ReactNode; href?: string; }) => {
    const commonClasses = "group flex flex-col items-center justify-center text-center p-4 bg-slate-800/50 rounded-xl ring-1 ring-white/10 hover:ring-blue-500 hover:bg-slate-800 transition-all duration-200 h-full";
    return <a href={href} target="_blank" rel="noopener noreferrer" className={commonClasses}>{children}</a>;
  };

  return (
    <div className="container mx-auto">
      <Link to="/" className="inline-flex items-center mb-6 text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-200">
        <ChevronLeftIcon className="h-5 w-5 mr-1" />
        Back to Lexicon
      </Link>
      
      <div className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 p-8 mb-8">
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100">{term.term}</h1>
                <p className="mt-2 text-lg font-semibold text-blue-400 bg-blue-500/10 rounded-full px-4 py-1 inline-block">{term.category}</p>
            </div>
            {term.isPremium && <PremiumBadge />}
        </div>
      </div>

      {/* Resources Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-slate-200 mb-4">Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {term.demoVideoUrl && (
                <ActionCard href={term.demoVideoUrl}>
                    <PlayIcon className="h-8 w-8 text-green-400 mb-2" />
                    <h3 className="font-semibold text-slate-200">Watch Demo</h3>
                    <p className="text-sm text-slate-400">See it in action.</p>
                </ActionCard>
            )}
            {term.handbookUrl && (
                <ActionCard href={term.handbookUrl}>
                    <DocumentDownloadIcon className="h-8 w-8 text-sky-400 mb-2" />
                    <h3 className="font-semibold text-slate-200">Download Handbook</h3>
                    <p className="text-sm text-slate-400">Get the technical guide.</p>
                </ActionCard>
            )}
             <ActionCard>
                <DocumentTextIcon className="h-8 w-8 text-purple-400 mb-2" />
                <h3 className="font-semibold text-slate-200">{term.caseStudiesCount} Case Studies</h3>
                <p className="text-sm text-slate-400">Real-world applications.</p>
            </ActionCard>
        </div>
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-8">
            <InfoCard title="Plain Language Definition" icon={<BookOpenIcon className="h-7 w-7 text-sky-400" />}>
                <p>{term.plainLanguageDefinition}</p>
            </InfoCard>

            <InfoCard title="Technical Definition" icon={<CodeIcon className="h-7 w-7 text-indigo-400" />}>
                <p>{term.technicalDefinition}</p>
            </InfoCard>

            <CommunityContributions 
              initialComments={term.comments || []}
              initialDocuments={term.documents || []}
            />

            <InfoCard title="Design & O&M Notes" icon={<ClipboardListIcon className="h-7 w-7 text-cyan-400" />}>
                <p>{term.designAndOMNotes}</p>
            </InfoCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InfoCard title="Use Cases & Examples" icon={<BeakerIcon className="h-7 w-7 text-emerald-400" />}>
                    <ul>
                        {term.useCases.map((uc, i) => <li key={i}>{uc}</li>)}
                    </ul>
                </InfoCard>
                <InfoCard title="Risks & Failure Modes" icon={<ShieldCheckIcon className="h-7 w-7 text-red-400" />}>
                    <ul>
                        {term.risksAndFailureModes.map((risk, i) => <li key={i}>{risk}</li>)}
                    </ul>
                </InfoCard>
            </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
            <CollapsibleVendors vendors={linkedVendors} />

            <InfoCard title="Impact Metrics" icon={<ChartBarIcon className="h-7 w-7 text-amber-400" />}>
                {term.impactMetrics.map((metric, i) => (
                    <div key={i} className="not-prose">
                        <h4 className="font-bold text-slate-200">{metric.name}: <span className="text-blue-400">{metric.value}</span></h4>
                        <p className="text-sm">{metric.description}</p>
                    </div>
                ))}
            </InfoCard>
            
            <InfoCard title="Regulatory References" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>}>
                 <ul>
                    {term.regulatoryReferences.map((ref, i) => <li key={i}>{ref}</li>)}
                </ul>
            </InfoCard>

            {relatedTerms.length > 0 && (
                <InfoCard title="Related Terms" icon={<WifiIcon className="h-7 w-7 text-teal-400" />}>
                    <div className="space-y-4">
                        {relatedTerms.map(related => (
                            <Link key={related.id} to={`/term/${related.id}`} className="block not-prose group">
                                <h4 className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors">{related.term}</h4>
                                <p className="text-sm text-slate-400 mt-1 line-clamp-2">{related.plainLanguageDefinition}</p>
                            </Link>
                        ))}
                    </div>
                </InfoCard>
            )}
        </div>
      </div>

      {/* Persistent Share Button */}
      <button
        onClick={handleShare}
        className={`fixed bottom-28 right-8 z-40 flex items-center justify-center h-16 rounded-full text-white shadow-2xl shadow-cyan-500/40 transform-gpu transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-cyan-500/50 ${
            isCopied 
            ? 'w-auto px-5 bg-gradient-to-br from-green-500 to-emerald-500' 
            : 'w-16 bg-gradient-to-br from-teal-500 to-cyan-500 hover:scale-110 focus:scale-110'
        }`}
        aria-label="Share term URL"
        aria-live="polite"
      >
        {isCopied ? (
            <>
              <CheckIcon className="h-6 w-6 mr-2" />
              <span className="font-semibold">Link copied!</span>
            </>
        ) : (
            <ShareIcon className="h-8 w-8" />
        )}
      </button>

      {/* Persistent Feedback Button */}
      <button
        onClick={() => setIsFeedbackModalOpen(true)}
        className="fixed bottom-8 right-8 z-40 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full text-white shadow-2xl shadow-blue-500/40 hover:scale-110 focus:scale-110 transform-gpu transition-transform duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500/50"
        aria-label="Provide feedback on this term"
      >
        <LightBulbIcon className="h-8 w-8" />
      </button>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        termName={term.term}
      />
    </div>
  );
};

export default TermDetail;