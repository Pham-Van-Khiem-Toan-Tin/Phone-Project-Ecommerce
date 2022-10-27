import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/user/userSlice";
import allUserReducer from "./reducer/user/allUserSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        allUsers: allUserReducer
    }
});

export default store;