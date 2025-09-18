import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { droobiVideos, currentUser } from '../data/mockData';
import { ChevronLeftIcon, ChatAltIcon, PlusIcon } from '../components/Icons';
import Comment from '../components/Comment';
import PlaylistModal from '../components/PlaylistModal';
import VideoPlayer from '../components/VideoPlayer';
import type { Comment as CommentType, Playlist } from '../types';

interface VideoDetailProps {
    onWatch: (videoId: string) => void;
    playlists: Playlist[];
    onToggleInPlaylist: (playlistId: string, videoId: string) => void;
    onCreatePlaylist: (playlistName: string, videoId: string) => void;
}

const VideoDetail: React.FC<VideoDetailProps> = ({ onWatch, playlists, onToggleInPlaylist, onCreatePlaylist }) => {
    const { videoId } = useParams<{ videoId: string }>();
    const video = droobiVideos.find(v => v.id === videoId);

    const [comments, setComments] = useState<CommentType[]>(video?.comments || []);
    const [newCommentText, setNewCommentText] = useState('');
    const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

    useEffect(() => {
        if (video) {
            onWatch(video.id);
        }
    }, [videoId, onWatch, video]);

    const handlePostComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCommentText.trim()) return;

        const newComment: CommentType = {
            id: `c-${Date.now()}`,
            user: currentUser,
            text: newCommentText,
            timestamp: new Date().toISOString(),
            likes: 0,
            replies: [],
        };

        setComments([newComment, ...comments]);
        setNewCommentText('');
    };

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

    const totalCommentCount = comments.reduce((count, comment) => {
        return count + 1 + comment.replies.length;
    }, 0);

    return (
        <div className="container mx-auto">
             <Link to="/droobi-tv" className="inline-flex items-center mb-6 text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-200">
                <ChevronLeftIcon className="h-5 w-5 mr-1" />
                Back to Droobi TV
            </Link>

            {/* Video Player */}
            <VideoPlayer src={video.videoUrl} poster={video.thumbnailUrl} />

            {/* Video Info */}
            <div className="bg-slate-800/50 rounded-xl ring-1 ring-white/10 p-8">
                {video.series && (
                    <p className="text-lg font-bold text-blue-400">{video.series.title}: Episode {video.series.episode}</p>
                )}
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100 mt-1">{video.title}</h1>
                 <p className="mt-2 text-sm font-semibold text-slate-400">
                    {new Date(video.airDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    <span className="mx-2">·</span>
                    {video.durationMinutes} minutes
                </p>
                <p className="mt-6 text-lg text-slate-300 max-w-3xl">{video.description}</p>
                <div className="mt-6 flex items-center space-x-4">
                    <button 
                        onClick={() => setIsPlaylistModalOpen(true)}
                        className="inline-flex items-center px-4 py-2 bg-slate-700/50 text-slate-200 font-semibold rounded-lg shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Add to Playlist
                    </button>
                </div>
            </div>

            {/* Comments Section */}
            <div className="mt-12">
                <h2 className="text-3xl font-bold text-slate-100 mb-6 flex items-center">
                    <ChatAltIcon className="h-8 w-8 mr-3 text-blue-400"/>
                    Discussion ({totalCommentCount})
                </h2>

                {/* New Comment Form */}
                <div className="flex items-start space-x-4 mb-8">
                    <img src={currentUser.avatarUrl} alt={currentUser.name} className="h-12 w-12 rounded-full shrink-0"/>
                    <form onSubmit={handlePostComment} className="flex-grow">
                        <textarea
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                            placeholder="Add a comment..."
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                            rows={3}
                        />
                        <div className="text-right mt-2">
                            <button 
                                type="submit" 
                                disabled={!newCommentText.trim()} 
                                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70 transition"
                            >
                                Post Comment
                            </button>
                        </div>
                    </form>
                </div>

                {/* Comments List */}
                <div className="space-y-8">
                    {comments.map(comment => (
                        <Comment key={comment.id} comment={comment} />
                    ))}
                </div>
            </div>
            {video && (
                <PlaylistModal
                    isOpen={isPlaylistModalOpen}
                    onClose={() => setIsPlaylistModalOpen(false)}
                    video={video}
                    playlists={playlists}
                    onToggleInPlaylist={onToggleInPlaylist}
                    onCreatePlaylist={onCreatePlaylist}
                />
            )}
        </div>
    );
};

export default VideoDetail;