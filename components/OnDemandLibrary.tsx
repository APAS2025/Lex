import React from 'react';
import { onDemandSessions } from '../data/mockData';
import OnDemandCard from './OnDemandCard';

const OnDemandLibrary: React.FC = () => {
  return (
    <section className="mt-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">
          On-Demand Library
        </h2>
        <a
          href="#"
          className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold rounded-lg shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition-colors"
        >
          View All Sessions
        </a>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {onDemandSessions.map(session => (
          <OnDemandCard key={session.id} session={session} />
        ))}
      </div>
    </section>
  );
};

export default OnDemandLibrary;
