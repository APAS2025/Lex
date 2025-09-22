
import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import LiveSessionBanner from '../components/LiveSessionBanner';
import SessionCard from '../components/SessionCard';
import OnDemandLibrary from '../components/OnDemandLibrary';

const DroobiTVSessions = () => {
  const { droobiSessions } = useAuth();
  const liveSession = useMemo(() => droobiSessions.find(s => s.isLive), [droobiSessions]);
  const upcomingSessions = useMemo(() => droobiSessions.filter(s => !s.isLive).sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()), [droobiSessions]);

  return (
    <div className="container mx-auto">
      {liveSession && <LiveSessionBanner session={liveSession} />}

      <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight mb-6">
        Upcoming Sessions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {upcomingSessions.map(session => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
      
       {upcomingSessions.length === 0 && (
        <div className="text-center col-span-full py-12 bg-slate-800/50 rounded-xl ring-1 ring-white/10">
            <h3 className="text-2xl font-bold text-slate-200">No upcoming sessions</h3>
            <p className="text-slate-400 mt-2">Check back soon for new events.</p>
        </div>
      )}

      <OnDemandLibrary />
    </div>
  );
};

export default DroobiTVSessions;
