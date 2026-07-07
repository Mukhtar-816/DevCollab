import { createSlice } from "@reduxjs/toolkit";
import { getUserProfile, updateUserProfile } from "./user.actions";

interface User {
  _id: string;
  email: string;
}

interface Profile {
  _id?: string;
  userId?: string;
  name?: string;
  avatar?: string;
  bio?: string;
  skills? : string;
}

interface ApiError {
  error: string;
  statusCode?: number;
  details?: any;
}

interface UserState {
  loading: boolean;
  user: User | null;
  profile: Profile | null;
  error: ApiError | null;
  success: boolean;
}

const initialState: UserState = {
  loading: false,
  user: null,
  profile: null,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.user = payload.user;
        state.profile = payload.profile ?? null;
        state.error = null;
      })
      .addCase(getUserProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.success = false;
        state.error = payload as ApiError;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        // state.user = payload.user;
        state.profile = payload.profile ?? null;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.success = false;
        state.error = payload as ApiError;
      });
  },
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;