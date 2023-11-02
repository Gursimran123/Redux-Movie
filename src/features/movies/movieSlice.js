import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../api/movieApi";
import { APIKey } from "../../api/movieApiKey";

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async(term)=>{
       const response = await movieApi.get(
         `?apiKey=${APIKey}&s=${term}&type=movie`
       );
       return response.data
});

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async(term)=>{
       const response = await movieApi.get(
         `?apiKey=${APIKey}&s=${term}&type=series`
       );
       return response.data
});

export const fetchAsyncMovieOrShowDetail = createAsyncThunk('movies/fetchAsyncMovieOrShowDetail', async(id)=>{
       const response = await movieApi.get(
         `?apiKey=${APIKey}&i=${id}&Plot=full`
       );
       return response.data
});

const initialState={
    movies:{},
    shows:{},
    selectMovieOrShow:{},
    loading:false,
}

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: (state) => {
      console.log("Pending");
      state.loading = true;
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, movies: payload, loading: false };
    },
    [fetchAsyncMovies.rejected]: (state) => {
      console.log("Rejected!");
      state.loading = false;
    },
    [fetchAsyncShows.pending]: (state) => {
      console.log("Fetched Successfully");
      state.loading=true;
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, shows: payload,loading:false };
    },
    [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, selectMovieOrShow: payload };
    },
  },
});

export const {removeSelectedMovieOrShow}=movieSlice.actions;
export const getAllMovies= (state) => state.movies.movies;
export const getAllShows= (state) => state.movies.shows;
export const getSelectedMovieOrShow= (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;