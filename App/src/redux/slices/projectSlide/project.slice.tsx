import { createSlice } from "@reduxjs/toolkit";
import { createProject, deleteProject, getProjectById, getUserProjects, updateProject } from "./project.actions";


const initialState = {
    loading : false,
    success : false,
    error : null,
    project : {},
    projects : [],
};

const projectSlice = createSlice({
    name : "project",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createProject.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })
        .addCase(createProject.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.project = payload.project;
        })
        .addCase(createProject.rejected, (state, {payload}) => {
            state.loading = false;
            state.success = false;
            state.error = payload;
        })
        .addCase(getUserProjects.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })
        .addCase(getUserProjects.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.error = null;
            state.projects = payload.projects;
            state.success = true;
        })
        .addCase(getUserProjects.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
        })
        .addCase(getProjectById.pending, (state) => {
            state.loading = true;
            state.error= null;
            state.success = false;
        })
        .addCase(getProjectById.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.project = payload.project;
        })
        .addCase(getProjectById.rejected, (state, {payload}) => {
            state.loading = false;
            state.success = false;
            state.error = payload;
        })
        .addCase(updateProject.pending, (state) => {
            state.loading = true;
            state.error= null;
            state.success = false;
        })
        .addCase(updateProject.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.project = payload.project;
        })
        .addCase(updateProject.rejected, (state, {payload}) => {
            state.loading = false;
            state.success = false;
            state.error = payload;
        })
        .addCase(deleteProject.pending, (state) => {
            state.loading = true;
            state.error= null;
            state.success = false;
        })
        .addCase(deleteProject.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            // state.project = payload.project;
        })
        .addCase(deleteProject.rejected, (state, {payload}) => {
            state.loading = false;
            state.success = false;
            state.error = payload;
        })
    }
});


export default projectSlice.reducer;