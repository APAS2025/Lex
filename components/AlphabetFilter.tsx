import React from 'react';

interface AlphabetFilterProps {
  selectedLetter: string | null;
  onSelectLetter: (letter: string | null) => void;
}

const AlphabetFilter: React.FC<AlphabetFilterProps> = ({ selectedLetter, onSelectLetter }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const getButtonClass = (letter: string | null) => {
    const baseClasses = "flex items-center justify-center font-bold text-slate-300 bg-slate-800/50 rounded-lg ring-1 ring-white/10 hover:bg-slate-700/50 hover:text-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500";
    const sizeClasses = letter === null ? "h-10 px-6 text-sm" : "w-10 h-10 text-lg";
    const activeClasses = selectedLetter === letter ? "bg-blue-600 text-white ring-blue-400 shadow-lg shadow-blue-500/20" : "";
    return `${baseClasses} ${sizeClasses} ${activeClasses}`;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 p-4 bg-slate-900/50 rounded-xl mb-12">
      <button 
        onClick={() => onSelectLetter(null)}
        className={getButtonClass(null)}
        aria-pressed={selectedLetter === null}
      >
        All
      </button>
      <div className="w-px h-8 bg-slate-700 mx-2 hidden sm:block"></div>
      {alphabet.map(letter => (
        <button
          key={letter}
          onClick={() => onSelectLetter(letter)}
          className={getButtonClass(letter)}
          aria-pressed={selectedLetter === letter}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default AlphabetFilter;