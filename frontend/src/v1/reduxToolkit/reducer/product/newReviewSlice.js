import { createSlice } from "@reduxjs/toolkit";
import { deleteReview, getAllReviews, newReview } from "../../actions/productAction";

const newProductReviewSlice = createSlice({
  name: "newreview",
  initialState: {
    isLoading: false,
    error: null,
    success: false,
    reviews: []
  },
  reducers: {
    clearErrorReview: (state) => {
      state.error = null;
    },
    newReviewReset: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(newReview.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(newReview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      if (action.payload.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      }
    });
    builder.addCase(newReview.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getAllReviews.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllReviews.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.reviews = action.payload.reviews;
      if (action.payload.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      }
    });
    builder.addCase(getAllReviews.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(deleteReview.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteReview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      if (action.payload.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      }
    });
    builder.addCase(deleteReview.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { clearErrorReview, newReviewReset } =
  newProductReviewSlice.actions;
export default newProductReviewSlice.reducer;
