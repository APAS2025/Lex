import React from 'react';
import type { Session } from '../types';
import { StarIcon, CalendarIcon, ClockIcon, UsersIcon, BookmarkIcon } from './Icons';

interface SessionCardProps {
  session: Session;
}

const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
  const sessionDate = new Date(session.dateTime);
  
  const getCategoryClasses = (category: string) => {
    switch(category) {
      case 'Cybersecurity':
        return 'bg-blue-900/50 text-blue-300 ring-blue-500/30';
      case 'Green Infrastructure':
        return 'bg-green-900/50 text-green-300 ring-green-500/30';
      case 'Treatment Technology':
      default:
        return 'bg-slate-700 text-slate-300 ring-slate-600';
    }
  }

  return (
    <div className="bg-slate-800/50 rounded-2xl ring-1 ring-white/10 flex flex-col overflow-hidden hover:ring-blue-500 transition-all duration-300 group">
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ring-1 ring-inset ${getCategoryClasses(session.category)}`}>
            {session.category}
          </span>
          {session.isPremium && (
            <div className="flex items-center space-x-1.5 bg-yellow-600/20 text-yellow-300 text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ring-inset ring-yellow-500/50">
              <StarIcon className="h-3 w-3" />
              <span>Premium</span>
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">{session.title}</h3>

        {/* Content Body */}
        <div className="mt-4 border-t border-slate-700/50 pt-4 space-y-4 flex-grow flex flex-col">
          {/* Speaker Info */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300 shrink-0">
              {session.speaker.avatarInitials}
            </div>
            <div>
              <p className="font-semibold text-slate-200">{session.speaker.name}</p>
              <p className="text-sm text-slate-400">{session.speaker.affiliation}</p>
            </div>
          </div>

          {/* Session Details */}
          <div className="space-y-2 text-slate-400 text-sm">
            <p className="flex items-center"><CalendarIcon className="h-4 w-4 mr-2" /> {sessionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {sessionDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })}</p>
            <p className="flex items-center"><ClockIcon className="h-4 w-4 mr-2" /> {session.durationMinutes} min</p>
            <p className="flex items-center"><UsersIcon className="h-4 w-4 mr-2" /> {session.registeredAttendees.toLocaleString()} registered</p>
          </div>
          
          {/* Description */}
          <p className="text-slate-400 text-sm line-clamp-3 flex-grow">{session.description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {session.tags.map(tag => (
              <span key={tag} className="text-xs font-medium text-slate-300 bg-slate-700/50 px-2 py-1 rounded-full ring-1 ring-inset ring-slate-600">{tag}</span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer Actions */}
      <div className="px-6 pb-6 mt-auto flex items-center space-x-2 bg-slate-800/20 pt-4 border-t border-slate-700/50">
        <a href={session.joinUrl} className="flex-grow w-full text-center px-4 py-3 bg-[#0d2847] text-white font-bold rounded-lg shadow-md hover:bg-[#11355a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition flex items-center justify-center space-x-2">
          <CalendarIcon className="h-5 w-5" />
          <span>Register</span>
        </a>
        <button className="p-3 bg-slate-700/50 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition">
          <BookmarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SessionCard;
