import { createSlice } from "@reduxjs/toolkit";

export const loadingSlide = createSlice({
  name: "loadingStatus",
  initialState: {
    loadingStatus: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loadingStatus = action.payload;
    },
  },
});

export const { setLoading } = loadingSlide.actions;
