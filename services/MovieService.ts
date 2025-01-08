const API_KEY = '263b730b3bce40a94eb4ef5ed17f32d2';
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genres: { id: number; name: string }[]; 
}


export const movieService = {
  async getMovies(page: number = 1) {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=popularity.desc`
    );
    return response.json();
  },

  async searchMovies(query: string, page: number = 1) {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
    );
    return response.json();
  }
};