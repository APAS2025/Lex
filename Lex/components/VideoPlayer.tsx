
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
    src: string;
    poster: string;
}

const VideoPlayer = ({ src, poster }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        let hls: Hls | null = null;
        const videoElement = videoRef.current;

        if (videoElement) {
            if (Hls.isSupported()) {
                hls = new Hls();
                hls.loadSource(src);
                hls.attachMedia(videoElement);
            } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
                // For Safari, which has native HLS support
                videoElement.src = src;
            }
        }
        
        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, [src]);

    return (
        <div className="aspect-video bg-black rounded-xl mb-6 overflow-hidden ring-1 ring-white/10">
            <video
                ref={videoRef}
                className="w-full h-full"
                controls
                poster={poster}
                preload="metadata"
            />
        </div>
    );
};

export default VideoPlayer;
