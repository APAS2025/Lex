
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { WaterDropIcon } from './Icons';

const Header: React.FC = () => {
  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold transition-colors duration-200 ${
      isActive ? 'text-blue-400' : 'text-slate-300 hover:text-blue-400'
    }`;

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
          
          <nav className="flex items-center space-x-6">
            <NavLink 
              to="/"
              end
              className={navLinkClassName}
            >
              Lexicon
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

        </div>
      </div>
    </header>
  );
};

export default Header;
