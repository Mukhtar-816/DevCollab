import { createSlice } from "@reduxjs/toolkit";
import { login, register, registerVerify, logout, refreshAccessToken } from "./auth.Actions";

const initialState = {
  success: false,
  error: null,
  accessToken: localStorage.getItem("accessToken") || null,
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthStatus: (state) => {
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      /* --- REGISTER --- */
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* --- REGISTER VERIFY --- */
      .addCase(registerVerify.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerVerify.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(registerVerify.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* --- LOGIN --- */
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* --- LOGOUT (Async) --- */
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.accessToken = null;
        state.user = null;
        state.success = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        // Even if server logout fails, we usually clear local state
        state.accessToken = null;
        state.user = null;
        state.error = action.payload;
      })

      .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.success = true;
        state.error = null;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.loading = false;
        state.accessToken = null;
        state.user = null;
        state.error = action.payload;
      })
  },
});

export const { clearAuthStatus } = authSlice.actions;
export default authSlice.reducer;