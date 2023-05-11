import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/user/userSlice";
import allUserReducer from "./reducer/user/allUserSlice";
import userDetailReducer from "./reducer/user/userDetailSlice";
import newProductReducer from "./reducer/product/newProductSlice";
import allProductAdmin from "./reducer/product/allProductAdminSlice";
import userHandleReducer from "./reducer/user/userHandle";
import allProductReducer from "./reducer/product/allProductSlice";
import allProductsHomeReducer from "./reducer/product/productsHomeSlice";
import productDetailReducer from "./reducer/product/productDetailSlice";
import newProductReviewReducer from "./reducer/product/productReviewSlice";
import addToCartReducer from "./reducer/product/cartProductSlice";
import newOrderReducer from "./reducer/order/newOrderSlice";
import myOrdersReducer from "./reducer/order/myOrderSlice";
import getOrderDetailReducer from "./reducer/order/orderDetailSlice";
import getAllOrdersReducer from "./reducer/order/allOrdersSlice";
import orderReducer from "./reducer/order/orderSlice";
import productReducer from "./reducer/product/productSlice"
const store = configureStore({
  reducer: {
    user: userReducer,
    allUsers: allUserReducer,
    userDetail: userDetailReducer,
    newProduct: newProductReducer,
    allProductAdmin: allProductAdmin,
    handleUser: userHandleReducer,
    allProducts: allProductReducer,
    productshome: allProductsHomeReducer,
    productDetail: productDetailReducer,
    newReview: newProductReviewReducer,
    cart: addToCartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetail: getOrderDetailReducer,
    allOrders: getAllOrdersReducer,
    order: orderReducer,
    product: productReducer,
  },
});
export default store;
