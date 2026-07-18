import { createSlice } from "@reduxjs/toolkit";
import { createTask, getProjectTasks } from "./task.actions";

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
    }
});

export default taskSlice.reducer;