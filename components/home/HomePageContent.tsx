"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MovieGrid from "@/components/movie/MovieGrid";
import { movieService, Movie } from "@/services/MovieService";
import ProtectedRoute from "@/components/layout/ProdectedRoute";

export const HomePageContent = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const loadMovies = async (page: number, search?: string) => {
    setIsLoading(true);
    try {
      const data = search
        ? await movieService.searchMovies(search, page)
        : await movieService.getMovies(page);

      if (page === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }

      setHasMore(data.page < data.total_pages);
    } catch (error) {
      console.error("Error loading movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    loadMovies(1, searchQuery);
  }, [searchQuery]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    loadMovies(nextPage, searchQuery);
  };

  return (
    <ProtectedRoute>
      <main className="pt-16">
        <MovieGrid
          movies={movies}
          isLoading={isLoading}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
        />
      </main>
    </ProtectedRoute>
  );
};
