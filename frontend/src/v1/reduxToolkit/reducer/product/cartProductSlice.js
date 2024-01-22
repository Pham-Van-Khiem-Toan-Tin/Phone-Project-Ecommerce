import { createSlice } from "@reduxjs/toolkit";
import { addItemToCart, deleteItemCart, getProductCart } from "../../actions/cartAction";

const addItemCartSlice = createSlice({
  name: "allproductcategories",
  initialState: {
    isLoading: false,
    success: null,
    error: null,
    cartList: null,
    total: null,
    shippingInfo: {},
  },
  reducers: {
    clearErrorCart: (state) => {
      state.error = null;
    },
    resetToCart: (state) => {
      state.success = null;
    },
    shippingInfoSubmit: (state, action) => {
      localStorage.setItem("shippingInfo", JSON.stringify(action.payload))
      state.shippingInfo = action.payload;
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

export const { clearErrorCart, resetToCart, shippingInfoSubmit } = addItemCartSlice.actions;
export default addItemCartSlice.reducer;
