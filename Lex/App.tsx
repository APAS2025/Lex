
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import LexiconHome from './pages/LexiconHome';
import TermDetail from './pages/TermDetail';
import VendorMicrosite from './pages/VendorMicrosite';
import DroobiTVHome from './pages/DroobiTVHome';
import VideoDetail from './pages/VideoDetail';
import UserProfile from './pages/UserProfile';
import DroobiTVSessions from './pages/DroobiTVSessions';
import ManualsLibrary from './pages/ManualsLibrary';
import ManualDetail from './pages/ManualDetail';
import AcademyHome from './pages/AcademyHome';
import FlashcardPlayer from './pages/FlashcardPlayer';
import EducationPathwayDetail from './pages/EducationPathwayDetail';
import EcosystemDirectory from './pages/EcosystemDirectory';
import EntityProfile from './pages/EntityProfile';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="bg-[#0F172A] min-h-screen font-sans text-slate-300">
          <Routes>
            {/* Full-screen route without header/main layout */}
            <Route path="/academy/deck/:deckId" element={<FlashcardPlayer />} />
            
            {/* All other routes use the main layout with Header */}
            <Route
              path="*"
              element={
                <>
                  <Header />
                  <main className="p-4 sm:p-6 lg:p-8">
                    <Routes>
                      <Route path="/" element={<LexiconHome />} />
                      <Route path="/term/:id" element={<TermDetail />} />
                      <Route path="/vendor/:vendorId" element={<VendorMicrosite />} />
                      <Route path="/profile/:userId" element={<UserProfile />} />
                      
                      <Route path="/droobi-tv" element={<DroobiTVHome />} />
                      <Route path="/video/:videoId" element={<VideoDetail />} />
                      <Route path="/droobi-tv/sessions" element={<DroobiTVSessions />} />

                      <Route path="/manuals" element={<ManualsLibrary />} />
                      <Route path="/manual/:manualId" element={<ManualDetail />} />

                      <Route path="/academy" element={<AcademyHome />} />
                      <Route path="/academy/pathway/:pathwayId" element={<EducationPathwayDetail />} />

                      <Route path="/ecosystem" element={<EcosystemDirectory />} />
                      <Route path="/ecosystem/:entityId" element={<EntityProfile />} />
                    </Routes>
                  </main>
                </>
              }
            />
          </Routes>
        </div>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
