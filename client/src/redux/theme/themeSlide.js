import { createSlice } from "@reduxjs/toolkit";

export const themeModeSlide = createSlice({
  name: "themeMode",
  initialState: {
    themeMode: "dark",
  },
  reducers: {
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
    },
  },
});

export const { setThemeMode } = themeModeSlide.actions;
