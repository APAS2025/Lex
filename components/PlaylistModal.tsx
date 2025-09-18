import React, { useState } from 'react';
import type { DroobiVideo, Playlist } from '../types';
import { XIcon, CheckIcon } from './Icons';

interface PlaylistModalProps {
    isOpen: boolean;
    onClose: () => void;
    video: DroobiVideo;
    playlists: Playlist[];
    onToggleInPlaylist: (playlistId: string, videoId: string) => void;
    onCreatePlaylist: (playlistName: string, videoId: string) => void;
}

const PlaylistModal: React.FC<PlaylistModalProps> = ({ isOpen, onClose, video, playlists, onToggleInPlaylist, onCreatePlaylist }) => {
    const [newPlaylistName, setNewPlaylistName] = useState('');

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPlaylistName.trim()) return;
        onCreatePlaylist(newPlaylistName, video.id);
        setNewPlaylistName('');
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                className="bg-slate-800 rounded-xl ring-1 ring-white/10 w-full max-w-md p-6 relative shadow-2xl shadow-blue-500/10"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                    <XIcon className="h-6 w-6" />
                </button>
                <h2 className="text-2xl font-bold text-white mb-4">Add to playlist</h2>
                
                <ul className="space-y-2 max-h-60 overflow-y-auto mb-6 pr-2 -mr-2">
                    {playlists.map(pl => {
                        const isInPlaylist = pl.videoIds.includes(video.id);
                        return (
                            <li key={pl.id}>
                                <button
                                    onClick={() => onToggleInPlaylist(pl.id, video.id)}
                                    className={`w-full text-left p-3 rounded-md transition-all duration-200 flex items-center justify-between ${isInPlaylist ? 'bg-blue-600/30 text-blue-300 ring-1 ring-inset ring-blue-500/50' : 'bg-slate-700/50 hover:bg-slate-700'}`}
                                >
                                    <span className="font-semibold">{pl.name}</span>
                                    {isInPlaylist && <CheckIcon className="h-5 w-5" />}
                                </button>
                            </li>
                        )
                    })}
                     {playlists.length === 0 && (
                        <p className="text-slate-400 text-center py-4">You don't have any playlists yet.</p>
                    )}
                </ul>
                
                <form onSubmit={handleCreate}>
                    <label htmlFor="new-playlist" className="text-sm font-semibold text-slate-300 mb-2 block">Create new playlist</label>
                    <div className="flex space-x-2">
                        <input
                            id="new-playlist"
                            type="text"
                            value={newPlaylistName}
                            onChange={e => setNewPlaylistName(e.target.value)}
                            placeholder="e.g., 'Watch Later'"
                            className="flex-grow w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                        <button 
                            type="submit" 
                            disabled={!newPlaylistName.trim()} 
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70 transition"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PlaylistModal;
