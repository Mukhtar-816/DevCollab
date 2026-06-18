// auth.actions.tsx
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api/axios";
import { AxiosError } from "axios";

interface LoginCredentials {
    email: string;
    password: string;
}

interface AuthResponse {
    success: boolean;
    accessToken: string;
    user: User;
}

interface User {
    _id: string;
    email: string;
    name: string;
}

interface ApiError {
    message: string;
    statusCode?: number;
}

export const login = createAsyncThunk<AuthResponse, LoginCredentials, { rejectValue: ApiError }>(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post<AuthResponse>("auth/login", { email, password });

            if (res.data?.success) {
                localStorage.setItem("accessToken", res.data.accessToken);
            }

            return res.data;
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            return rejectWithValue({
                message: axiosError.response?.data?.message ?? "Login failed. Please try again.",
                statusCode: axiosError.response?.status
            });
        }
    }
);

export const logout = createAsyncThunk<void, void, { rejectValue: ApiError }>(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            await axiosInstance.post("auth/logout");
            localStorage.removeItem("accessToken");
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            localStorage.removeItem("accessToken"); // clear locally regardless
            return rejectWithValue({
                message: axiosError.response?.data?.message ?? "Logout failed.",
                statusCode: axiosError.response?.status
            });
        }
    }
);