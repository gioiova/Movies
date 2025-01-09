"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Movie } from '@/services/MovieService';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';

interface FavoritesContextType {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

export interface MovieCardProps {
    movie: Movie;
  }

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isFavorite: () => false,
});

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    // Load favorites from localStorage on mount
    const storedFavorites = localStorage.getItem('movieFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addToFavorites = (movie: Movie) => {
    setFavorites(prev => {
      const newFavorites = [...prev, movie];
      localStorage.setItem('movieFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const removeFromFavorites = (movieId: number) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(movie => movie.id !== movieId);
      localStorage.setItem('movieFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (movieId: number) => {
    return favorites.some(movie => movie.id === movieId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};



export const useFavorites = () => useContext(FavoritesContext);

// Updated MovieCard component (within MovieGrid.tsx)
const MovieCard = ({ movie }: MovieCardProps) => {
  const router = useRouter();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/api/placeholder/500/750';

  const handleViewDetails = () => {
    router.push(`/movie/${movie.id}`);
  };

  const handleFavoriteClick = () => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={movie.title}
          className="w-full h-96 object-cover"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 rounded-full bg-gray-900 bg-opacity-50 hover:bg-opacity-75 transition-colors"
        >
          <Star
            className={`w-6 h-6 ${
              isFavorite(movie.id) ? 'text-yellow-500 fill-current' : 'text-white'
            }`}
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg truncate">{movie.title}</h3>
        <div className="flex justify-between items-center mt-2">
          <div className="text-gray-400">
            {new Date(movie.release_date).getFullYear()}
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="text-white">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
        <button 
          onClick={handleViewDetails}
          className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
};