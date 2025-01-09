"use client"
import React from 'react';
import { useFavorites } from '@/context/FavoritesContext';
import MovieGrid from '@/components/MovieGrid';

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mt-12">My Favorites</h1>
        {favorites.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p className="text-xl">No favorite movies yet.</p>
            <p className="mt-2">Start adding movies to your favorites list!</p>
          </div>
        ) : (
          <MovieGrid
            movies={favorites}
            isLoading={false}
            onLoadMore={() => {}}
            hasMore={false}
          />
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;