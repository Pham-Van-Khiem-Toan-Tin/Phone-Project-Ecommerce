import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/user/userSlice";
import allUserReducer from "./reducer/user/allUserSlice";
import forgotPasswordReducer from "./reducer/user/forgotPasswordSlice";
import userDetailReducer from "./reducer/user/userDetailSlice";
import newProductReducer from "./reducer/product/newProductSlice";
import allProductAdmin from "./reducer/product/allProductAdminSlice";
import userHandleReducer from "./reducer/user/userHandle";
import allProductReducer from "./reducer/product/allProductSlice";
import allProductsHomeReducer from "./reducer/product/productsHomeSlice";
import productDetailReducer from "./reducer/product/productDetailSlice";
import newProductReviewReducer from "./reducer/product/newReviewSlice";
import addToCartReducer from "./reducer/product/cartProductSlice";
import addToWishReducer from "./reducer/wish/wish.slice";
import newOrderReducer from "./reducer/order/newOrderSlice";
import myOrdersReducer from "./reducer/order/myOrderSlice";
import getOrderDetailReducer from "./reducer/order/orderDetailSlice";
import getAllOrdersReducer from "./reducer/order/allOrders.slice";
import orderReducer from "./reducer/order/orderSlice";
import productReducer from "./reducer/product/productSlice";
import allReviewsReducer from "./reducer/product/productReviewSlice";
import reviewReducer from "./reducer/product/reviewSlice";
import compareReducer from "./reducer/product/compareProductSlice";
import roleReducer from "./reducer/role/role.slice";
import categoryReducer from "./reducer/category/category.slice";
import colorReducer from "./reducer/color/color.slice";
import reviewsReducer from "./reducer/review/review.slice";

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
    forgotPass: forgotPasswordReducer,
    allReviews: allReviewsReducer,
    review: reviewReducer,
    compare: compareReducer,
    role: roleReducer,
    category: categoryReducer,
    color: colorReducer,
    reviews: reviewsReducer,
    wish: addToWishReducer
  },
});
export default store;
