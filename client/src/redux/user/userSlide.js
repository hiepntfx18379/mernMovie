import { createSlice, current} from "@reduxjs/toolkit";
import {original} from 'immer'

export const userSlide = createSlice({
  name: "user",
  initialState: {
  user: null,
  listFavorites: []
},
  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) {
        localStorage.removeItem("actkn");
      } else {
        if (action.payload.data.token)
          localStorage.setItem("actkn", action.payload.data.token);
      }
      state.user = action.payload;
    },
    setListFavorites: (state, action) => {
      state.listFavorites = action.payload;
    },
    removeFavorite: (state, action) => {
      const {mediaId} = action.payload;
      state.listFavorites = [current(state.listFavorites)].filter(
        (f) => `${f.mediaId}` !== `${mediaId}`
      );
    },
    addFavorite: (state, {payload}) => {
      state.listFavorites = [payload.data, current(state.listFavorites)]
    },
  },
});

export const { setUser, setListFavorites, removeFavorite, addFavorite } =
  userSlide.actions;
