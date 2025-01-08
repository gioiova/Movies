"use client";
import React, { useEffect, useState } from "react";
import { use } from "react";
import { Movie } from "@/services/MovieService";
import { Star } from "lucide-react";

const API_KEY = "263b730b3bce40a94eb4ef5ed17f32d2";

export default function MovieDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); 
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="bg-gray-800 text-white min-h-screen pt-12  flex justify-center items-center">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 justify-items-center">
          <div className="relative">
            <img
              src={imageUrl}
              alt={movie.title}
              className="rounded-lg w-full object-cover shadow-xl transition-transform transform hover:scale-105 max-w-[400px] mx-auto"
            />
          </div>
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-5xl font-extrabold tracking-tight text-red-600">{movie.title}</h1>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Star className="w-7 h-7 text-yellow-500" />
              <span className="text-xl">{movie.vote_average.toFixed(1)}</span>
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
