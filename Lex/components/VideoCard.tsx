
import { Link } from 'react-router-dom';
import type { DroobiVideo } from '../types';
import { PlayIcon } from './Icons';

interface VideoCardProps {
    video: DroobiVideo;
}

const VideoCard = ({ video }: VideoCardProps) => {
    const containerClasses = "block w-64 md:w-72 shrink-0 group relative overflow-hidden rounded-lg shadow-lg";

    return (
        <Link to={`/video/${video.id}`} className={containerClasses}>
            <div className="aspect-video bg-slate-800">
                <img 
                    src={video.thumbnailUrl} 
                    alt={video.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayIcon className="h-16 w-16 text-white/80"/>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                 <h3 className="text-white font-bold truncate">{video.title}</h3>
                 <p className="text-xs text-slate-300">{video.durationMinutes} min</p>
            </div>
        </Link>
    );
};

export default VideoCard;
