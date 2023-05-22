import { createSlice } from "@reduxjs/toolkit";

export const appStateSlide = createSlice({
  name: "appState",
  initialState: {
    appState: "",
    getGen:"",
    genresList: [],
    movieGenresList: []
  },
  reducers: {
    setAppState: (state, action) => {
      state.appState = action.payload;
    },
    setGenresList: (state, {payload}) => {
      state.genresList = payload.genres;
    },
    getGenres: (state, {payload}) => {
      state.getGen = payload
    },
    setMovieGenresList: (state, {payload}) => {
      state.movieGenresList = payload
    }
  },
});

export const { setAppState, setGenresList, getGenres, setMovieGenresList } = appStateSlide.actions;
