import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    type: "",
    step: 1,
  },
  reducers: {
    replaceData(state, action) {
      state.step = 1;
      state.type = action.payload;
    },
    nextStep(state, action) {
      state.step = action.payload;
    },
    clearData(state, action) {
      state.type = "";
      state.step = 0;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
