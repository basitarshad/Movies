import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  genres: { id: number; name: string }[];
}

interface MoviesState {
  upcoming: Movie[];
  allMovies: Movie[];
  searchResults: Movie[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: MoviesState = {
  upcoming: [],
  allMovies: [],
  searchResults: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

export const fetchUpcomingMovies = createAsyncThunk(
  'movies/fetchUpcoming',
  async () => {
    const response = await axios.get(
      'https://api.themoviedb.org/3/movie/upcoming',
      { params: { api_key: '024d69b581633d457ac58359146c43f6' } }
    );
    return response.data.results;
  }
);

export const searchMovies = createAsyncThunk(
  'movies/search',
  async (query: string) => {
    const response = await axios.get(
      'https://api.themoviedb.org/3/search/movie',
      { params: { api_key: '024d69b581633d457ac58359146c43f6', query } }
    );
    return response.data.results;
  }
);

export const fetchAllMovies = createAsyncThunk('movies/fetchAll', async (page = 1) => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/movie/popular',
    { params: { api_key: '024d69b581633d457ac58359146c43f6', page } }
  );
  return { results: response.data.results, totalPages: response.data.total_pages };
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.upcoming = action.payload;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch upcoming movies';
      })
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search movies';
      })
      .addCase(fetchAllMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.allMovies = [...state.allMovies, ...action.payload.results];
        state.currentPage = state.currentPage + 1;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAllMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch all movies';
      });
  },
});

export default moviesSlice.reducer;