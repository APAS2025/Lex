

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { LexiconTerm } from '../types';
import { initialTerms } from '../data/mockData';
import TermCard from '../components/TermCard';
import Loader from '../components/Loader';
import { generateLexiconEntry } from '../services/geminiService';
import AlphabetFilter from '../components/AlphabetFilter';

const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
    // FIX: Replaced NodeJS.Timeout with ReturnType<typeof setTimeout> for browser compatibility.
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Parameters<F>): void => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), waitFor);
    };
};

const LexiconHome: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');

  const [terms, setTerms] = useState<LexiconTerm[]>(initialTerms);
  const [searchTerm, setSearchTerm] = useState(query || '');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [newTermInput, setNewTermInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleGenerateTerm = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTermInput.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const newTerm = await generateLexiconEntry(newTermInput);
      setTerms((prevTerms) => [newTerm, ...prevTerms]);
      setNewTermInput('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [newTermInput]);

  const handleRateTerm = useCallback((termId: string, rating: number) => {
    setTerms(prevTerms =>
      prevTerms.map(term =>
        term.id === termId ? { ...term, userRating: rating === term.userRating ? 0 : rating } : term
      )
    );
  }, []);

  const updateQuery = (newSearchTerm: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (newSearchTerm.trim()) {
      newParams.set('q', newSearchTerm);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams, { replace: true });
  };
  
  const debouncedUpdateQuery = useCallback(debounce(updateQuery, 300), [searchParams]);

  const handleLocalSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSearchTerm = e.target.value;
      setSearchTerm(newSearchTerm);
      debouncedUpdateQuery(newSearchTerm);
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
         {/* Search Box */}
        <div className="bg-slate-800/50 p-6 rounded-xl ring-1 ring-white/10">
          <label htmlFor="search" className="block text-lg font-bold text-slate-100">Search Lexicon & Industry Partners</label>
          <p className="text-sm text-slate-400 mb-3">Find terms, definitions, vendors, and more.</p>
          <input
            id="search"
            type="text"
            placeholder="e.g., 'Non-Revenue Water' or 'AquaTech'..."
            value={searchTerm}
            onChange={handleLocalSearchChange}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
        
        {/* Gemini Term Generation */}
        <div className="bg-slate-800/50 p-6 rounded-xl ring-1 ring-white/10">
          <form onSubmit={handleGenerateTerm}>
              <label htmlFor="new-term" className="block text-lg font-bold text-slate-100">Suggest a New Term</label>
              <p className="text-sm text-slate-400 mb-3">Use AI to generate a new lexicon entry.</p>
              <div className="flex space-x-2">
              <input
                  id="new-term"
                  type="text"
                  placeholder="e.g., 'Hydraulic Modeling'"
                  value={newTermInput}
                  onChange={(e) => setNewTermInput(e.target.value)}
                  className="flex-grow w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  disabled={isLoading}
              />
              <button
                  type="submit"
                  disabled={isLoading || !newTermInput.trim()}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70 transition"
              >
                  {isLoading ? '...' : 'Generate'}
              </button>
              </div>
          </form>
        </div>
      </div>

      <AlphabetFilter selectedLetter={selectedLetter} onSelectLetter={setSelectedLetter} />
      
      {isLoading && <div className="mb-8"><Loader text={`Generating entry for "${newTermInput}"...`} /></div>}
      {error && <div className="mb-8 p-4 bg-red-900/50 text-red-300 rounded-lg ring-1 ring-red-500/50">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTerms.map((term) => (
          <TermCard key={term.id} term={term} onRate={handleRateTerm} />
        ))}
      </div>
      {filteredTerms.length === 0 && !isLoading && (
        <div className="text-center col-span-full py-12 bg-slate-800/50 rounded-xl ring-1 ring-white/10">
            <h3 className="text-2xl font-bold text-slate-200">No terms found</h3>
            <p className="text-slate-400 mt-2">Try adjusting your search or generating a new term.</p>
        </div>
      )}
    </div>
  );
};

export default LexiconHome;