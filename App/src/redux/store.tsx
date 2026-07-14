import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice/auth.slice";
import userReducer from "./slices/userSlice/user.slice";
import projectReducer from "./slices/projectSlide/project.slice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        project : projectReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;