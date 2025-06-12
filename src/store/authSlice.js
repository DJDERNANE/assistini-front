import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userRole: "", // e.g., 'admin', 'user', 'guest'
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSlice: (state, action) => {
      state.isAuthenticated = true;
      state.userRole = action.payload.userRole;
      state.userData = action.payload.userData;
    },
    logoutSlice: (state) => {
      state.isAuthenticated = false;
      state.userRole = "";
      state.userData = null;
    },
  },
});

export const { loginSlice, logoutSlice } = authSlice.actions;
export default authSlice.reducer;
