import { createSlice } from "@reduxjs/toolkit";
import { acceptInvitation, getProjectInvitations, getUserInvitations, inviteMemberByMail, rejectInvitation } from "./invitation.actions";

const initialState = {
    loading: false,
    error: null,
    success: false,
    projectInvitations: [],
    userInvitations: []
}


const invitationSlice = createSlice({
    name: 'invitationSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProjectInvitations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProjectInvitations.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true,
                    state.error = null;
                state.projectInvitations = payload.invitations;
            })
            .addCase(getProjectInvitations.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.success = false;
            })
            .addCase(inviteMemberByMail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(inviteMemberByMail.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true,
                    state.error = null;
                // state.invitations = payload.invitations;
            })
            .addCase(inviteMemberByMail.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.success = false;
            })
            .addCase(getUserInvitations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserInvitations.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true,
                    state.error = null;
                state.userInvitations = payload.invitations;
            })
            .addCase(getUserInvitations.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.success = false;
            })
            .addCase(acceptInvitation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(acceptInvitation.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true,
                state.error = null;
                // state.userInvitations = payload.invitations;            
            })
            .addCase(acceptInvitation.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.success = false;
            })
            .addCase(rejectInvitation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(rejectInvitation.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true,
                state.error = null;
                // state.userInvitations = payload.invitations;            
            })
            .addCase(rejectInvitation.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.success = false;
            })
    }
});

export default invitationSlice.reducer;