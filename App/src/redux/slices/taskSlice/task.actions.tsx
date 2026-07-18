import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api/axios";
import { normalizeError } from "../../../utils/getErrorMessage";

export const createTask = createAsyncThunk(
    'task/create',
    async ({id, taskData}, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.post(`/project/${id}/task`, {...taskData});

            return res.data;
        } catch (error) {
            return rejectWithValue(normalizeError(error));
        }
    }
);


export const getProjectTasks = createAsyncThunk(
    'task/getall', 
    async ({id}, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.get(`/project/${id}/task`);

            return res.data;
        } catch (error) {
            return rejectWithValue(normalizeError(error));
        }
    }
);