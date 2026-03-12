import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: false,
  error: null,
  accessToken: localStorage.getItem("accessToken") || null,
  user: null,
  loading: false,
};

const userSlice = createSlice({
    name : "userSlice",
    initialState
})