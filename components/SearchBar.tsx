"use client"
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      handleSearch();
    }
  };

  return (
    <div className="relative flex items-center">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search movies..."
          className="pl-10 pr-20 py-2 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600 w-48 md:w-64"
        />
      </div>
      
      {/* Buttons container - only visible when there's input */}
      {searchQuery && (
        <div className="absolute right-2 flex space-x-1">
          <button
            onClick={handleClear}
            className="p-1 hover:text-red-600 transition-colors text-gray-400"
            title="Clear search"
          >
            <X size={16} />
          </button>
          <button
            onClick={handleSearch}
            className="bg-red-600 text-white px-3 py-1 rounded-full text-sm hover:bg-red-700 transition-colors"
          >
            Search
          </button>
        </div>
      )}
    </div>
  );
};
export default SearchBar;