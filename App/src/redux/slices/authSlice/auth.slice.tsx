// auth.slice.tsx
import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register, registerVerify } from "./auth.actions";

interface User {
  _id: string;
  email: string;
  name: string;
}

interface ApiError {
  error: string;
  statusCode?: number;
  details : any
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  success: boolean;
  error: ApiError | null;
  pendingMode: "login" | "register" | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  success: false,
  error: null,
  pendingMode: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearAuth(state) {
      state.user = null;
      state.accessToken = null;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.pendingMode = "login";
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.user = payload.user;
        state.accessToken = payload.accessToken;
        state.error = null;
        state.pendingMode = null;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
        state.pendingMode = null;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.pendingMode = "register";
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.user = payload.user;
        state.accessToken = payload.accessToken;
        state.error = null;
        state.pendingMode = null;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
        state.pendingMode = null;
      })
      .addCase(registerVerify.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.pendingMode = "registerVerify";
      })
      .addCase(registerVerify.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.user = payload.user;
        state.accessToken = payload.accessToken;
        state.error = null;
        state.pendingMode = null;
      })
      .addCase(registerVerify.rejected, (state, { payload }) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
        state.pendingMode = null;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.success = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.error = payload;
      });
  },
});

export const { clearError, clearAuth } = authSlice.actions;
export default authSlice.reducer;