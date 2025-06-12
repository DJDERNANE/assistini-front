import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    item: null,
  },
  reducers: {
    replaceData(state, action) {
      state.item = action;
    },
    clearData(state, action) {
      state.item = null;
    },
  },
});

export const alertActions = alertSlice.actions;

export default alertSlice;
