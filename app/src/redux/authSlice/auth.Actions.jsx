import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axios";
import { errorHandler } from "../../utils/error";

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/register", data);
      // if (res.success) {
      //   localStorage.setItem("accessToken", res.data.accessToken);
      // };

      return res.data;

    } catch (error) {
      const err = errorHandler(error);
      return rejectWithValue(err);
    }
  }
);

export const registerVerify = createAsyncThunk(
  "auth/register/verify",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/register/verify", {
        email: data.email,
        verificationCode: data.otp
      });
      if (res.status == 200) {
        localStorage.setItem("accessToken", res.data.accessToken);
      };

      return res.data;

    } catch (error) {
      const err = errorHandler(error);
      return rejectWithValue(err);
    }
  }
);


export const login = createAsyncThunk(
  "auth/login",
  async (data, {rejectWithValue}) => {
    try {
      const res = await axiosInstance.post("/auth/login", {
        email : data.email,
        password : data.password
      });

      if (res.status == 200) {
        localStorage.setItem("accessToken", res.data.accessToken);
      };

      return res.data;
    } catch (error) {
      const err = errorHandler(error);
      return rejectWithValue(err);
    }
  }
);


export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken", 
  async (_, {rejectWithValue}) => {
    try {
      const res = await axiosInstance.post("/auth/refresh-access-token");

      if (res.status == 200){
        localStorage.setItem("accessToken", res.data.accessToken);
      };

      return res.data;
    } catch (error) {
      const err = errorHandler(error);
      return rejectWithValue(err);
    }
  }
);


export const logout = createAsyncThunk(
  "auth/logout",
  async (_, {rejectWithValue}) => {
    try {
      const res = await axiosInstance.post("/auth/logout");

      if (res.status == 200){
        localStorage.removeItem("accessToken");
      };

      return res.data;
    } catch (error) {
      localStorage.removeItem("accessToken");
      const err = errorHandler(error);
      return rejectWithValue(err);
    }
  }
);