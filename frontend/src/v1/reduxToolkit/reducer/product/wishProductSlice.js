import { createSlice } from "@reduxjs/toolkit";
import { addItemToCart, deleteItemCart, getProductCart } from "../../actions/cartAction";

const addItemCartSlice = createSlice({
  name: "allproductcategories",
  initialState: {
    isLoading: false,
    success: null,
    error: null,
    wishList: null,
    total: null,
    shippingInfor: {},
  },
  reducers: {
    clearErrorCart: (state) => {
      state.error = null;
    },
    resetToCart: (state) => {
      state.success = null;
    },
    shippingInforSubmit: (state, action) => {
      localStorage.setItem("shippingInfor", JSON.stringify(action.payload))
      state.shippingInfor = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addItemToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      state.success = action.payload.success;
      state.isLoading = false;
      if (action.payload.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      }
    });
    builder.addCase(addItemToCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getProductCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartList = action.payload.cart.products;
      state.total = action.payload.total;
      if (action.payload.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      }
    });
    builder.addCase(getProductCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteItemCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteItemCart.fulfilled, (state, action) => {
      state.success = action.payload.success;
      state.isLoading = false;
      if(action.payload.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      }
    });
    builder.addCase(deleteItemCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { clearErrorCart, resetToCart, shippingInforSubmit } = addItemCartSlice.actions;
export default addItemCartSlice.reducer;
