import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api/axios";
import { normalizeError, type AppError } from "../../../utils/getErrorMessage";
import { getUserProfile } from "../../slices/userSlice/user.actions";
import { clearUserState } from "../../slices/userSlice/user.slice";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
}

interface RegisterVerification {
  email: string;
  otp: string;
}

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

interface RefreshAccessTokenResponse {
  success?: boolean;
  accessToken: string;
}

export const initAuth = createAsyncThunk<
  { user: User },
  void,
  { rejectValue: AppError }
>("auth/initAuth", async (_, { rejectWithValue, dispatch }) => {
  try {
    // wait for profile restore too
    const user = await dispatch(getUserProfile()).unwrap();

    return { user };
  } catch (error) {
    localStorage.removeItem("accessToken");
    return rejectWithValue(normalizeError(error));
  }
});

export const login = createAsyncThunk<
  AuthResponse,
  LoginCredentials,
  { rejectValue: AppError }
>("auth/login", async ({ email, password }, { rejectWithValue, dispatch }) => {
  try {
    const res = await axiosInstance.post("/auth/login", { email, password });

    if (res.data?.success && res.data?.accessToken) {
      localStorage.setItem("accessToken", res.data.accessToken);
    }

    // optional but recommended: immediately hydrate user/profile after login
    await dispatch(getUserProfile()).unwrap();

    return res.data;
  } catch (error) {
    return rejectWithValue(normalizeError(error));
  }
});

export const register = createAsyncThunk<
  AuthResponse,
  RegisterCredentials,
  { rejectValue: AppError }
>("auth/register", async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/auth/register", { email, password });
    return res.data;
  } catch (error) {
    return rejectWithValue(normalizeError(error));
  }
});

export const registerVerify = createAsyncThunk<
  AuthResponse,
  RegisterVerification,
  { rejectValue: AppError }
>(
  "auth/register/verify",
  async ({ email, otp }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.post("/auth/register/verify", {
        email,
        otp,
      });

      if (res.data?.success && res.data?.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
      }

      // optional but recommended: hydrate user/profile after verification login
      await dispatch(getUserProfile()).unwrap();

      return res.data;
    } catch (error) {
      return rejectWithValue(normalizeError(error));
    }
  }
);

export const refreshAccessToken = createAsyncThunk<
  RefreshAccessTokenResponse,
  void,
  { rejectValue: AppError }
>("auth/refresh-access-token", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/auth/refresh-access-token");

    if (res.data?.accessToken) {
      localStorage.setItem("accessToken", res.data.accessToken);
    }

    return res.data;
  } catch (error) {
    localStorage.removeItem("accessToken");
    return rejectWithValue(normalizeError(error));
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: AppError }>(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("accessToken");

      // clear user slice too
      dispatch(clearUserState());
    } catch (error) {
      return rejectWithValue(normalizeError(error));
    }
  }
);