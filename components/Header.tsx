import exp from 'constants';
import React from 'react';
import { Search, Heart, User } from 'lucide-react';
import SearchBar from './SearchBar';

const Header = () => {
    return (
      <header className="fixed top-0 w-full bg-black bg-opacity-90 text-white z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-red-600">MovieList</h1>
            <div className="hidden md:flex space-x-6">
              <a href="/" className="hover:text-red-600 transition-colors">Home</a>
              <a href="/favorites" className="hover:text-red-600 transition-colors">Favorites</a>
              <a href="/genres" className="hover:text-red-600 transition-colors">Genres</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <SearchBar/>
            <a href="/favorites" className="p-2 hover:text-red-600 transition-colors">
              <Heart size={20} />
            </a>
            <a href="/signup" className="p-2 hover:text-red-600 transition-colors">
              <User size={20} />
            </a>
          </div>
        </nav>
      </header>
    );
  };
export default Header;