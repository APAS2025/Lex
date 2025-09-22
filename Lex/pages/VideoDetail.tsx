
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChevronLeftIcon } from '../components/Icons';
import VideoPlayer from '../components/VideoPlayer';

const VideoDetail = () => {
    const { videoId } = useParams<{ videoId: string }>();
    const { droobiVideos } = useAuth();
    const video = droobiVideos.find(v => v.id === videoId);

    if (!video) {
        return (
            <div className="text-center container mx-auto">
                <h2 className="text-2xl font-bold text-slate-100">Video not found</h2>
                <Link to="/droobi-tv" className="mt-4 inline-flex items-center text-blue-400 hover:underline">
                     <ChevronLeftIcon className="h-5 w-5 mr-1" />
                    Back to Droobi TV
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-4xl">
             <Link to="/droobi-tv" className="inline-flex items-center mb-6 text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-200">
                <ChevronLeftIcon className="h-5 w-5 mr-1" />
                Back to Droobi TV
            </Link>

            {/* Video Player */}
            <VideoPlayer src={video.videoUrl} poster={video.thumbnailUrl} />

            {/* Video Info */}
            <div className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 p-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100">{video.title}</h1>
                 <p className="mt-2 text-sm font-semibold text-slate-400">
                    {new Date(video.airDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    <span className="mx-2">·</span>
                    {video.durationMinutes} minutes
                </p>
                <p className="mt-6 text-lg text-slate-300">{video.description}</p>
            </div>
        </div>
    );
};

export default VideoDetail;
