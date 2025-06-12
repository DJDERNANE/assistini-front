import { createSlice } from "@reduxjs/toolkit";

const providerSlice = createSlice({
  name: "providers",
  initialState: {
    item: null,
  },
  reducers: {
    replaceData(state, action) {
      state.item = action.payload;
    },
    clearData(state, action) {
      state.item = null;
    },
  },
});

export const providerActions = providerSlice.actions;

export default providerSlice;
