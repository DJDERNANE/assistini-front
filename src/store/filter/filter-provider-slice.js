import { createSlice } from "@reduxjs/toolkit";

const providerFilterSlice = createSlice({
  name: "filterProviders",
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

export const providerFilterActions = providerFilterSlice.actions;

export default providerFilterSlice;
