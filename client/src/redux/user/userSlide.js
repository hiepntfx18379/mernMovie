import { createSlice } from "@reduxjs/toolkit";

export const userSlide = createSlice({
  name: "user",
  initialState: {
    user: null,
    listFavorites: [],
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
      console.log( action.payload);
      const { mediaId } = action.payload;
      state.listFavorites = [...state.listFavorites].filter(
        (f) => f.data.mediaId.toString() !== mediaId.toString()
      );
    },
    addFavorite: (state, action) => {
      state.listFavorites.push(action.payload);
    },
  },
});

export const { setUser, setListFavorites, removeFavorite, addFavorite } =
  userSlide.actions;
