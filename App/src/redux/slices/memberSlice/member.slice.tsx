import { createSlice } from "@reduxjs/toolkit";
import { getProjectMembers } from "./member.actions";

const initialState = {
    loading: false,
    error : null,
    success : false,
    members : []
}


const memberSlice = createSlice({
    name:'memberSlice',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(getProjectMembers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getProjectMembers.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.success = true,
            state.error = null;
            state.members = payload.members;
        })
        .addCase(getProjectMembers.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
        })
    }
});

export default memberSlice.reducer;