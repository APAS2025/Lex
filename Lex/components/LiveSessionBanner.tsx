
// FIX: Added missing type import
import type { Session } from '../types';
import { PlayIcon } from './Icons';

interface LiveSessionBannerProps {
  session: Session;
}

const LiveSessionBanner = ({ session }: LiveSessionBannerProps) => {
  return (
    <section className="bg-slate-800/50 rounded-2xl ring-1 ring-white/10 p-6 sm:p-8 mb-12 shadow-2xl shadow-blue-900/10">
      <div className="flex flex-col sm:flex-row items-center sm:space-x-8">
        <div className="relative shrink-0 mb-6 sm:mb-0">
          <div className="w-24 h-24 bg-cyan-500 rounded-full flex items-center justify-center ring-8 ring-cyan-500/20">
            <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="absolute top-0 right-0 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 ring-2 ring-slate-800"></span>
          </span>
        </div>
        <div className="flex-grow text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2">
            <span className="bg-red-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">LIVE NOW</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">{session.title}</h2>
          <p className="text-slate-400 mt-1">
            with {session.speaker.name} • {session.attendees?.toLocaleString()} attendees
          </p>
        </div>
        <a 
          href={session.joinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 sm:mt-0 shrink-0 w-full sm:w-auto px-6 py-3 bg-[#0d2847] text-white font-bold rounded-lg shadow-md hover:bg-[#11355a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          <span>Join Live</span>
        </a>
      </div>
    </section>
  );
};

export default LiveSessionBanner;
