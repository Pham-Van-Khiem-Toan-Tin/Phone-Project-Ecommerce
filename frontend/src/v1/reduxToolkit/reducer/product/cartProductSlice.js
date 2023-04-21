import { createSlice } from "@reduxjs/toolkit";
import { addItemToCart, getProductCart } from "../../actions/cartAction";

const addItemCartSlice = createSlice({
  name: "allproductcategories",
  initialState: {
    isLoading: false,
    success: null,
    error: null,
    cartList: null,
    total: null,
  },
  reducers: {
    clearErrorCart: (state) => {
      state.error = null;
    },
    resetToCart: (state) => {
      state.success = null;
    },
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
      state.cartList = action.payload.cart.caProduct;
      state.total = action.payload.total;
      console.log(action.payload);
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
  },
});

export const { clearErrorCart, resetToCart } = addItemCartSlice.actions;
export default addItemCartSlice.reducer;
