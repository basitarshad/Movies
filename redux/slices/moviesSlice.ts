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
  searchResults: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  upcoming: [],
  searchResults: [],
  loading: false,
  error: null,
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
        state.error = action.error.message || 'Failed to fetch movies';
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
      });
  },
});

export default moviesSlice.reducer;