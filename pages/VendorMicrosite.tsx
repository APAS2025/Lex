import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { vendors } from '../data/mockData';
import type { DocumentationItem, PerformanceMetric } from '../types';
import KeyContacts from '../components/KeyContacts';
import VerifiedBadge from '../components/VerifiedBadge';
import KpiCard from '../components/KpiCard';
import {
    ChevronLeftIcon,
    VideoCameraIcon,
    RssIcon,
    PresentationChartBarIcon,
    WifiIcon,
    PlayIcon,
    MailIcon,
    PhoneIcon,
    GlobeAltIcon,
    StarIcon,
    DocumentTextIcon,
    CheckIcon,
    ShareIcon,
    EyeIcon,
    LeafIcon,
    LightningBoltIcon,
    ClockIcon,
    DocumentDownloadIcon,
    MegaphoneIcon,
    ArrowRightIcon,
    ChartBarIcon,
} from '../components/Icons';

const DocumentListItemIcon: React.FC<{ category: string; className?: string }> = ({ category, className }) => {
    switch (category) {
        case 'Stormwater Management':
            return <LeafIcon className={className} />;
        case 'Control Systems':
            return <LightningBoltIcon className={className} />;
        case 'Treatment Technology':
            return <DocumentTextIcon className={className} />;
        default:
            return <DocumentTextIcon className={className} />;
    }
};

const DocumentListItem: React.FC<{ document: DocumentationItem }> = ({ document }) => {
    return (
        <a href={document.documentUrl} target="_blank" rel="noopener noreferrer" className="block bg-slate-800/50 rounded-2xl ring-1 ring-white/10 p-5 hover:bg-slate-800 hover:ring-blue-500 transition-all duration-300 group">
            <div className="flex justify-between items-start">
                <div className="flex-grow">
                    <div className="flex items-start space-x-4">
                        <div className="bg-slate-700/50 rounded-lg p-3 ring-1 ring-white/10">
                            <DocumentListItemIcon category={document.category} className="h-6 w-6 text-green-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-100 group-hover:text-blue-400 transition-colors">{document.title}</h4>
                            <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
                                <span className="flex items-center"><DocumentDownloadIcon className="h-4 w-4 mr-1"/> {document.downloads.toLocaleString()} downloads</span>
                                <span className="flex items-center"><ClockIcon className="h-4 w-4 mr-1"/> {document.updatedAt}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {document.tags.map(tag => (
                            <span key={tag} className="text-xs font-medium text-cyan-300 bg-cyan-900/50 px-2 py-1 rounded-full ring-1 ring-inset ring-cyan-500/30">{tag}</span>
                        ))}
                    </div>
                </div>
                <div className="text-right ml-4 shrink-0">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{document.category}</div>
                    <div className="text-lg font-bold text-green-400 mt-1">+${(document.annualSavings / 1000).toFixed(0)}K/year</div>
                </div>
            </div>
        </a>
    );
};

const PerformanceMetrics: React.FC<{ metrics: PerformanceMetric[] }> = ({ metrics }) => {
    return (
        <div className="bg-slate-900/50 rounded-b-xl p-6">
            <h4 className="font-bold text-slate-100 mb-4">Performance Metrics</h4>
            <div className="space-y-4">
                {metrics.map(metric => (
                    <div key={metric.name}>
                        <div className="flex justify-between items-center text-sm mb-1">
                            <span className="text-slate-300 font-medium">{metric.name}</span>
                            <span className="font-semibold text-slate-100">{metric.value}%</span>
                        </div>
                        <div className="w-full bg-slate-700/50 rounded-full h-2 ring-1 ring-inset ring-slate-600">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${metric.value}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const FeaturedDocument: React.FC<{ document: DocumentationItem }> = ({ document }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(window.location.href).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2500);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <div className="bg-slate-800/80 rounded-xl backdrop-blur-sm ring-1 ring-white/10 shadow-2xl shadow-blue-900/20 flex flex-col h-full">
            <div className="bg-slate-900/70 p-4 rounded-t-xl flex justify-between items-center border-b border-white/10">
                <h3 className="text-xl font-bold text-slate-100 flex items-center">
                    <DocumentTextIcon className="h-6 w-6 mr-3 text-blue-400" />
                    Technical Specification
                </h3>
                <span className="text-xs font-semibold text-slate-300 bg-slate-700/50 px-3 py-1 rounded-full ring-1 ring-inset ring-slate-600">Live Preview</span>
            </div>
            <div className="p-6 flex-grow relative">
                <img src={document.previewImageUrl} alt="Technical Specification Preview" className="w-full h-auto rounded-lg object-cover" />
                {document.complianceStatus && (
                    <div className="absolute top-10 left-10 flex items-center space-x-2 bg-green-600/90 text-white text-sm font-bold px-4 py-2 rounded-lg ring-2 ring-green-300 shadow-lg">
                        <CheckIcon className="h-5 w-5" />
                        <span>{document.complianceStatus}</span>
                    </div>
                )}
                {document.roi && (
                    <div className="absolute top-24 left-10 bg-slate-900/90 text-white text-sm font-bold px-4 py-2 rounded-lg ring-2 ring-blue-400 shadow-lg">
                        ROI: <span className="text-blue-300 text-base">+{document.roi}%</span>
                    </div>
                )}
            </div>
            {document.performanceMetrics && <PerformanceMetrics metrics={document.performanceMetrics} />}
             <div className="p-4 bg-slate-900/50 border-t border-white/10 flex items-center justify-between">
                <a href={document.documentUrl} download className="flex-1 text-center px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition flex items-center justify-center">
                    <DocumentDownloadIcon className="h-5 w-5 mr-2" />
                    Download PDF
                </a>
                <button 
                    onClick={handleShare}
                    className={`ml-4 px-4 py-3 rounded-lg transition duration-200 ${isCopied ? 'bg-green-600/80 text-white' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'}`}
                >
                    {isCopied ? <CheckIcon className="h-5 w-5"/> : <ShareIcon className="h-5 w-5"/>}
                </button>
                <button className="ml-2 px-4 py-3 bg-slate-700/50 rounded-lg text-slate-300 hover:bg-slate-700 transition"><EyeIcon className="h-5 w-5"/></button>
            </div>
        </div>
    );
};

const HostSessionCTA: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-blue-900 via-slate-900 to-slate-900 rounded-2xl ring-2 ring-blue-500/50 p-6 text-center shadow-2xl shadow-blue-500/20">
      <div className="bg-blue-500/20 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4 ring-4 ring-blue-500/30">
        <MegaphoneIcon className="h-8 w-8 text-blue-300" />
      </div>
      <h2 className="text-2xl font-extrabold text-white mb-2">Become a Thought Leader</h2>
      <p className="text-slate-300 mb-6">
        Host a live session on Droobi TV, share your expertise, and connect directly with thousands of industry professionals.
      </p>
      <a 
        href="#"
        className="inline-flex items-center justify-center px-6 py-3 bg-slate-100 text-slate-900 font-bold rounded-lg shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-white transition group"
      >
        <span>Schedule Your Session</span>
        <ArrowRightIcon className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
      </a>
    </section>
  );
};


const VendorMicrosite: React.FC = () => {
    const { vendorId } = useParams<{ vendorId: string }>();
    const vendor = useMemo(() => vendors.find(v => v.id === vendorId), [vendorId]);

    const featuredDocument = useMemo(() => vendor?.documentation.find(d => d.isFeatured), [vendor]);
    const popularDocuments = useMemo(() => vendor?.documentation.filter(d => !d.isFeatured).slice(0, 3), [vendor]);

    if (!vendor) {
        return (
            <div className="text-center container mx-auto">
                <h2 className="text-2xl font-bold text-slate-100">Vendor not found</h2>
                <Link to="/" className="mt-4 inline-block text-blue-400 hover:underline">
                    Back to Lexicon
                </Link>
            </div>
        );
    }

    const liveWebinar = vendor.webinars.find(w => w.isLive);
    const pastWebinars = vendor.webinars.filter(w => !w.isLive);

    // Unclaimed Profile View
    if (!vendor.isClaimed) {
        return (
             <div className="container mx-auto">
                <Link to="/" className="inline-flex items-center mb-6 text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-200">
                    <ChevronLeftIcon className="h-5 w-5 mr-1" />
                    Back to Lexicon
                </Link>

                <div className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 p-8 mb-8 flex flex-col md:flex-row items-center md:space-x-8 text-center md:text-left">
                    <img src={vendor.logoUrl} alt={`${vendor.name} logo`} className="h-32 w-32 object-contain rounded-lg bg-white p-2 shrink-0 mb-6 md:mb-0" />
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100">{vendor.name}</h1>
                        <p className="mt-2 text-lg text-slate-400">{vendor.description}</p>
                    </div>
                </div>
                
                <div className="relative mt-8">
                    {/* Blurred background content to entice vendors */}
                    <div className="blur-md select-none pointer-events-none opacity-30" aria-hidden="true">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-12">
                                <div className="bg-slate-800/50 h-64 rounded-xl ring-1 ring-white/10 p-6">
                                     <div className="h-8 w-48 bg-slate-700/50 rounded-md mb-4"></div>
                                     <div className="space-y-4">
                                         <div className="h-16 w-full bg-slate-700/50 rounded-md"></div>
                                         <div className="h-16 w-full bg-slate-700/50 rounded-md"></div>
                                         <div className="h-16 w-full bg-slate-700/50 rounded-md"></div>
                                     </div>
                                </div>
                                <div className="bg-slate-800/50 h-48 rounded-xl ring-1 ring-white/10"></div>
                            </div>
                            <div className="space-y-8">
                                <div className="bg-slate-800/50 h-32 rounded-xl ring-1 ring-white/10"></div>
                                <div className="bg-slate-800/50 h-56 rounded-xl ring-1 ring-white/10"></div>
                                <div className="bg-slate-800/50 h-40 rounded-xl ring-1 ring-white/10"></div>
                            </div>
                        </div>
                    </div>
                    
                    {/* "Claim Profile" overlay */}
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl ring-2 ring-blue-500/50 p-8 text-center max-w-2xl shadow-2xl shadow-blue-500/20">
                            <StarIcon className="h-12 w-12 text-blue-400 mx-auto mb-4"/>
                            <h2 className="text-3xl font-extrabold text-white mb-3">Unlock This Vendor Profile</h2>
                            <p className="text-slate-300 mb-4">
                                Are you an official representative of <span className="font-bold text-white">{vendor.name}</span>? 
                                Claim this profile to unlock powerful features:
                            </p>
                            <ul className="text-left text-slate-300 space-y-3 list-inside list-none max-w-md mx-auto mb-6">
                                <li className="flex items-start">
                                    <CheckIcon className="h-6 w-6 text-green-400 mr-3 mt-1 shrink-0" />
                                    <span>Manage your content, showcase products, and post articles to establish your brand.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckIcon className="h-6 w-6 text-green-400 mr-3 mt-1 shrink-0" />
                                    <span>Connect directly with industry leaders and generate qualified leads.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckIcon className="h-6 w-6 text-green-400 mr-3 mt-1 shrink-0" />
                                    <span>Host live expert sessions on Droobi TV to showcase your thought leadership.</span>
                                </li>
                            </ul>
                            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 text-lg transform-gpu transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40">
                                Claim Profile & Unlock Features
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    // Standard Claimed Profile View
    return (
        <div className="container mx-auto">
            <Link to="/" className="inline-flex items-center mb-6 text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-200">
                <ChevronLeftIcon className="h-5 w-5 mr-1" />
                Back to Lexicon
            </Link>

            {/* Vendor Hero */}
            <div className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 p-8 mb-8 flex flex-col md:flex-row items-center md:space-x-8 text-center md:text-left">
                <img src={vendor.logoUrl} alt={`${vendor.name} logo`} className="h-32 w-32 object-contain rounded-lg bg-white p-2 shrink-0 mb-6 md:mb-0" />
                <div>
                    <div className="flex items-center justify-center md:justify-start space-x-3">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100">{vendor.name}</h1>
                        {vendor.isVerified && <VerifiedBadge className="h-8 w-8" />}
                    </div>
                    <p className="mt-2 text-lg text-slate-400">{vendor.description}</p>
                </div>
            </div>

            {/* Live Webinar */}
            {liveWebinar && (
                <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl ring-2 ring-green-300 p-6 mb-8 shadow-2xl shadow-green-500/20">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <div className="flex items-center space-x-4">
                             <div className="relative">
                                <WifiIcon className="h-10 w-10 text-white" />
                                <span className="absolute top-0 right-0 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                                </span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Live Webinar Happening Now!</h2>
                                <p className="text-green-100 font-medium">{liveWebinar.title}</p>
                            </div>
                        </div>
                        <a href={liveWebinar.url} target="_blank" rel="noopener noreferrer" className="bg-white text-green-600 font-bold py-3 px-6 rounded-lg hover:bg-green-50 transition-colors duration-300 shadow-lg shrink-0">
                            Join Now
                        </a>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Instant Documentation Section */}
                    {vendor.documentation && vendor.documentation.length > 0 && (
                        <section>
                            <h2 className="text-3xl font-bold text-slate-100 tracking-tight mb-2">Instant Documentation</h2>
                            <p className="text-lg text-slate-400 mb-8">
                                Download comprehensive technical specifications, compliance guides, and ROI analysis sheets for your projects.
                            </p>
                            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 items-start">
                                <div className="xl:col-span-3">
                                    {featuredDocument && <FeaturedDocument document={featuredDocument} />}
                                </div>
                                <div className="xl:col-span-2">
                                    <h3 className="text-2xl font-bold text-slate-100 mb-4">Popular Cut Sheets</h3>
                                    <div className="space-y-4">
                                        {popularDocuments && popularDocuments.map(doc => <DocumentListItem key={doc.id} document={doc} />)}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                     {/* Key Performance Indicators Section */}
                    {vendor.kpis && vendor.kpis.length > 0 && (
                        <section>
                            <h2 className="text-3xl font-bold text-slate-100 tracking-tight mb-2 flex items-center">
                                <ChartBarIcon className="h-8 w-8 mr-3 text-blue-400" />
                                Key Performance Indicators
                            </h2>
                            <p className="text-lg text-slate-400 mb-8">
                                Measurable outcomes and financial returns for smart objectives.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {vendor.kpis.map(kpi => (
                                    <KpiCard key={kpi.id} kpi={kpi} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Articles & Blogs Section */}
                    {vendor.articles.length > 0 && (
                        <section>
                            <h2 className="text-3xl font-bold text-slate-100 mb-4 flex items-center"><RssIcon className="h-8 w-8 mr-3 text-orange-400"/> Articles & Blogs</h2>
                            <div className="space-y-6">
                                {vendor.articles.map(article => (
                                    <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-4 bg-slate-800/50 p-4 rounded-xl ring-1 ring-white/10 hover:ring-orange-500 transition-all duration-300">
                                        <img src={article.imageUrl} alt="" className="h-24 w-24 object-cover rounded-md shrink-0"/>
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-200 group-hover:text-orange-400 transition-colors">{article.title}</h3>
                                            <p className="text-slate-400 line-clamp-2">{article.description}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Past Webinars Section */}
                     {pastWebinars.length > 0 && (
                        <section>
                            <h2 className="text-3xl font-bold text-slate-100 mb-4 flex items-center"><PresentationChartBarIcon className="h-8 w-8 mr-3 text-indigo-400"/> Past Webinars</h2>
                            <div className="space-y-6">
                                {pastWebinars.map(webinar => (
                                    <a key={webinar.id} href={webinar.url} target="_blank" rel="noopener noreferrer" className="block p-4 bg-slate-800/50 rounded-xl ring-1 ring-white/10 hover:ring-indigo-500 transition-all duration-300 group">
                                        <h4 className="font-semibold text-slate-200 group-hover:text-indigo-400">{webinar.title}</h4>
                                        <p className="text-sm text-slate-400 mb-2">{new Date(webinar.dateTime).toLocaleDateString()}</p>
                                        <p className="text-sm text-slate-400 line-clamp-2">{webinar.description}</p>
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    {/* Key Contacts Section */}
                    {vendor.contacts && vendor.contacts.length > 0 && (
                        <KeyContacts contacts={vendor.contacts} />
                    )}
                    
                    <HostSessionCTA />

                    {/* Contact & Links Section */}
                    <section className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 p-6">
                        <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center">
                            <MailIcon className="h-7 w-7 mr-3 text-green-400"/> Contact & Links
                        </h2>
                        <ul className="space-y-4">
                            <li className="flex items-center">
                                <MailIcon className="h-5 w-5 mr-3 text-slate-400 shrink-0"/>
                                <a href={`mailto:${vendor.email}`} className="text-slate-300 hover:text-green-400 transition-colors break-all">
                                    {vendor.email}
                                </a>
                            </li>
                            <li className="flex items-center">
                                <PhoneIcon className="h-5 w-5 mr-3 text-slate-400 shrink-0"/>
                                <a href={`tel:${vendor.phone.replace(/-/g, '')}`} className="text-slate-300 hover:text-green-400 transition-colors">
                                    {vendor.phone}
                                </a>
                            </li>
                            {vendor.website && (
                                <li className="flex items-center">
                                    <GlobeAltIcon className="h-5 w-5 mr-3 text-slate-400 shrink-0"/>
                                    <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-blue-400 transition-colors break-all">
                                        {vendor.website.replace('https://www.', '').replace('https://', '')}
                                    </a>
                                </li>
                            )}
                        </ul>
                    </section>

                    {/* Videos Section */}
                    {vendor.videos.length > 0 && (
                        <section className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 p-6">
                            <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center"><VideoCameraIcon className="h-7 w-7 mr-3 text-purple-400"/> Videos</h2>
                            <div className="space-y-6">
                                {vendor.videos.map(video => (
                                    <a key={video.id} href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="group block bg-slate-900/50 rounded-xl overflow-hidden ring-1 ring-slate-800 hover:ring-purple-500 transition-all duration-300">
                                        <div className="relative">
                                            <img src={video.thumbnailUrl} alt={video.title} className="w-full h-40 object-cover"/>
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <PlayIcon className="h-16 w-16 text-white/80"/>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-slate-200 group-hover:text-purple-400 transition-colors">{video.title}</h3>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VendorMicrosite;