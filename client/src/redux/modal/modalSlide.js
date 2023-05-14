import { createSlice } from "@reduxjs/toolkit";

export const modalStateSlide = createSlice({
  name: "openModal",
  initialState: {
    modalOpen: false,
  },
  reducers: {
    setModalStatus: (state, action) => {
      state.modalOpen = action.payload;
    },
  },
});

export const { setModalStatus } = modalStateSlide.actions;
