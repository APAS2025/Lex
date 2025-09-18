
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LexiconHome from './pages/LexiconHome';
import TermDetail from './pages/TermDetail';
import Header from './components/Header';
import VendorMicrosite from './pages/VendorMicrosite';

function App() {
  return (
    <HashRouter>
      <div className="bg-[#0F172A] min-h-screen font-sans text-slate-300">
        <Header />
        <main className="p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<LexiconHome />} />
            <Route path="/term/:id" element={<TermDetail />} />
            <Route path="/vendor/:vendorId" element={<VendorMicrosite />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
