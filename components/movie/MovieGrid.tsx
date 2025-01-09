"use client";
import React from 'react';
import Image from 'next/image';  // Import Image component from next/image
import { useRouter } from 'next/navigation';
import { Movie } from '@/services/MovieService';
import { Star, Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const router = useRouter();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/api/placeholder/500/750';

  const handleViewDetails = () => {
    router.push(`/movie/${movie.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <div className="relative">
        {/* Replace img with Image component */}
        <Image 
          src={imageUrl} 
          alt={movie.title}
          width={500} // You can adjust the width and height as needed
          height={750}
          className="w-full h-96 object-cover"
          layout="responsive"  // This helps with responsive images
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 rounded-full bg-gray-900 bg-opacity-50 hover:bg-opacity-75 transition-colors"
          aria-label={isFavorite(movie.id) ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`w-6 h-6 ${isFavorite(movie.id) ? 'text-red-500 fill-current' : 'text-white'}`}
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
        <div className="flex gap-2 mt-4">
          <button 
            onClick={handleViewDetails}
            className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors"
          >
            View Details
          </button>
          <button
            onClick={handleFavoriteClick}
            className={`flex items-center justify-center px-4 rounded transition-colors ${
              isFavorite(movie.id)
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite(movie.id) ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
}

const MovieGrid = ({ movies, isLoading, onLoadMore, hasMore }: MovieGridProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      {isLoading && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      )}
      
      {!isLoading && hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={onLoadMore}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieGrid;
