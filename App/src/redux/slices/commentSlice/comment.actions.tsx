import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api/axios";
import { normalizeError } from "../../../utils/getErrorMessage";

export const getTaskComments = createAsyncThunk(
    'comments/get',
    async ({projectId:id, taskId}, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.get(`/project/${id}/tasks/${taskId}/comments`);

            return res.data;
        } catch (error) {
            return rejectWithValue(normalizeError(error));
        }
    }
);

export const postComment = createAsyncThunk(
    'comment/post',
    async ({projectId:id, taskId, commentBody}, {rejectWithValue}) => {
        try {
            const res  = await axiosInstance.post(`/project/${id}/tasks/${taskId}/comments`, {commentBody});

            return res.data;
        } catch (error) {
            return rejectWithValue(normalizeError(error));
        }
    }
);

export const updateComment = createAsyncThunk(
    'comment/patch',
    async ({projectId:id, commentId, commentBody}, {rejectWithValue}) => {
        console.log(commentBody)
        try {
            const res = await axiosInstance.patch(`/project/${id}/comments/${commentId}`, {commentBody});

            return res.data;
        } catch (error) {
            return rejectWithValue(normalizeError(error));
        }
    }
);

export const deleteComment = createAsyncThunk(
    'comment/delete',
    async ({projectId:id, commentId}, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.delete(`/project/${id}/comments/${commentId}`);

            return res.data;
        } catch (error) {
            return rejectWithValue(normalizeError(error));
        }
    }
);