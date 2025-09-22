
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { DroobiVideo } from '../types';
import VideoCard from '../components/VideoCard';
import { PlayIcon } from '../components/Icons';

const VideoCategoryRow = ({ category, videos }: { category: string; videos: DroobiVideo[] }) => {
    if (videos.length === 0) return null;

    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-100 mb-4 px-4 sm:px-0">
                {category}
            </h2>
            <div className="flex overflow-x-auto space-x-4 lg:space-x-6 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                {videos.map(video => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </section>
    );
};

const DroobiTVHome = () => {
    const { droobiVideos } = useAuth();
    const heroVideo = droobiVideos[0];
    const videoCategories = useMemo(() => [...new Set(droobiVideos.map(v => v.category))], [droobiVideos]);

    return (
        <div className="container mx-auto">
            {/* Hero Section */}
            {heroVideo && (
                 <section className="mb-12 rounded-2xl overflow-hidden ring-1 ring-white/10 relative h-[60vh] flex items-end p-8 bg-cover bg-center" style={{ backgroundImage: `url(${heroVideo.thumbnailUrl})` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
                    <div className="relative z-10 max-w-2xl">
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-4">{heroVideo.title}</h1>
                        <p className="text-slate-300 line-clamp-3 mb-6">{heroVideo.description}</p>
                        <Link 
                            to={`/video/${heroVideo.id}`}
                            className="inline-flex items-center px-8 py-3 bg-white text-slate-900 font-bold rounded-lg shadow-lg hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-white transition text-lg"
                        >
                            <PlayIcon className="h-6 w-6 mr-2"/>
                            Watch Now
                        </Link>
                    </div>
                </section>
            )}
            
            {/* Video Categories */}
            {videoCategories.map(category => (
                <VideoCategoryRow
                    key={category}
                    category={category}
                    videos={droobiVideos.filter(v => v.category === category)}
                />
            ))}
        </div>
    );
};

export default DroobiTVHome;
