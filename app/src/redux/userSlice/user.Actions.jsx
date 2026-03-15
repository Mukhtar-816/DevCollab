import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axios";
import { errorHandler } from "../../utils/error";

export const getUserProfile = createAsyncThunk(
    "user/profile", 
    async (_, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.get("/user/profile");

            if (res.status == 200) {
                localStorage.setItem("user", res.data.profile);
            };

            return res.data;
        } catch (error) {
            const err = errorHandler(error);
            return rejectWithValue(err);
        }
    }
);


