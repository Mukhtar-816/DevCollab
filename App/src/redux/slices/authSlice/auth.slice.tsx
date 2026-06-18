// auth.slice.tsx
import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "./auth.actions";

interface User {
    _id: string;
    email: string;
    name: string;
}

interface ApiError {
    message: string;
    statusCode?: number;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    loading: boolean;
    success: boolean;
    error: ApiError | null;
}

const initialState: AuthState = {
    user: null,
    accessToken: localStorage.getItem("accessToken") ?? null, // rehydrate on refresh
    loading: false,
    success: false,
    error: null,
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
        // ─── Login ───────────────────────────────────────────
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true;
                state.user = payload.user;
                state.accessToken = payload.accessToken;
                state.error = null;
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.loading = false;
                state.success = false;
                state.error = payload ?? { message: "Something went wrong." };
            });

        // ─── Logout ──────────────────────────────────────────
        builder
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
                // still wipe local state even if server logout failed
                state.user = null;
                state.accessToken = null;
                state.error = payload ?? { message: "Logout failed." };
            });
    },
});

export const { clearError, clearAuth } = authSlice.actions;
export default authSlice.reducer;