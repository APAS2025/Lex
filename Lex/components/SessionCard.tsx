
// FIX: Added missing type import
import type { Session } from '../types';
// FIX: Added missing icon imports
import { StarIcon, CalendarIcon, ClockIcon, UsersIcon, BookmarkIcon } from './Icons';

interface SessionCardProps {
  session: Session;
}

const SessionCard = ({ session }: SessionCardProps) => {
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
              <p className="text-xs text-slate-400">{session.speaker.affiliation}</p>
            </div>
          </div>
          <p className="text-sm text-slate-400 line-clamp-3 flex-grow">{session.description}</p>
        </div>
      </div>

      <div className="mt-auto px-6 py-4 bg-slate-900/50 border-t border-slate-700/50">
        <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2 text-slate-300">
                <CalendarIcon className="h-4 w-4 text-slate-400"/>
                <span>{sessionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
                <ClockIcon className="h-4 w-4 text-slate-400"/>
                <span>{sessionDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
            </div>
             <div className="flex items-center space-x-2 text-slate-300 col-span-2">
                <UsersIcon className="h-4 w-4 text-slate-400"/>
                <span>{session.registeredAttendees.toLocaleString()} registered</span>
            </div>
        </div>
      </div>

       <a href={session.joinUrl} className="block bg-slate-700/80 group-hover:bg-blue-600 transition-colors duration-300 px-6 py-3 text-center">
            <div className="flex justify-center items-center text-white font-semibold">
                <span>Register Now</span>
                <BookmarkIcon className="h-5 w-5 ml-2" />
            </div>
        </a>
    </div>
  );
};

export default SessionCard;
