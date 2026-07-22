import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice/auth.slice";
import userReducer from "./slices/userSlice/user.slice";
import projectReducer from "./slices/projectSlide/project.slice";
import projectMemberReducer from "./slices/memberSlice/member.slice";
import invitationReducer from "./slices/invitationSlice/invitation.slice"
import projectTaskReducer from "./slices/taskSlice/task.slice"
import projectTaskCommentReducer from "./slices/commentSlice/comment.slice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        project: projectReducer,
        projectMembers: projectMemberReducer,
        invitations: invitationReducer,
        projectTasks: projectTaskReducer,
        projectTaskComments: projectTaskCommentReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;