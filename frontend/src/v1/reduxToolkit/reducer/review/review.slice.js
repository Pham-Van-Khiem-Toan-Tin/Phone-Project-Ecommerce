import { createSlice } from "@reduxjs/toolkit";
import { deleteReview, getAllReview, updateReview } from "../../actions/review.action";

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    resultPerPage: null,
    filteredReviewCount: null,
    isLoading: false,
    error: null,
    message: null,
    success: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    reset: (state) => {
        state.success = null;
        state.message = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllReview.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllReview.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.reviews = action.payload.allReviews;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredReviewCount = action.payload.filteredReviewCount;
      if (action.payload.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      }
    });
    builder.addCase(getAllReview.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateReview.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(updateReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
        if (action.payload.accessToken) {
          localStorage.setItem(
            "accessToken",
            JSON.stringify(action.payload.accessToken)
          );
        }
      });
      builder.addCase(updateReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
      builder.addCase(deleteReview.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(deleteReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
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

export const { clearError, reset } = reviewsSlice.actions;
export default reviewsSlice.reducer;
