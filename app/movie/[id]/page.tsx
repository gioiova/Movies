"use client";
import React, { useEffect, useState } from "react";
import { use } from "react";
import { Movie } from "@/services/MovieService";
import { Star, Heart } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";

const API_KEY = "263b730b3bce40a94eb4ef5ed17f32d2";

export default function MovieDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleFavoriteClick = () => {
    if (!movie) return;
    
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8 text-white">
        <p className="text-center">Movie not found</p>
      </div>
    );
  }

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : "/api/placeholder/500/750";

  return (
    <div className="bg-gray-800 text-white min-h-screen pt-12 flex justify-center items-center">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 justify-items-center">
          <div className="relative">
            <img
              src={imageUrl}
              alt={movie.title}
              className="rounded-lg w-full object-cover shadow-xl transition-transform transform hover:scale-105 max-w-[400px] mx-auto"
            />
            <button
              onClick={handleFavoriteClick}
              className="absolute top-4 right-4 p-3 rounded-full bg-gray-900 bg-opacity-70 hover:bg-opacity-90 transition-colors"
              aria-label={isFavorite(movie.id) ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={`w-8 h-8 ${
                  isFavorite(movie.id) 
                    ? 'text-red-500 fill-current' 
                    : 'text-white'
                }`}
              />
            </button>
          </div>
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-5xl font-extrabold tracking-tight text-red-600">{movie.title}</h1>
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <div className="flex items-center space-x-2">
                <Star className="w-7 h-7 text-yellow-500" />
                <span className="text-xl">{movie.vote_average.toFixed(1)}</span>
              </div>
              <button
                onClick={handleFavoriteClick}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                  isFavorite(movie.id)
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite(movie.id) ? 'fill-current' : ''}`} />
                <span>{isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}</span>
              </button>
            </div>
            <p className="text-lg text-gray-400">
              Release Date: {new Date(movie.release_date).toLocaleDateString()}
            </p>
            <p className="text-xl text-gray-300">{movie.overview}</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-red-600 px-4 py-2 rounded-full text-sm font-semibold uppercase"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}