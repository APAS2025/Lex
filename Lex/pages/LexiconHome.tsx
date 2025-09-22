
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { LexiconTerm } from '../types';
import { useAuth } from '../context/AuthContext';
import TermCard from '../components/TermCard';
import AlphabetFilter from '../components/AlphabetFilter';

const LexiconHome = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const { terms } = useAuth();

  const [searchTerm, setSearchTerm] = useState(query || '');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  
  useEffect(() => {
    setSearchTerm(query || '');
  }, [query]);

  const filteredTerms = useMemo(() => {
    const sortedTerms = [...terms].sort((a, b) => a.term.localeCompare(b.term));

    let results = sortedTerms;

    if (selectedLetter) {
      results = results.filter((term) =>
        term.term.trim().toUpperCase().startsWith(selectedLetter)
      );
    }

    if (searchTerm) {
      results = results.filter(
        (term) =>
          term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
          term.plainLanguageDefinition.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return results;
  }, [terms, searchTerm, selectedLetter]);

  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-100 sm:text-5xl md:text-6xl">
          The Living Lexicon
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400">
          The semantic backbone for the public infrastructure sector.
        </p>
      </div>

      <AlphabetFilter selectedLetter={selectedLetter} onSelectLetter={setSelectedLetter} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTerms.map((term) => (
          <TermCard key={term.id} term={term} />
        ))}
      </div>
      {filteredTerms.length === 0 && (
        <div className="text-center col-span-full py-12 bg-slate-800/50 rounded-xl ring-1 ring-white/10">
            <h3 className="text-2xl font-bold text-slate-200">No terms found</h3>
            <p className="text-slate-400 mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default LexiconHome;
