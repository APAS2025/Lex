import React, { useState, Fragment } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { WaterDropIcon, SearchIcon, ChevronDownIcon, CheckIcon } from './Icons';
import { useAuth } from '../context/AuthContext';
import { users } from '../data/mockData';
import { Menu, Transition } from '@headlessui/react'

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { currentUser, login, logout } = useAuth();

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
              <NavLink to="/" end className={navLinkClassName}>Lexicon</NavLink>
              <NavLink to="/ecosystem" className={navLinkClassName}>Ecosystem</NavLink>
              <NavLink to="/academy" className={navLinkClassName}>Academy</NavLink>
              <NavLink to="/manuals" className={navLinkClassName}>Manuals</NavLink>
              <NavLink to="/droobi-tv" className={navLinkClassName}>Droobi TV</NavLink>
              <NavLink to="/droobi-tv/sessions" className={navLinkClassName}>Sessions</NavLink>
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

            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex items-center rounded-full ring-2 ring-offset-2 ring-offset-slate-900 ring-transparent hover:ring-blue-500 transition-all duration-300 focus:outline-none focus:ring-blue-500">
                  <img src={currentUser.avatarUrl} alt="My Profile" className="h-9 w-9 rounded-full"/>
                   <ChevronDownIcon className="h-4 w-4 text-slate-400 ml-1" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-64 origin-top-right divide-y divide-slate-700 rounded-md bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <div className="px-3 py-2">
                        <p className="text-sm font-semibold text-white">Signed in as</p>
                        <p className="truncate text-sm text-slate-400">{currentUser.name}</p>
                        <p className="truncate text-sm text-slate-400">{currentUser.email}</p>
                    </div>
                     <Menu.Item>
                        {({ active }) => (
                           <Link to={`/profile/${currentUser.id}`} className={`${active ? 'bg-slate-700' : ''} group flex w-full items-center rounded-md px-3 py-2 text-sm text-slate-300`}>
                            My Profile
                           </Link>
                        )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase">Simulate Login</div>
                    {users.filter(u => u.id !== currentUser.id).map(user => (
                       <Menu.Item key={user.id}>
                        {({ active }) => (
                          <button
                            onClick={() => login(user.id)}
                            className={`${active ? 'bg-slate-700' : ''} group flex w-full items-center rounded-md px-3 py-2 text-sm text-slate-300`}
                          >
                           <img src={user.avatarUrl} alt="" className="h-6 w-6 rounded-full mr-2" />
                            Log in as {user.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={`${active ? 'bg-slate-700' : ''} group flex w-full items-center rounded-md px-3 py-2 text-sm text-slate-300`}
                        >
                          Log Out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;