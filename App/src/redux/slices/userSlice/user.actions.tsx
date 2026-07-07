import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api/axios";
import { normalizeError, type AppError } from "../../../utils/getErrorMessage";

export const getUserProfile = createAsyncThunk(
    'user/profile',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("/user/profile");

            if (res.data?.success) localStorage.setItem("user", JSON.stringify(res.data?.user));
            return res?.data;
        } catch (error) {
            return rejectWithValue(normalizeError(error));
        }
    }
);


export const updateUserProfile = createAsyncThunk<any, any, { rejectValue: AppError }>(
    'user/profile/update',
    async ({ data }, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.put("/user/profile", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(normalizeError(error));
        }
    }
);