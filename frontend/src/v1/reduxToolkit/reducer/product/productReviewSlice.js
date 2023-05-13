import { createSlice } from "@reduxjs/toolkit";
import {  getAllProducts, getAllReviews } from "../../actions/productAction";

const allReviewsSlice = createSlice({
  name: "allreviews",
  initialState: {
    isLoading: false,
    reviews: [],
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllReviews.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllReviews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reviews = action.payload.reviews;
    });
    builder.addCase(getAllReviews.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { clearError } = allReviewsSlice.actions;
export default allReviewsSlice.reducer;
