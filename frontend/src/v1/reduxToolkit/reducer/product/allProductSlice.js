import { createSlice } from "@reduxjs/toolkit";
import {  getAllProducts } from "../../actions/productAction";

const allProductSlice = createSlice({
  name: "allproductcategories",
  initialState: {
    isLoading: false,
    products: [],
    productsCount: null,
    resultPerPage: null,
    filteredProductsCount: null,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { clearError } = allProductSlice.actions;
export default allProductSlice.reducer;
