import { createSlice } from "@reduxjs/toolkit";
import { getUserProfile } from "./user.Actions";

const initialState = {
  success: false,
  error: null,
  // accessToken: localStorage.getItem("accessToken") || null,
  user: null,
  loading: false,
};

const userSlice = createSlice({
    name : "userSlice",
    initialState,
    extraReducers : (builder) => {
      builder
      .addCase(getUserProfile.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.profile;
        // console.log(action.payload.profile.name)
        state.success = true
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
      })
    }
});


export default userSlice.reducer;