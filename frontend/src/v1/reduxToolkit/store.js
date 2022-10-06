import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userSlice";

const store = configureStore({
    reducer: {
        user: userReducer
    }
});

export default store;