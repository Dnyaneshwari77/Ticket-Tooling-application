// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
  loading: false,
  error: null,
  avaibality: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest(state) {
      console.log("Authrequest handles");
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      console.log(state, action.payload);
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.avaibality = action.payload.avaibality
        ? action.payload.avaibality
        : null;
      state.loading = false;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.tokenExpiry = null;
      state.loading = false;
      state.error = null;
    },
    changeEmployeeStatus: (state, action) => {
      console.log(action.payload);
      state.avaibality = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  changeEmployeeStatus,
} = authSlice.actions;
export default authSlice.reducer;
