import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/user/userSlice";
import allUserReducer from "./reducer/user/allUserSlice";
import userDetailReducer from "./reducer/user/userDetailSlice";
import newProductReducer from "./reducer/product/productAdminSlice";
import allProductAdmin from "./reducer/product/allProductAdminSlice";
import userHandle from "./reducer/user/userHandle";
const store = configureStore({
    reducer: {
        user: userReducer,
        allUsers: allUserReducer,
        userDetail: userDetailReducer,
        newproduct: newProductReducer,
        alladminproduct: allProductAdmin,
        handleUser: userHandle
    }
});

export default store;