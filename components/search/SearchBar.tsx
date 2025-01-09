"use client";
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { movieService } from '@/services/MovieService';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    // If search query is empty, return to main page
    if (!searchQuery.trim()) {
      router.push('/');
      setLoading(false);
      return;
    }

    try {
      const response = await movieService.searchMovies(searchQuery);
      
      // Check specifically for empty results array from TMDB API
      if (!response.results || response.results.length === 0) {
        setError('Movies of this name is not found');
      }
      
      // Always update the URL to reflect the search
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
      
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setError(null);
    router.push('/');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative flex flex-col">
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

        {loading && <div className="absolute right-0 text-gray-400">Loading...</div>}
      </div>

      {error && (
        <div className="absolute top-12 left-0 text-red-600 bg-gray-800 px-4 py-2 rounded-md shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
