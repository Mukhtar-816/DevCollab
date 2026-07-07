import { createSlice } from "@reduxjs/toolkit";
import {
  initAuth,
  login,
  logout,
  refreshAccessToken,
  register,
  registerVerify,
} from "./auth.actions";

interface ApiError {
  error: string;
  statusCode?: number;
  details?: any;
}

interface AuthState {
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  loading: boolean;
  refreshing: boolean;
  error: ApiError | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isAuthChecked: false,
  loading: false,
  refreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearAuthState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initAuth.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuthChecked = true;
        state.error = null;

        if (payload?.user) {
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
        }
      })
      .addCase(initAuth.rejected, (state, { payload }) => {
        state.loading = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.error = payload as ApiError;
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload: _payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.error = payload as ApiError;
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as ApiError;
      })

      .addCase(registerVerify.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerVerify.fulfilled, (state, { payload: _payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(registerVerify.rejected, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.error = payload as ApiError;
      })

      .addCase(refreshAccessToken.pending, (state) => {
        state.refreshing = true;
        state.error = null;
      })
      .addCase(refreshAccessToken.fulfilled, (state) => {
        state.refreshing = false;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(refreshAccessToken.rejected, (state, { payload }) => {
        state.refreshing = false;
        state.isAuthenticated = false;
        state.error = payload as ApiError;
      })

      .addCase(logout.fulfilled, () => {
        return {
          ...initialState,
          isAuthChecked: true,
        };
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.error = payload as ApiError;
      });
  },
});

export const { clearError, clearAuthState } = authSlice.actions;
export default authSlice.reducer;