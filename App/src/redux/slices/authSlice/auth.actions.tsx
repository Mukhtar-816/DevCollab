// auth.actions.tsx
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api/axios";
import { AxiosError } from "axios";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
}

interface RegisterVerification {
  email : string,
  otp : Number
};

interface User {
  _id: string;
  email: string;
  name: string;
}

interface AuthResponse {
  success: boolean;
  user: User;
  accessToken: string;
}

interface ApiError {
  error: string;
  statusCode?: number;
  details: any
}

export const login = createAsyncThunk<AuthResponse, LoginCredentials, { rejectValue: ApiError }>(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("auth/login", { email, password });
      if (res.data.success) localStorage.setItem("accessToken", res.data.accessToken);
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue({
        error: axiosError.response?.data?.error ?? "Login failed. Please try again.",
        statusCode: axiosError.response?.status ?? 500,
        details: axiosError.response?.data?.details ?? "No Details"
      });
    }
  }
);

export const register = createAsyncThunk<AuthResponse, RegisterCredentials, { rejectValue: ApiError }>(
  "auth/register",
  async ({ email, password, ...data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("auth/register", { email, password, ...data });
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue({
        error: axiosError.response?.data?.error ?? "Register failed. Please try again.",
        statusCode: axiosError.response?.status ?? 500,
        details: axiosError.response?.data?.details ?? "No Details"
      });
    }
  }
);


export const registerVerify = createAsyncThunk<AuthResponse, RegisterVerification, { rejectValue: ApiError }>(
  "auth/register/verify",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
       const res = await axiosInstance.post("auth/register/verify", { email, otp });
       if (res.data?.success) localStorage.setItem("accessToken", res.data?.accessToken);
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue({
        error: axiosError.response?.data?.error ?? "Register Verification. Please try again.",
        statusCode: axiosError.response?.status ?? 500,
        details: axiosError.response?.data?.details ?? "No Details"
      });
    }
  }
);

export const logout = createAsyncThunk<void, void, { rejectValue: ApiError }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("auth/logout");
      if (res.data?.success) localStorage.removeItem("accessToken");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue({
        error: axiosError.response?.data?.error ?? "Logout failed.",
        statusCode: axiosError.response?.status ?? 500,
        details: axiosError.response?.data?.details ?? "No Details"
      });
    }
  }
);