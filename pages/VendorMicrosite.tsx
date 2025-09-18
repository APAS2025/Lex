import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { vendors } from '../data/mockData';
import {
    ChevronLeftIcon,
    VideoCameraIcon,
    RssIcon,
    PresentationChartBarIcon,
    ClipboardListIcon,
    WifiIcon,
    PlayIcon,
    DocumentDownloadIcon,
    MailIcon,
    PhoneIcon,
    GlobeAltIcon,
    StarIcon
} from '../components/Icons';

const VendorMicrosite: React.FC = () => {
    const { vendorId } = useParams<{ vendorId: string }>();
    const vendor = useMemo(() => vendors.find(v => v.id === vendorId), [vendorId]);

    const docTypes = useMemo(() => 
        vendor ? [...new Set(vendor.documentation.map(d => d.type))] : [],
        [vendor]
    );
    
    const [activeDocTab, setActiveDocTab] = useState<string>('');

    useEffect(() => {
        if (docTypes.length > 0) {
            setActiveDocTab(docTypes[0]);
        } else {
            setActiveDocTab('');
        }
    }, [docTypes]);
    
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
    const filteredDocs = vendor.documentation.filter(d => d.type === activeDocTab);

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
                            <p className="text-slate-300 mb-6">
                                Are you an official representative of <span className="font-bold text-white">{vendor.name}</span>? 
                                Claim this profile to manage your content, showcase your products, and connect directly with industry leaders.
                            </p>
                            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition text-lg">
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
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100">{vendor.name}</h1>
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-12">
                    {/* Articles & Blogs Section */}
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

                    {/* Past Webinars Section */}
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
                </div>

                <div className="space-y-8">
                    {/* Company Website Section */}
                    {vendor.website && (
                        <section className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 p-6">
                            <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center">
                                <GlobeAltIcon className="h-7 w-7 mr-3 text-blue-400"/> Company Website
                            </h2>
                            <ul className="space-y-4">
                                <li className="flex items-center">
                                    <GlobeAltIcon className="h-5 w-5 mr-3 text-slate-400 shrink-0"/>
                                    <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-blue-400 transition-colors break-all">
                                        {vendor.website.replace('https://www.', '').replace('https://', '')}
                                    </a>
                                </li>
                            </ul>
                        </section>
                    )}

                    {/* Contact Information Section */}
                    <section className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 p-6">
                        <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center">
                            <MailIcon className="h-7 w-7 mr-3 text-green-400"/> Contact Information
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
                        </ul>
                    </section>
                    
                    {/* Videos Section */}
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

                    {/* Documentation Section */}
                    <section className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 p-6">
                        <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center"><ClipboardListIcon className="h-7 w-7 mr-3 text-sky-400"/> Documentation</h2>
                        <div className="flex space-x-1 border-b border-slate-700 mb-4">
                            {docTypes.map(type => (
                                <button key={type} onClick={() => setActiveDocTab(type)} className={`px-4 py-2 text-sm font-semibold rounded-t-md transition-colors ${activeDocTab === type ? 'bg-slate-700/50 text-sky-400' : 'text-slate-400 hover:bg-slate-700/30'}`}>
                                    {type}
                                </button>
                            ))}
                        </div>
                        <ul className="space-y-3">
                            {filteredDocs.map(doc => (
                                <li key={doc.id}>
                                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-slate-300 hover:text-sky-400 hover:bg-slate-700/50 p-2 rounded-md transition-colors duration-200 group">
                                        <span>{doc.title}</span>
                                        <DocumentDownloadIcon className="h-5 w-5 text-slate-500 group-hover:text-sky-400 transition-colors"/>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default VendorMicrosite;