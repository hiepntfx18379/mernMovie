import { createSlice } from "@reduxjs/toolkit";

export const appStateSlide = createSlice({
  name: "appState",
  initialState: {
    appState: "",
    getGen: "",
    genresList: [],
    movieGenresList: [],
    listLanguage: [],
  },
  reducers: {
    setAppState: (state, action) => {
      state.appState = action.payload;
    },
    setGenresList: (state, { payload }) => {
      state.genresList = payload.genres;
    },
    getGenres: (state, { payload }) => {
      state.getGen = payload;
    },
    setMovieGenresList: (state, { payload }) => {
      state.movieGenresList = payload;
    },
    setListLang: (state, { payload }) => {
      state.listLanguage = payload;
    },
  },
});

export const {
  setAppState,
  setGenresList,
  getGenres,
  setMovieGenresList,
  setListLang,
} = appStateSlide.actions;
