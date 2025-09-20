import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { WaterDropIcon, SearchIcon } from './Icons';
import { currentUser } from '../data/mockData';

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold transition-colors duration-200 ${
      isActive ? 'text-blue-400' : 'text-slate-300 hover:text-blue-400'
    }`;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
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
            <nav className="hidden md:flex items-center space-x-6">
              <NavLink 
                to="/"
                end
                className={navLinkClassName}
              >
                Lexicon
              </NavLink>
              <NavLink 
                to="/academy" 
                className={navLinkClassName}
              >
                Academy
              </NavLink>
              <NavLink 
                to="/manuals" 
                className={navLinkClassName}
              >
                Manuals
              </NavLink>
              <NavLink 
                to="/droobi-tv" 
                className={navLinkClassName}
              >
                Droobi TV
              </NavLink>
              <NavLink 
                to="/droobi-tv/sessions" 
                className={navLinkClassName}
              >
                Sessions
              </NavLink>
            </nav>

            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-32 sm:w-48 pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 focus:w-48 sm:focus:w-56"
                aria-label="Search application"
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
            </form>

            <Link to={`/profile/${currentUser.id}`} className="ml-2" aria-label="View my profile">
                <img src={currentUser.avatarUrl} alt="My Profile" className="h-9 w-9 rounded-full ring-2 ring-offset-2 ring-offset-slate-900 ring-transparent hover:ring-blue-500 transition-all duration-300"/>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;