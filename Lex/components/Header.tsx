
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { WaterDropIcon, SearchIcon } from './Icons';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [searchTerm, setSearchTerm] = useState(query || '');
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    // Syncs the search bar with the URL's query param
    // e.g., when using browser back/forward or landing on a bookmarked search
    setSearchTerm(query || '');
  }, [query]);

  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold transition-colors duration-200 ${
      isActive ? 'text-blue-400' : 'text-slate-300 hover:text-blue-400'
    }`;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to lexicon home with search query
      navigate(`/?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/');
    }
  };

  return (
    <header className="bg-[#0F172A]/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3">
              <WaterDropIcon className="h-8 w-8 text-blue-400" />
              <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
                The Language of Water
              </h1>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-5">
              <NavLink to="/" end className={navLinkClassName}>Lexicon</NavLink>
              <NavLink to="/ecosystem" className={navLinkClassName}>Ecosystem</NavLink>
              <NavLink to="/manuals" className={navLinkClassName}>Manuals</NavLink>
              <NavLink to="/academy" className={navLinkClassName}>Academy</NavLink>
              <NavLink to="/droobi-tv" className={navLinkClassName}>Droobi TV</NavLink>
            </nav>

            <form onSubmit={handleSearchSubmit} className="relative hidden sm:block">
              <input
                type="search"
                placeholder="Search Lexicon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 focus:w-56"
                aria-label="Search application"
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
            </form>

            <div className="w-px h-6 bg-slate-700 hidden sm:block"></div>

            <div className="flex items-center">
                <Link to={`/profile/${currentUser.id}`} className="block" aria-label="View your profile">
                    <img src={currentUser.avatarUrl} alt={currentUser.name} className="h-9 w-9 rounded-full ring-2 ring-slate-600 hover:ring-blue-400 transition-all"/>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
