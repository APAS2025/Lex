
import React, { useState } from 'react';
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
    DocumentDownloadIcon
} from '../components/Icons';

const VendorMicrosite: React.FC = () => {
    const { vendorId } = useParams<{ vendorId: string }>();
    const vendor = vendors.find(v => v.id === vendorId);

    const docTypes = vendor ? [...new Set(vendor.documentation.map(d => d.type))] : [];
    const [activeDocTab, setActiveDocTab] = useState(docTypes[0]);
    
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
                    {/* Videos Section */}
                    <section>
                        <h2 className="text-3xl font-bold text-slate-100 mb-4 flex items-center"><VideoCameraIcon className="h-8 w-8 mr-3 text-purple-400"/> Videos</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {vendor.videos.map(video => (
                                <a key={video.id} href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="group block bg-slate-800/50 rounded-xl overflow-hidden ring-1 ring-white/10 hover:ring-purple-500 transition-all duration-300">
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
                </div>

                <div className="space-y-8">
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
                    
                    {/* Past Webinars Section */}
                     <section className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 p-6">
                        <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center"><PresentationChartBarIcon className="h-7 w-7 mr-3 text-indigo-400"/> Past Webinars</h2>
                        <ul className="space-y-4">
                            {pastWebinars.map(webinar => (
                                <li key={webinar.id}>
                                    <a href={webinar.url} target="_blank" rel="noopener noreferrer" className="block group">
                                        <h4 className="font-semibold text-slate-200 group-hover:text-indigo-400">{webinar.title}</h4>
                                        <p className="text-sm text-slate-400">{new Date(webinar.dateTime).toLocaleDateString()}</p>
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
