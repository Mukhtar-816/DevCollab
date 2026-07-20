import { createSlice } from "@reduxjs/toolkit";
import { createTask, deleteTask, getProjectTasks, getTaskDetails, updateTask, updateTaskStatus } from "./task.actions";

const initialState = {
    success : false,
    loading : false,
    error : null,
    tasks : [],
    task : {}
};


const taskSlice = createSlice({
    name : 'taskSlice',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createTask.pending, (state) => {
            state.loading = true,
            state.success = false,
            state.error =null
        })
        .addCase(createTask.fulfilled, (state, {payload}) => {
            state.loading = false,
            state.success = true,
            state.task = payload.task
        })
        .addCase(createTask.rejected, (state, {payload}) => {
            state.loading = false,
            state.error = payload,
            state.success = false
        })
        .addCase(getProjectTasks.pending, (state) => {
            state.loading = true,
            state.success = false
        })
        .addCase(getProjectTasks.fulfilled, (state, {payload}) => {
            state.loading = false,
            state.success = true,
            state.tasks = payload.tasks
        })
        .addCase(getProjectTasks.rejected, (state, {payload}) => {
            state.loading = false,
            state.error = payload,
            state.success = false
        })
         .addCase(getTaskDetails.pending, (state) => {
            state.loading = true,
            state.success = false
        })
        .addCase(getTaskDetails.fulfilled, (state, {payload}) => {
            state.loading = false,
            state.success = true,
            state.task = payload.task
        })
        .addCase(getTaskDetails.rejected, (state, {payload}) => {
            state.loading = false,
            state.error = payload,
            state.success = false
        })
         .addCase(updateTask.pending, (state) => {
            state.loading = true,
            state.success = false
        })
        .addCase(updateTask.fulfilled, (state, {payload}) => {
            state.loading = false,
            state.success = true,
            state.task = payload.task
        })
        .addCase(updateTask.rejected, (state, {payload}) => {
            state.loading = false,
            state.error = payload,
            state.success = false
        })
         .addCase(deleteTask.pending, (state) => {
            state.loading = true,
            state.success = false
        })
        .addCase(deleteTask.fulfilled, (state, {payload}) => {
            state.loading = false,
            state.success = true
            // state.task = payload.task
        })
        .addCase(deleteTask.rejected, (state, {payload}) => {
            state.loading = false,
            state.error = payload,
            state.success = false
        })
         .addCase(updateTaskStatus.pending, (state) => {
            state.loading = true,
            state.success = false
        })
        .addCase(updateTaskStatus.fulfilled, (state, {payload}) => {
            state.loading = false,
            state.success = true,
            state.task = payload.task
        })
        .addCase(updateTaskStatus.rejected, (state, {payload}) => {
            state.loading = false,
            state.error = payload,
            state.success = false
        })
    }
});

export default taskSlice.reducer;