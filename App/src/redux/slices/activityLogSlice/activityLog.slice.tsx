import { createSlice } from "@reduxjs/toolkit";
import { getProjectActivityLogs } from "./activityLog.actions";

const initialState = {
  loading: false,
  success: false,
  error: null,
  logs: [],
  pagination: {
    totalItems: 0,
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    page: 1,
    limit: 10,
  },
};

const activityLogSlice = createSlice({
  name: "activityLog",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    resetLogs: (state) => {
      state.logs = [];
      state.pagination = initialState.pagination;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjectActivityLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getProjectActivityLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        
        // Destructure response payload (adjust keys if backend response structure differs)
        const { logs, pagination } = action.payload;

        // Append logs if page > 1, otherwise replace array
        if (pagination && pagination.currentPage > 1) {
          state.logs = [...state.logs, ...(logs || [])];
        } else {
          state.logs = logs || [];
        }

        if (pagination) {
          state.pagination = {
            ...state.pagination,
            ...pagination,
          };
        }
      })
      .addCase(getProjectActivityLogs.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, resetLogs } = activityLogSlice.actions;
export default activityLogSlice.reducer;