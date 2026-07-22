import { createSlice } from "@reduxjs/toolkit";
import {
    acceptInvitation,
    getProjectInvitations,
    getUserInvitations,
    inviteMemberByMail,
    rejectInvitation
} from "./invitation.actions";

const initialState = {
    loading: false,
    error: null,
    success: false,
    projectInvitations: [],
    userInvitations: [],
};

const invitationSlice = createSlice({
    name: "invitation",
    initialState,
    reducers: {
        resetInvitationState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProjectInvitations.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                state.projectInvitations = [];
            })
            .addCase(getProjectInvitations.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.projectInvitations = payload?.invitations || [];
            })
            .addCase(getProjectInvitations.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.success = false;
            })

            .addCase(inviteMemberByMail.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(inviteMemberByMail.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                const newInvitation = payload?.invitation;
                if (newInvitation) {
                    state.projectInvitations.push(newInvitation);
                }
            })
            .addCase(inviteMemberByMail.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.success = false;
            })

            .addCase(getUserInvitations.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;// Clear old data while fetching
            })
            .addCase(getUserInvitations.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.userInvitations = payload?.invitations || [];
            })
            .addCase(getUserInvitations.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.success = false;
            })

            .addCase(acceptInvitation.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(acceptInvitation.fulfilled, (state, { meta }) => {
                state.loading = false;
                state.success = true;
                state.error = null;

                const { projectId, token } = meta?.arg || {};

                if (projectId || token) {
                    state.userInvitations = state.userInvitations.filter(
                        (invitation) =>
                            invitation.projectId !== projectId && invitation.token !== token
                    );
                }
            })
            .addCase(acceptInvitation.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.success = false;
            })

            .addCase(rejectInvitation.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(rejectInvitation.fulfilled, (state, { meta }) => {
                state.loading = false;
                state.success = true;
                state.error = null;

                const { projectId, token } = meta?.arg || {};

                if (projectId || token) {
                    state.userInvitations = state.userInvitations.filter(
                        (invitation) =>
                            invitation.projectId !== projectId && invitation.token !== token
                    );
                    state.projectInvitations = state.projectInvitations.filter(
                        (invitation) =>
                            invitation.projectId !== projectId && invitation.token !== token
                    );
                }
            })
            .addCase(rejectInvitation.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.success = false;
            });
    },
});

export const { resetInvitationState } = invitationSlice.actions;
export default invitationSlice.reducer;