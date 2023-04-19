import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/user/userSlice";
import allUserReducer from "./reducer/user/allUserSlice";
import userDetailReducer from "./reducer/user/userDetailSlice";
import newProductReducer from "./reducer/product/productAdminSlice";
import allProductAdmin from "./reducer/product/allProductAdminSlice";
import userHandle from "./reducer/user/userHandle";
import allProductReducer from "./reducer/product/productSlice";
import allProductsHomeReducer from "./reducer/product/productsHomeSlice";
import productDetailReducer from "./reducer/product/productDetailSlice";
import newProductReviewReducer from "./reducer/product/productReviewSlice";
import addToCartReducer from "./reducer/product/cartProductSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    allUsers: allUserReducer,
    userDetail: userDetailReducer,
    newproduct: newProductReducer,
    alladminproduct: allProductAdmin,
    handleUser: userHandle,
    allproduct: allProductReducer,
    productshome: allProductsHomeReducer,
    productdetail: productDetailReducer,
    newReview: newProductReviewReducer,
    cart: addToCartReducer,
  },
});
export default store;
