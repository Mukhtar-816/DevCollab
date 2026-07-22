import { createSlice } from "@reduxjs/toolkit";
import { deleteComment, getTaskComments, postComment, updateComment } from "./comment.actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    comments: [],
    comment: {}
};


const commentSlice = createSlice({
    name: "commentSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTaskComments.pending, (state) => {
                state.loading = true,
                    state.success = false,
                    state.error = null
            })
            .addCase(getTaskComments.fulfilled, (state, { payload }) => {
                state.loading = false,
                    state.success = true,
                    state.error = null,
                    state.comments = payload.comments
            })
            .addCase(getTaskComments.rejected, (state, { payload }) => {
                state.loading = false,
                    state.success = false,
                    state.error = payload
            })
            .addCase(postComment.pending, (state) => {
                state.loading = true,
                    state.success = false,
                    state.error = null
            })
            .addCase(postComment.fulfilled, (state, { payload }) => {
                state.loading = false,
                    state.success = true,
                    state.error = null,
                    state.comment = payload.comment
                if (payload?.comment) {
                    state.comments?.push(payload?.comment);
                }
            })
            .addCase(postComment.rejected, (state, { payload }) => {
                state.loading = false,
                    state.success = false,
                    state.error = payload
            }).addCase(updateComment.pending, (state) => {
                state.loading = true,
                    state.success = false,
                    state.error = null
            })
            .addCase(updateComment.fulfilled, (state, { payload }) => {
                state.loading = false,
                    state.success = true,
                    state.error = null
                let updated = payload.comment;

                if (updated) {
                    state.comment = updated;

                    const idx = state.comments?.findIndex((c) => c?._id === updated?._id);

                    if (idx !== -1) {
                        state.comments[idx] = updated;
                    }
                }
            })
            .addCase(updateComment.rejected, (state, { payload }) => {
                state.loading = false,
                    state.success = false,
                    state.error = payload
            }).addCase(deleteComment.pending, (state) => {
                state.loading = true,
                    state.success = false,
                    state.error = null
            })
            .addCase(deleteComment.fulfilled, (state, { payload, meta }) => {
                state.loading = false,
                    state.success = true,
                    state.error = null
                let deletedCommentId = meta.arg?.commentId;

                if (deletedCommentId) {
                    state.comments = state.comments?.filter((c) => c?._id !== deletedCommentId);

                    if (deletedCommentId === state.comment?._id) {
                        state.comment = null;
                    }
                }
            })
            .addCase(deleteComment.rejected, (state, { payload }) => {
                state.loading = false,
                    state.success = false,
                    state.error = payload
            })
    }
});


export default commentSlice.reducer;