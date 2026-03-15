import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice/auth.Slice.jsx";
import userReducer from "./userSlice/user.Slice.jsx";

const store = configureStore({
    reducer : {
        auth : authReducer,
        user : userReducer
    }
});


export default store;