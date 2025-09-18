import React, { useState, useCallback } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LexiconHome from './pages/LexiconHome';
import TermDetail from './pages/TermDetail';
import Header from './components/Header';
import VendorMicrosite from './pages/VendorMicrosite';
import DroobiTVHome from './pages/DroobiTVHome';
import VideoDetail from './pages/VideoDetail';
import { initialWatchHistory, initialPlaylists } from './data/mockData';
import type { Playlist } from './types';

function App() {
  const [watchHistory, setWatchHistory] = useState<string[]>(initialWatchHistory);
  const [playlists, setPlaylists] = useState<Playlist[]>(initialPlaylists);

  const handleAddToHistory = useCallback((videoId: string) => {
    setWatchHistory(prev => {
      const newHistory = prev.filter(id => id !== videoId);
      return [videoId, ...newHistory];
    });
  }, []);

  const handleToggleInPlaylist = useCallback((playlistId: string, videoId: string) => {
    setPlaylists(prev => prev.map(pl => {
      if (pl.id === playlistId) {
        const videoExists = pl.videoIds.includes(videoId);
        const newVideoIds = videoExists
          ? pl.videoIds.filter(id => id !== videoId)
          : [videoId, ...pl.videoIds];
        return { ...pl, videoIds: newVideoIds };
      }
      return pl;
    }));
  }, []);

  const handleCreatePlaylist = useCallback((playlistName: string, videoId: string) => {
    if (!playlistName.trim()) return;
    const newPlaylist: Playlist = {
      id: `pl${Date.now()}`,
      name: playlistName,
      videoIds: [videoId],
    };
    setPlaylists(prev => [newPlaylist, ...prev]);
  }, []);

  return (
    <HashRouter>
      <div className="bg-[#0F172A] min-h-screen font-sans text-slate-300">
        <Header />
        <main className="p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<LexiconHome />} />
            <Route path="/term/:id" element={<TermDetail />} />
            <Route path="/vendor/:vendorId" element={<VendorMicrosite />} />
            <Route path="/droobi-tv" element={<DroobiTVHome watchHistoryIds={watchHistory} playlists={playlists} />} />
            <Route path="/video/:videoId" element={
              <VideoDetail 
                onWatch={handleAddToHistory}
                playlists={playlists}
                onToggleInPlaylist={handleToggleInPlaylist}
                onCreatePlaylist={handleCreatePlaylist}
              />} 
            />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
