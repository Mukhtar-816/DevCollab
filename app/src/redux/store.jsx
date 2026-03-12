import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice/auth.Slice.jsx";

const store = configureStore({
    reducer : authReducer
});


export default store;